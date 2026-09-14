 <?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectUser;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * Get all projects.
     */
    public function getProjects(): JsonResponse
    {
        $projects = Project::query()
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return response()->json([
            'projects' => $projects,
        ]);
    }

    /**
     * Get workers assigned to a project.
     */
    public function getProjectWorkers(Project $project): JsonResponse
    {
        $workers = ProjectUser::query()
            ->where('project_id', $project->id)
            ->where('role_on_proj', 'worker')
            ->with([
                'user:id,name,email,phone,role'
            ])
            ->get()
            ->map(function ($projectUser) {
                return [
                    'id' => $projectUser->user->id,
                    'name' => $projectUser->user->name,
                    'email' => $projectUser->user->email,
                    'phone' => $projectUser->user->phone,
                    'role' => $projectUser->role_on_proj,
                ];
            });

        return response()->json([
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
            ],
            'workers' => $workers,
        ]);
    }

    /**
     * Get project task statistics.
     */
    public function stats(Project $project): JsonResponse
    {
        $tasks = $project->tasks()
            ->select([
                'id',
                'project_id',
                'status',
                'progress',
                'due_date',
            ])
            ->get();

        $totalTasks = $tasks->count();

        $completedTasks = $tasks
            ->where('status', 'completed')
            ->count();

        $inProgressTasks = $tasks
            ->where('status', 'in_progress')
            ->count();

        $pendingTasks = $tasks
            ->where('status', 'pending')
            ->count();

        $cancelledTasks = $tasks
            ->where('status', 'cancelled')
            ->count();

        $activeTasks = $tasks->whereNotIn('status', [
            'completed',
            'cancelled',
        ])->count();

        /*
         * Progress is calculated from the task progress values.
         * This is more accurate than simply using completed/total.
         */
        $progress = $totalTasks > 0
            ? round($tasks->avg('progress'))
            : 0;

        /*
         * A task is delayed only when:
         * - it has a due date
         * - the due date has passed
         * - it is not completed
         * - it is not cancelled
         */
        $delayedTasks = $tasks
            ->filter(function ($task) {
                return $task->due_date !== null
                    && now()->gt($task->due_date)
                    && !in_array($task->status, [
                        'completed',
                        'cancelled',
                    ]);
            })
            ->count();

        return response()->json([
            'project_id' => $project->id,
            'stats' => [
                'total_tasks' => $totalTasks,
                'completed_tasks' => $completedTasks,
                'in_progress_tasks' => $inProgressTasks,
                'pending_tasks' => $pendingTasks,
                'active_tasks' => $activeTasks,
                'cancelled_tasks' => $cancelledTasks,
                'delayed_tasks' => $delayedTasks,
                'progress' => $progress,
            ],
        ]);
    }
}
 
