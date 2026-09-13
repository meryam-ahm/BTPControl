<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;

class ProjectController extends Controller
{
    public function getProjects()
{
    $projects = Project::select('id', 'name')
        ->orderBy('created_at', 'desc')
        ->get();
    return response()->json($projects);
}
public function getProjectWorkers($projectId)
{
    $project = Project::with('users')->findOrFail($projectId);

    return response()->json($project->users);
}
public function stats($projectId)
{
    $project = Project::findOrFail($projectId);

    $tasks = Task::where('project_id', $projectId)->get();

    $totalTasks = $tasks->count();

    $completed = $tasks->where('status', 'completed')->count();

    $inProgress = $tasks->where('status', 'in_progress')->count();

    $delayed = $tasks->where('status', '!=', 'completed')
        ->where('due_date', '<', Carbon::now())
        ->count();

    $progress = $totalTasks > 0
        ? round(($completed / $totalTasks) * 100)
        : 0;

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
            "title" => "Delayed Tasks",
            "value" => $delayed,
            "icon" => "AlertTriangle",
            "color" => "red",
        ],
    ]);
}
}
