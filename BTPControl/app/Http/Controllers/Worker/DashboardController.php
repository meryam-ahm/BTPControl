<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\ProjectUser;
use App\Models\Task;
use App\Models\TaskUpdate;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function projects(Request $request): JsonResponse
    {
        $workerId = $request->user()->id;

        return response()->json([
            'projects' => ProjectUser::where(
                'user_id',
                $workerId
            )
                ->where(
                    'role_on_proj',
                    'worker'
                )
                ->with('project')
                ->get(),
        ]);
    }

    public function home(
        Request $request,
        $projectId
    ): JsonResponse {
        $user = $request->user();
        $userId = $user->id;

        $projectUser = ProjectUser::where(
            'project_id',
            $projectId
        )
            ->where(
                'user_id',
                $userId
            )
            ->where(
                'role_on_proj',
                'worker'
            )
            ->with('project')
            ->first();

        if (!$projectUser) {
            return response()->json([
                'message' => 'Worker is not assigned to this project.',
            ], 403);
        }

        $tasks = Task::where(
            'project_id',
            $projectId
        )
            ->where(
                'assigned_to',
                $userId
            )
            ->orderBy('due_date')
            ->get();

        $taskIds = $tasks->pluck('id');

        return response()->json([
            'project_id' => (int) $projectId,

            'project' => [
                'id' => $projectUser->project?->id,
                'name' => $projectUser->project?->name,
            ],

            'worker' => [
                'id' => $user->id,
                'name' => $user->name ?? 'Worker',
                'profile_image' => $user->profile_image,
            ],

            'stats' => [
                'active_tasks' => $tasks
                    ->whereNotIn(
                        'status',
                        ['completed', 'cancelled']
                    )
                    ->count(),

                'in_progress' => $tasks
                    ->where(
                        'status',
                        'in_progress'
                    )
                    ->count(),

                'completed' => $tasks
                    ->where(
                        'status',
                        'completed'
                    )
                    ->count(),

                'progress' => $tasks->count()
                    ? round($tasks->avg('progress'))
                    : 0,
            ],

            'tasks' => $tasks,

            'activity' => TaskUpdate::whereIn(
                'task_id',
                $taskIds
            )
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }
}