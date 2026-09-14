<?php

namespace App\Http\Controllers\SiteManager;

use App\Http\Controllers\Controller;
use App\Models\ProjectUser;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index($projectId): JsonResponse
    {
        return response()->json(
            Task::with('assignedUser')
                ->where('project_id', $projectId)
                ->latest()
                ->get()
        );
    }

    public function workers($projectId): JsonResponse
    {
        $workers = ProjectUser::where('project_id', $projectId)
            ->where('role_on_proj', 'worker')
            ->with('user:id,name')
            ->get()
            ->map(fn ($item) => [
                'id' => $item->user->id,
                'name' => $item->user->name,
            ]);

        return response()->json($workers);
    }

    public function store(Request $request, $projectId): JsonResponse
    {
        $validated = $request->validate([
            'parent_task_id' => 'nullable|exists:tasks,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'estimated_hours' => 'nullable|numeric|min:0',
            'begin_date' => 'nullable|date',
            'due_date' => 'nullable|date|after_or_equal:begin_date',
        ]);

        if (!empty($validated['parent_task_id'])) {
            $validParent = Task::where('id', $validated['parent_task_id'])
                ->where('project_id', $projectId)
                ->exists();

            if (!$validParent) {
                return response()->json([
                    'message' => 'Parent task does not belong to this project.',
                ], 422);
            }
        }

        if (!empty($validated['assigned_to'])) {
            $validWorker = ProjectUser::where('project_id', $projectId)
                ->where('user_id', $validated['assigned_to'])
                ->where('role_on_proj', 'worker')
                ->exists();

            if (!$validWorker) {
                return response()->json([
                    'message' => 'Selected user is not a worker on this project.',
                ], 422);
            }
        }

        $task = Task::create([
            ...$validated,
            'project_id' => $projectId,
            'status' => 'pending',
            'progress' => 0,
        ]);

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task,
        ], 201);
    }
}