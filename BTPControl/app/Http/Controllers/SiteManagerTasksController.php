<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class SiteManagerTasksController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | GET ALL WORKERS
    |--------------------------------------------------------------------------
    */
public function index()
{
    $tasks = Task::with(['assignedUser'])
        ->where('project_id', 3)
        ->latest()
        ->get();

    return response()->json($tasks);
}
    public function workers()
    {
        $workers = User::where('role', 'worker')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return response()->json($workers);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE TASK FOR WORKER
    |--------------------------------------------------------------------------
    */

public function createWorkerTask(Request $request)
{
    \Log::info("TASK REQUEST:", $request->all());

    $task = Task::create([
        'project_id' => 3, // 🔥 HARD CODED FIX
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

    \Log::info("TASK CREATED:", $task->toArray());

    return response()->json([
        'message' => 'Task created successfully',
        'task' => $task
    ], 201);
}
}