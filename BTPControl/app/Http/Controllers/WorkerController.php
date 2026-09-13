<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\ProjectUser;
use App\Models\Task;
use App\Models\TaskUpdate;
use App\Models\User;
use App\Models\Inspection;
use App\Models\InspectionCheck;
use App\Models\Media;

class WorkerController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Temporary worker ID
    |--------------------------------------------------------------------------
    | Later replace this with auth()->id()
    |--------------------------------------------------------------------------
    */
    private function workerId()
    {
        return 48;
    }

    /*
    |--------------------------------------------------------------------------
    | Get worker projects
    |--------------------------------------------------------------------------
    */
    public function getProjects()
    {
        $userId = $this->workerId();

        $projects = ProjectUser::where('user_id', $userId)
            ->where('role_on_proj', 'worker')
            ->with('project')
            ->get();

        return response()->json([
            'projects' => $projects
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Worker Home
    |--------------------------------------------------------------------------
    */
    public function home($projectId)
    {
        $userId = $this->workerId();

        $projectUser = ProjectUser::where('project_id', $projectId)
            ->where('user_id', $userId)
            ->where('role_on_proj', 'worker')
            ->with('project')
            ->first();

        if (!$projectUser) {
            return response()->json([
                'message' => 'Worker is not assigned to this project.'
            ], 403);
        }

        $user = User::find($userId);

        $tasks = Task::where('project_id', $projectId)
            ->where('assigned_to', $userId)
            ->orderBy('due_date')
            ->get();

        $activeTasks = $tasks
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->count();

        $inProgress = $tasks
            ->where('status', 'in_progress')
            ->count();

        $completed = $tasks
            ->where('status', 'completed')
            ->count();

        $averageProgress = $tasks->count()
            ? round($tasks->avg('progress'))
            : 0;

        $taskIds = $tasks->pluck('id');

        $activity = TaskUpdate::whereIn('task_id', $taskIds)
            ->latest()
            ->take(10)
            ->get();

        return response()->json([
            'project_id' => (int) $projectId,

            'project' => [
                'id' => $projectUser->project?->id,
                'name' => $projectUser->project?->name,
            ],

            'worker' => [
                'id' => $user?->id,
                'name' => $user?->name ?? 'Worker',
                'profile_image' => $user?->profile_image ?? null,
            ],

            'stats' => [
                'active_tasks' => $activeTasks,
                'in_progress' => $inProgress,
                'completed' => $completed,
                'progress' => $averageProgress,
            ],

            'tasks' => $tasks,

            'activity' => $activity,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Worker Report Something
    |--------------------------------------------------------------------------
    */
    public function reportIssue(Request $request, $projectId)
    {
        $workerId = $this->workerId();

        $request->validate([
            'task_id' => 'nullable|exists:tasks,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:quality,safety',
            'inspection_date' => 'required|date',
            'notes' => 'nullable|string',

            'checks' => 'required|array|min:1',

            'checks.*.check_name'
                => 'required|string|max:255',

            'checks.*.required_value'
                => 'nullable|string|max:255',

            'checks.*.actual_value'
                => 'nullable|string|max:255',

            'checks.*.unit'
                => 'nullable|string|max:50',

            'checks.*.status'
                => 'required|in:pending,ok,fail',

            'checks.*.severity'
                => 'nullable|in:low,medium,high',

            'checks.*.comment'
                => 'nullable|string',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Make sure worker belongs to project
        |--------------------------------------------------------------------------
        */
        $workerAssigned = ProjectUser::where('project_id', $projectId)
            ->where('user_id', $workerId)
            ->where('role_on_proj', 'worker')
            ->exists();

        if (!$workerAssigned) {
            return response()->json([
                'success' => false,
                'message' => 'Worker is not assigned to this project.'
            ], 403);
        }

        /*
        |--------------------------------------------------------------------------
        | If task is provided, make sure it belongs to this project
        |--------------------------------------------------------------------------
        */
        if ($request->task_id) {
            $taskBelongsToProject = Task::where('id', $request->task_id)
                ->where('project_id', $projectId)
                ->where('assigned_to', $workerId)
                ->exists();

            if (!$taskBelongsToProject) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected task does not belong to this worker/project.'
                ], 422);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Create inspection
        |--------------------------------------------------------------------------
        */
        $inspection = Inspection::create([
            'project_id' => $projectId,
            'task_id' => $request->task_id,
            'inspected_by' => $workerId,
            'type' => $request->type,
            'title' => $request->title,
            'inspection_date' => $request->inspection_date,
            'status' => 'draft',
            'notes' => $request->notes,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Create inspection checks
        |--------------------------------------------------------------------------
        */
        foreach ($request->checks as $check) {
            InspectionCheck::create([
                'inspection_id' => $inspection->id,
                'check_name' => $check['check_name'],
                'required_value' => $check['required_value'] ?? null,
                'actual_value' => $check['actual_value'] ?? null,
                'unit' => $check['unit'] ?? null,
                'status' => $check['status'],
                'severity' => $check['severity'] ?? null,
                'comment' => $check['comment'] ?? null,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Report submitted successfully.',
            'inspection' => $inspection->load('checks'),
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | Mark Task Done
    |--------------------------------------------------------------------------
    |
    | Updates:
    | 1. tasks
    | 2. task_updates
    | 3. media (only when a photo is attached)
    |
    |--------------------------------------------------------------------------
    */
    public function markTaskDone(Request $request, $taskId)
 {
    $workerId = $this->workerId();

    $request->validate([
        'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
    ]);

    $task = Task::where('id', $taskId)
        ->where('assigned_to', $workerId)
        ->first();

    if (!$task) {
        return response()->json([
            'success' => false,
            'message' => 'Task not found or not assigned to this worker.'
        ], 404);
    }

    $task->update([
        'progress' => 100,
        'status' => 'completed',
    ]);

    $taskUpdate = TaskUpdate::create([
        'task_id' => $task->id,
        'updated_by' => $workerId,
        'progress' => 100,
        'note' => 'Task marked as completed by the worker.',
    ]);

    $media = null;

    if ($request->hasFile('photo')) {
        $path = $request->file('photo')->store(
            'task-proofs',
            'public'
        );

        $media = Media::create([
            'project_id' => $task->project_id,
            'task_id' => $task->id,
            'uploaded_by' => $workerId,
            'type' => 'photo',
            'url' => $path,
            'related_type' => 'task',
            'related_id' => $task->id,
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Task marked as completed successfully.',
        'task' => $task,
        'task_update' => $taskUpdate,
        'media' => $media,
    ]);
}}

