<?php

namespace App\Http\Controllers\SiteManager;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\InspectionCheck;
use App\Models\Media;
use App\Models\ProjectUser;
use App\Models\Resource;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function projects(Request $request): JsonResponse
    {
        $managerId = $request->user()->id;

        $projects = ProjectUser::where('user_id', $managerId)
            ->where('role_on_proj', 'chef_chantier')
            ->with('project')
            ->get();

        return response()->json($projects);
    }

    public function photo($projectId): JsonResponse
    {
        $photo = Media::where('project_id', $projectId)
            ->where('type', 'photo')
            ->where('related_type', 'project')
            ->where('related_id', $projectId)
            ->latest()
            ->first();

        return response()->json([
            'photo' => $photo,
        ]);
    }

    public function stats($projectId): JsonResponse
    {
        $tasks = Task::where('project_id', $projectId)->get();

        return response()->json([
            'globalProgress' => $tasks->count()
                ? round($tasks->avg('progress'))
                : 0,

            'workers' => ProjectUser::where('project_id', $projectId)
                ->where('role_on_proj', 'worker')
                ->count(),

            'tasks' => $tasks->count(),

            'incidents' => InspectionCheck::where('status', 'fail')
                ->whereHas(
                    'inspection',
                    fn ($q) => $q->where('project_id', $projectId)
                )
                ->count(),

            'resources' => Resource::where(
                'project_id',
                $projectId
            )->count(),
        ]);
    }

    public function selectedProject($projectId): JsonResponse
    {
        $workers = ProjectUser::where('project_id', $projectId)
            ->where('role_on_proj', 'worker')
            ->with([
                'user:id,name,role,phone,email',
                'project:id,name',
            ])
            ->get()
            ->map(function ($worker) use ($projectId) {
                $attendance = Attendance::where(
                    'project_id',
                    $projectId
                )
                    ->where(
                        'user_id',
                        $worker->user_id
                    )
                    ->whereDate(
                        'check_in',
                        today()
                    )
                    ->first();

                $tasks = Task::where(
                    'project_id',
                    $projectId
                )
                    ->where(
                        'assigned_to',
                        $worker->user_id
                    )
                    ->get();

                return [
                    'project_name' => $worker->project?->name,
                    'id' => $worker->user?->id,
                    'name' => $worker->user?->name,
                    'role' => $worker->role_on_proj,
                    'phone' => $worker->user?->phone,
                    'email' => $worker->user?->email,
                    'joined_at' => $worker->created_at?->format('Y-m-d'),
                    'status' => $attendance?->status ?? 'absent',

                    'Workertasks' => $tasks->map(
                        fn ($task) => [
                            'id' => $task->id,
                            'title' => $task->title,
                            'description' => $task->description,
                            'due_date' => $task->due_date,
                            'status' => $task->status,
                            'progress' => $task->progress ?? 0,
                        ]
                    ),
                ];
            });

        $tasks = Task::where(
            'project_id',
            $projectId
        )
            ->with([
                'parent:id,title',
                'assignedUser:id,name',
            ])
            ->get()
            ->map(
                fn ($task) => [
                    'id' => $task->id,
                    'task_name' => $task->title,
                    'assigned_to' => $task->assignedUser?->name,
                    'deadline' => $task->due_date,
                    'progress' => $task->progress,
                    'parent_task' => $task->parent?->title,
                ]
            );

        return response()->json([
            'workers' => $workers,
            'ProjecTasks' => $tasks,
        ]);
    }

    public function taskFormData(
        Request $request,
        $projectId
    ): JsonResponse {
        $managerId = $request->user()->id;

        return response()->json([
            'projects' => ProjectUser::where(
                'user_id',
                $managerId
            )
                ->where(
                    'role_on_proj',
                    'chef_chantier'
                )
                ->with('project:id,name')
                ->get(),

            'users' => ProjectUser::where(
                'project_id',
                $projectId
            )
                ->where(
                    'role_on_proj',
                    'worker'
                )
                ->with('user:id,name')
                ->get(),

            'tasks' => Task::select(
                'id',
                'title'
            )
                ->where(
                    'project_id',
                    $projectId
                )
                ->whereNull(
                    'parent_task_id'
                )
                ->get(),
        ]);
    }

    public function tasks($projectId): JsonResponse
    {
        return response()->json([
            'tasks' => Task::where(
                'project_id',
                $projectId
            )
                ->latest()
                ->get(),
        ]);
    }
}