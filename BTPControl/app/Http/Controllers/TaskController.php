<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Shared task form data.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'projects' => Project::select('id', 'name')->get(),

            'users' => User::select('id', 'name')
                ->where('role', 'site_manager')
                ->get(),

             
        ]);
    }

public function getParentTasks($projectId): JsonResponse
{
    $tasks = Task::select('id','project_id','title')
    ->where('project_id', $projectId)
    ->whereNull('parent_task_id')
    ->get();

    return response()->json($tasks);
}
public function taskInbox(Request $request): JsonResponse
{
    $user = $request->user();

    $tasks = Task::with([
        'project:id,name',
        'assignedUser:id,name',
        'media',
        'updates.updatedBy:id,name',
    ])
        ->where('assigned_to', $user->id)
        ->latest()
        ->get();

    return response()->json([
        'tasks' => $tasks,
    ]);
}
    /**
     * Create a task.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'parent_task_id' => 'nullable|exists:tasks,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'estimated_hours' => 'nullable|numeric|min:0',
            'begin_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:begin_date',
        ]);

        // Make sure the parent task belongs to the same project.
        if (!empty($validated['parent_task_id'])) {
            $parentExists = Task::where('id', $validated['parent_task_id'])
                ->where('project_id', $validated['project_id'])
                ->exists();

            if (!$parentExists) {
                return response()->json([
                    'message' => 'Parent task must belong to the same project.',
                ], 422);
            }
        }

        $task = Task::create([
            ...$validated,
            'status' => 'pending',
            'progress' => 0,
        ]);

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task,
        ], 201);
    }

    /**
     * Get all tasks belonging to a project.
     */
    public function projectTasks(Project $project): JsonResponse
    {
        $tasks = Task::with([
            'assignedUser',
            'media',
        ])
            ->where('project_id', $project->id)
            ->latest()
            ->get();

        return response()->json($tasks);
    }

    /**
     * Upload media for a task.
     */
    public function uploadMedia(Request $request, Task $task): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240',
        ]);

        $path = $request->file('file')->store(
            'tasks',
            'public'
        );

        $media = Media::create([
            'task_id' => $task->id,
            'project_id' => $task->project_id,
            'uploaded_by' => auth()->id(),
            'type' => 'document',
            'url' => $path,
        ]);

        return response()->json($media, 201);
    }

    /**
     * Get project tasks formatted for the timeline/Gantt.
     */
    public function timeline(Project $project): JsonResponse
    {
        $tasks = Task::with('assignedUser')
            ->where('project_id', $project->id)
            ->whereNotNull('begin_date')
            ->whereNotNull('due_date')
            ->orderBy('begin_date')
            ->get();

        if ($tasks->isEmpty()) {
            return response()->json([]);
        }

        $projectStart = Carbon::parse(
            $tasks->min('begin_date')
        );

        $timeline = $tasks->map(function ($task) use ($projectStart) {
            $begin = Carbon::parse($task->begin_date);
            $due = Carbon::parse($task->due_date);

            return [
                'id' => $task->id,
                'name' => $task->title,
                'assigned_to_name' => $task->assignedUser?->name,
                'status' => $task->status,
                'progress' => $task->progress ?? 0,
                'due_date' => $task->due_date,

                'start' => $projectStart->diffInDays($begin),

                'duration' => max(
                    1,
                    $begin->diffInDays($due)
                ),

                'color' => match ($task->status) {
                    'completed' => 'bg-emerald-500',
                    'in_progress' => 'bg-blue-500',
                    'review' => 'bg-purple-500',
                    'cancelled' => 'bg-red-500',
                    default => 'bg-amber-500',
                },
            ];
        });

        return response()->json(
            $timeline->values()
        );
    }
    
}

