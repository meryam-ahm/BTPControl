<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use App\Models\Media;
use Carbon\Carbon;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'estimated_hours' => 'nullable|numeric',
            'due_date' => 'nullable|date',
            'begin_date' => 'nullable|date', // ✅ IMPORTANT
        ]);

        $task = Task::create([
            'project_id' => $request->project_id,
            'assigned_to' => $request->assigned_to,
            'parent_task_id' => $request->parent_task_id,
            'title' => $request->title,
            'description' => $request->description,
            'priority' => $request->priority,
            'estimated_hours' => $request->estimated_hours,
            'due_date' => $request->due_date,
            'begin_date' => $request->begin_date, // ✅ IMPORTANT
            'status' => 'pending',
            'progress' => 0,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    public function index()
    {
        return response()->json([
            'projects' => Project::select('id', 'name')->get(),

            'users' => User::select('id', 'name')
                ->where('role', 'chef_chantier')
                ->get(),

        'tasks' => Task::select('id', 'title')
                ->whereNull('parent_task_id')
                ->get(),
        ]);
    }

    public function getProjectTasks($projectId)
    {
        return Task::with(['assignedUser', 'media'])
            ->where('project_id', $projectId)
            ->get();
    }

    public function uploadTaskMedia(Request $request, $taskId)
    {
        $request->validate([
            'file' => 'required|file'
        ]);

        $path = $request->file('file')->store('tasks', 'public');

        $media = Media::create([
            'task_id' => $taskId,
            'project_id' => $request->project_id,
            'uploaded_by' => auth()->id(),
            'type' => 'document',
            'url' => $path,
        ]);

        return response()->json($media);
    }

    public function timeline($projectId)
    {
        $tasks = Task::with('assignedUser')
            ->where('project_id', $projectId)
            ->whereNotNull('begin_date')
            ->whereNotNull('due_date') // ✅ IMPORTANT FIX
            ->orderBy('begin_date')
            ->get();

        if ($tasks->isEmpty()) {
            return response()->json([]);
        }

        // ✅ safer project start
        $projectStart = Carbon::parse($tasks->min('begin_date'));

        $timelineTasks = $tasks->map(function ($task) use ($projectStart) {

            if (!$task->begin_date) return null;

            $begin = Carbon::parse($task->begin_date);

            $startOffset = $projectStart->diffInDays($begin);

            $duration = $task->due_date
                ? max(1, $begin->diffInDays(Carbon::parse($task->due_date)))
                : 1;

            return [
                'id' => $task->id,
                'name' => $task->title,
                'assigned_to_name' => $task->assignedUser?->name,
                'status' => $task->status,
                'progress' => $task->progress ?? 0,
                'due_date' => $task->due_date,

                'start' => $startOffset,
                'duration' => $duration,

                'color' => match ($task->status) {
                    'completed' => 'bg-emerald-500',
                    'in_progress' => 'bg-blue-500',
                    'review' => 'bg-purple-500',
                    'cancelled' => 'bg-red-500',
                    default => 'bg-amber-500',
                }
            ];
        })->filter(); // ✅ remove nulls

        return response()->json($timelineTasks->values());
    }
}