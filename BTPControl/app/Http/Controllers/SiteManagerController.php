<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectUser;
use App\Models\Project ;
 use App\Models\Report;
 use App\Models\Media;
use App\Models\Task;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Attendance;
use App\Models\InspectionCheck;
use Illuminate\Support\Carbon;
use App\Models\Inspection;
class SiteManagerController extends Controller
{ 
   public function getProjects()
{
      //$userId = auth()->id();    
$userId = 53; 

    $projects = ProjectUser::where('user_id', $userId)
    ->where('role_on_proj', 'chef_chantier')
        ->with('project')
        ->get();

    return response()->json($projects);
}
public function getProjectPhoto($project)
{
    $photo = Media::where('project_id', $project)
        ->where('type', 'photo')
        ->where('related_type', 'project')
        ->where('related_id', $project)
        ->latest()
        ->first();

    return response()->json([
        'photo' => $photo
    ]);
}
    public function CreateTask(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'estimated_hours' => 'nullable|numeric',
            'due_date' => 'nullable|date',
            'begin_date' => 'nullable|date', // IMPORTANT
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
            'begin_date' => $request->begin_date, // IMPORTANT
            'status' => 'pending',
            'progress' => 0,
        ]);
        }
    public function CreateWorker(Request $request, $project)
    {
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'phone' => 'nullable|string|max:30',
        ]);

        return DB::transaction(function () use ($validated, $project) {

            // Create worker account
            $worker = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'] ?? null,

                // Worker NEVER receives this password
                'password' => Hash::make(Str::random(40)),

                'role' => 'worker',
                'type_user' => 'worker',
            ]);

            // Automatically assign worker to project
            ProjectUser::create([
                'project_id' => $project,
                'user_id' => $worker->id,
                'role_on_proj' => 'worker',
            ]);

            return response()->json([
                'message' => 'Worker created and assigned successfully.',

                'worker' => [
                    'id' => $worker->id,
                    'name' => $worker->name,
                    'email' => $worker->email,
                    'phone' => $worker->phone,
                ],
            ], 201);
        });
        }
    public function statsSiteManager($project)
    {
        $phases = Task::where('project_id', $project)
        ->select('id', 'title', 'progress')
        ->get();
        $totalPhases = $phases->count();

         $globalProgress = $totalPhases > 0
        ? round($phases->avg('progress'))
        : 0;

        $workers = ProjectUser::where('project_id', $project)
            ->where('role_on_proj', 'worker')
            ->count();

        $tasks = Task::where('project_id', $project)->count();
        $incidents = InspectionCheck::whereHas('inspection', function ($query) use ($project) {
                     $query->where('project_id', $project);
        })->where('status', 'fail')->count();

         $resources = Resource::where('project_id', $project)->count();

         return response()->json([
                 'globalProgress' => $globalProgress,
                 'workers' => $workers,
                 'tasks' => $tasks,
                 'incidents' => $incidents,
                 'resources' => $resources,
]);
    }
public function stats_selectedproject($project)   
{   
    // 1. Fetch Workers and their today's attendance status & tasks
    $workers = ProjectUser::where('project_id', $project)   
        ->where('role_on_proj', 'worker')   
        ->with([
            'user:id,name,role,phone,email',
            'user.tasks:id,assigned_to,title,description,due_date,status,progress', // Tasks attached via user
            'project:id,name'
        ])
        ->get()  
        ->map(function ($worker) use ($project) {   
            $attendance = \App\Models\Attendance::where('project_id', $project)   
                ->where('user_id', $worker->user_id)   
                ->whereDate('check_in', today())   
                ->first();   

            return [   
                'project_name' => $worker->project?->name,
                'id'           => $worker->user?->id,   
                'name'         => $worker->user?->name,   
                'role'         => $worker->role_on_proj,   
                'phone'        => $worker->user?->phone,  
                'email'        => $worker->user?->email, 
                'joined_at'    => $worker->created_at?->format('Y-m-d'),  
                'status'       => $attendance?->status ?? 'absent',
                
                // Map array of tasks assigned to this worker
                'Workertasks'        => $worker->user?->tasks->map(function ($task) {
                    return [
                        'id'          => $task->id,
                        'title'       => $task->title,
                        'description' => $task->description,
                       ' due_date' => $task->due_date ? Carbon::parse($task->due_date)->format('Y-m-d') : null,
                        'status'      => $task->status ?? 'Pending',
                        'progress'    => $task->progress ?? 0,
                    ];
                }) ?? []
            ];   
        });
   
    // 2. Fetch Tasks with parent and assigned user relationships
    $ProjecTasks = Task::where('project_id', $project)   
        ->with([   
            'parent:id,title',   
            'assignedUser:id,name'   
        ])   
        ->get()   
        ->map(function ($task) {   
            return [   
                'id'          => $task->id,   
                'task_name'   => $task->title,   
                'assigned_to' => $task->assignedUser?->name,
                'deadline'    => $task->deadline,   
                'progress'    => $task->progress,   
                'parent_task' => $task->parent?->title,   
            ];   
        });   
   
    // 3. Return combined JSON response
    return response()->json([
        'workers' => $workers,
        'ProjecTasks'   => $ProjecTasks
    ]);   
}
 
public function getWorkerAttendance($workerId)
{
    $history = Attendance::where('user_id', $workerId)
        ->orderBy('check_in', 'desc')
        ->get()
        ->map(function ($record) {
            return [
                'id'       => $record->id,
                'date'     => $record->check_in ? Carbon::parse($record->check_in)->format('Y-m-d') : 'N/A',
                'check_in' => $record->check_in ? Carbon::parse($record->check_in)->format('H:i A') : 'N/A',
                'status'   => strtolower($record->status ?? 'absent'),
            ];
        });

    return response()->json($history);
}

    /*
    |--------------------------------------------------------------------------
    | CREATE TASK FOR WORKER
    |--------------------------------------------------------------------------
    */
    public function createWorkerTask(Request $request)
{
   // 1. Fetch Workers and their today's attendance status
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

    return response()->json([
        'message' => 'Task created successfully',
        'task' => $task
    ], 201);
}
public function taskFormData($project)
{
   //$userId = auth()->id();     
     $userId = 53;

    return response()->json([
        'projects' => ProjectUser::where('user_id', $userId)
            ->where('role_on_proj', 'chef_chantier')
            ->with(['project:id,name'])
            ->get(),

        'users' => ProjectUser::where('project_id', $project)
            ->where('role_on_proj', 'worker')
            ->with(['user:id,name'])
            ->get(),

        'tasks' => Task::select('id', 'title')
            ->where('project_id', $project)
            ->whereNull('parent_task_id')
            ->get(),
    ]);
}
 public function tasks_selectedProject($project){
       return response()->json([
          'tasks'=> Task::where('project_id', $project)->get()
       ]);

 }
public function removeWorkerFromProject($project, $worker)
{
    // Find and delete the association between worker and project
    $deleted = ProjectUser::where('project_id', $project)
        ->where('user_id', $worker)
        ->where('role_on_proj', 'worker')
        ->delete();

    if ($deleted) {
        return response()->json(['message' => 'Worker removed successfully'], 200);
    }

    return response()->json(['message' => 'Worker not found in project'], 444);
}
public function getIncidents($project)
{
// pending→ The check has been created, but has not been evaluated yet
// ok→ The check was evaluated and everything is correct
// fail→ The check was evaluated and something is wrong

    $incidents = InspectionCheck::whereHas('inspection', function ($query) use ($project) {
        $query->where('project_id', $project);
    })
    ->where('status', 'fail')
    ->with('inspection')
    ->latest()
    ->get()
    ->map(function ($check) {
        return [
            'id' => $check->id,
            'title' => $check->check_name,
            'severity' => ucfirst($check->severity ?? 'low'),
            'dateTime' => $check->inspection?->inspection_date
                ? Carbon::parse($check->inspection->inspection_date)->format('d/m/Y')
                : 'No date',
            'status' => $check->inspection?->status === 'completed'
                ? 'Closed'
                : 'Open',
        ];
    });

    return response()->json($incidents);

}
public function storeIncident(Request $request, $project)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'type' => 'required|in:safety,quality',
        'task_id' => 'nullable|exists:tasks,id',
        'inspection_date' => 'nullable|date',
        'notes' => 'nullable|string',

        'checks' => 'required|array|min:1',

        'checks.*.check_name' => 'required|string|max:255',
        'checks.*.required_value' => 'nullable|string|max:255',
        'checks.*.actual_value' => 'nullable|string|max:255',
        'checks.*.unit' => 'nullable|string|max:255',
        'checks.*.status' => 'required|in:pending,ok,fail',
        'checks.*.severity' => 'nullable|in:low,medium,high',
        'checks.*.comment' => 'nullable|string',
    ]);

    try {
        DB::beginTransaction();

        // Temporary until authentication is connected
        $userId = 54;

        $inspection = Inspection::create([
            'project_id' => $project,
            'task_id' => $validated['task_id'] ?? null,
            'inspected_by' => $userId,
            'type' => $validated['type'],
            'title' => $validated['title'],
            'inspection_date' => $validated['inspection_date'] ?? now()->toDateString(),
            'status' => 'completed',
            'notes' => $validated['notes'] ?? null,
        ]);

        foreach ($validated['checks'] as $check) {
            InspectionCheck::create([
                'inspection_id' => $inspection->id,
                'check_name' => $check['check_name'],
                'required_value' => $check['required_value'] ?? null,
                'actual_value' => $check['actual_value'] ?? null,
                'unit' => $check['unit'] ?? null,
                'status' => $check['status'],
                'severity' => $check['status'] === 'fail'
                    ? ($check['severity'] ?? null)
                    : null,
                'comment' => $check['comment'] ?? null,
            ]);
        }

        DB::commit();

        $inspection->load('checks');

        return response()->json([
            'message' => 'Incident reported successfully',
            'incident' => $inspection,
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => 'Failed to report incident',
            'error' => $e->getMessage(),
        ], 500);
    }
}
public function getResources($project)
{
    $resources = Resource::where('project_id', $project)
        ->orderBy('name')
        ->get([
            'id',
            'name',
            'type',
            'quantity',
            'unit',
            'status',
            'supplier'
        ]);

    return response()->json([
        'resources' => $resources
    ]);
}
public function createResource(Request $request, $project)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'type' => 'required|in:material,equipment,tool,vehicle',
        'quantity' => 'required|integer|min:0',
        'unit' => 'required|in:unit,piece,kg,tonne,litre,m3,m2,m,mm,bag,box,pallet,roll,sheet,bar,bundle,load,hour,day', 
       'status' => 'required|in:available,in_use,damaged,out_of_stock',
        'supplier' => 'nullable|string|max:255',
    ]);

    $resource = Resource::create([
        'project_id' => $project,
        'name' => $validated['name'],
        'type' => $validated['type'],
        'quantity' => $validated['quantity'],
        'unit_cost' => $validated['unit'] ?? 0,
        'status' => $validated['status'],
        'supplier' => $validated['supplier'] ?? null,
    ]);

    return response()->json([
        'message' => 'Resource added successfully',
        'resource' => $resource
    ], 201);
}

 

}