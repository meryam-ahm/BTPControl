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

    public function store(Request $request) 
{  
  
    $task = Task::create([ 
        'project_id' => $request->project_id,   
        'parent_task_id' => $request->parent_task_id, 
        'assigned_to' => $request->assigned_to, 
 
        'title' => $request->title, 
        'description' => $request->description, 
 
        'priority' => $request->priority, 
        'status' => 'pending', 
        'progress' => 0, 
 
        'estimated_hours' => $request->estimated_hours, 
        'begin_date' => $request->begin_date, 
        'due_date' => $request->due_date, 
    ]); 
  
    return response()->json([ 
        'message' => 'Task created successfully', 
        'task' => $task 
    ], 201); 
}
}