<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use App\Models\ProjectUser;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
class ProjectController extends Controller
{
    /**
     * Get all projects for the project selector.
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
    public function getProjectWorkers($projectId)
{
    $project = Project::findOrFail($projectId);

    $workers = ProjectUser::query()
        ->where('project_id', $project->id)
        ->where('role_on_proj', 'worker')
        ->with('user:id,name,email,phone,role')
        ->get()
        ->filter(function ($projectUser) {
            return $projectUser->user !== null;
        })
        ->map(function ($projectUser) {
            return [
                'id' => $projectUser->user->id,
                'name' => $projectUser->user->name,
                'email' => $projectUser->user->email,
                'phone' => $projectUser->user->phone,
                'role' => $projectUser->role_on_proj,
            ];
        })
        ->values();

    return response()->json([
        'project' => [
            'id' => $project->id,
            'name' => $project->name,
        ],
        'workers' => $workers,
    ]);
}

    /**
     * Get task statistics for a project.
     */
public function stats($projectId)
{
    $project = Project::findOrFail($projectId);

    $tasks = Task::where('project_id', $projectId)->get();

    // =========================
    // TASK COUNTS
    // =========================

    $totalTasks = $tasks->count();

    $completed = $tasks
        ->where('status', 'completed')
        ->count();

    $inProgress = $tasks
        ->where('status', 'in_progress')
        ->count();

    $pending = $tasks
        ->where('status', 'pending')
        ->count();

    $cancelled = $tasks
        ->where('status', 'cancelled')
        ->count();

    // =========================
    // ACTIVE TASKS
    // =========================

    $activeTasks = $tasks
        ->whereNotIn('status', [
            'completed',
            'cancelled',
        ])
        ->count();

    // =========================
    // PROJECT PROGRESS
    // =========================

    $progress = $totalTasks > 0
        ? round(($completed / $totalTasks) * 100)
        : 0;

    // =========================
    // DELAYED TASKS
    // =========================

    $delayed = $tasks
        ->filter(function ($task) {
            return $task->due_date !== null
                && Carbon::now()->gt(Carbon::parse($task->due_date))
                && !in_array($task->status, [
                    'completed',
                    'cancelled',
                ]);
        })
        ->count();

    // =========================
    // RETURN ARRAY
    // IMPORTANT:
    // DO NOT WRAP THIS IN "stats"
    // =========================

    return response()->json([
        [
            "title" => "Project Progress",
            "value" => $progress,
            "suffix" => "%",
            "icon" => "TrendingUp",
            "color" => "blue",
        ],

        [
            "title" => "Total Tasks",
            "value" => $totalTasks,
            "icon" => "Grid3x3",
            "color" => "indigo",
        ],

        [
            "title" => "Completed Tasks",
            "value" => $completed,
            "icon" => "CheckCircle",
            "color" => "emerald",
        ],

        [
            "title" => "In Progress",
            "value" => $inProgress,
            "icon" => "Activity",
            "color" => "blue",
        ],

        [
            "title" => "Pending Tasks",
            "value" => $pending,
            "icon" => "Layers",
            "color" => "indigo",
        ],

        [
            "title" => "Active Tasks",
            "value" => $activeTasks,
            "icon" => "Activity",
            "color" => "emerald",
        ],

        [
            "title" => "Delayed Tasks",
            "value" => $delayed,
            "icon" => "AlertTriangle",
            "color" => "blue",
        ],

        [
            "title" => "Cancelled Tasks",
            "value" => $cancelled,
            "icon" => "AlertTriangle",
            "color" => "indigo",
        ],
    ]);
}
  


    
    
}
