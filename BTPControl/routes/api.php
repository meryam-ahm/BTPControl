<?php
use App\Http\Controllers\ProjectUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EngineerDashboardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ExecutionController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\NonConformityController;
use App\Http\Controllers\InspectionCheckController;
use App\Http\Controllers\SiteManagerTasksController;
use App\Http\Controllers\SiteManagerController;
use App\Http\Controllers\WorkerController;
use Illuminate\Http\Request;
use App\Http\Controllers\WorkerActivityController;

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

Route::get('engineer/dashboard/stats', [EngineerDashboardController::class, 'stats']);
Route::get('engineer/dashbored/table', [EngineerDashboardController::class, 'table']);
Route::get('engineer/dashbored/clients', [EngineerDashboardController::class, 'clients']);
Route::delete(
    '/engineer/projects/{project}',
    [EngineerDashboardController::class, 'destroy']
);
Route::put(
    '/engineer/projects/{project}',
    [EngineerDashboardController::class, 'update']
);
Route::post('engineer/dashbored/createproject', [EngineerDashboardController::class, 'createProject']);
Route::post('engineer/dashbored/createClient', [EngineerDashboardController::class, 'createClient']);

Route::get('engineer/dashbored/projects/search', [EngineerDashboardController::class, 'searchProject']);
Route::get('engineer/dashbored/projects/filter', [EngineerDashboardController::class, 'filterProjects']);
Route::get('engineer/dashbored/filters-data', [EngineerDashboardController::class, 'filtersData']);

/*
|--------------------------------------------------------------------------
| Projects / Tasks
|--------------------------------------------------------------------------
*/

Route::get('/projects/{projectId}/timeline', [TaskController::class, 'timeline']);

Route::get('engineer/getProjects', [ProjectController::class, 'getProjects']);

Route::get('engineer/projects/{projectId}/workers', [ProjectController::class, 'getProjectWorkers']);

Route::post('engineer/TaskController/CreateTask', [TaskController::class, 'store']);

Route::get('engineer/TaskController/task-form-data', [TaskController::class, 'index']);

Route::get('engineer/TaskController/tasksList', [TaskController::class, 'tasksList']);

Route::get('engineer/projects/{projectId}/tasks', [TaskController::class, 'getProjectTasks']);

Route::post('engineer/TaskController/tasks/{taskId}/upload-media', [TaskController::class, 'uploadTaskMedia']);

/*
|--------------------------------------------------------------------------
| Execution / Stats
|--------------------------------------------------------------------------
*/

Route::get('/projects/{id}/stats', [ProjectController::class, 'stats']);

Route::get('/projects/{projectId}/execution', [ExecutionController::class, 'execution']);

Route::get('/inspections/{id}/getquality', [ExecutionController::class, 'getquality']);

Route::get('/projects/{id}/getsafety', [ExecutionController::class, 'getsafety']);

/*
|--------------------------------------------------------------------------
| INSPECTIONS (IMPORTANT FIX HERE)
|--------------------------------------------------------------------------
*/

Route::get('/projects/{projectId}/inspections', [InspectionController::class, 'index']);

Route::get('/inspections/{id}', [InspectionController::class, 'show']);
Route::get('/projects/{projectId}/non-conformities',[InspectionController::class, 'nonConformities']);
Route::post('/non-conformities',[NonConformityController::class, 'store']);
 
Route::get('/projects/{projectId}/site-managers',[ProjectUserController::class, 'siteManagers']
); 
// Route::get('/projects/{project}/quick-actions',
// [QuickActionController::class,'index']
// );

Route::post('/inspections',[InspectionController::class, 'store']);

Route::post('/inspection-checks',[InspectionCheckController::class, 'store']);

// Route::get('/projects/{project}/quick-actions',[QuickActionController::class, 'index']);

Route::get('/site-manager/workers',[SiteManagerTasksController::class, 'workers']);

Route::post('/site-manager/tasks/create-worker-task',[SiteManagerTasksController::class, 'createWorkerTask']);
 
Route::get('/site-manager/tasks',[SiteManagerTasksController::class, 'index']);
/* 
|--------------------------------------------------------------------------
| Site Manager routes
|--------------------------------------------------------------------------
*/
  Route::get('/SiteManager/getProjects',[SiteManagerController::class,'getProjects']);
  Route::get('/projects/{project}/statsSiteManager',[SiteManagerController::class, 'statsSiteManager']);
  Route::get('/projects/{project}/workers/',[SiteManagerController::class,'stats_selectedproject']);
  Route::get("/projects/{project}/tasks/",[SiteManagerController::class,"stats_selectedproject"]);
  Route::get("/SiteManager/{project}/task-form-data",[SiteManagerController::class,'taskFormData']);
  Route::get("/SiteManager/projects/{project}/tasks",[SiteManagerController::class,'tasks_selectedProject']);
  Route::post("/SiteManager/CreateTask/",[SiteManagerController::class,'CreateTask']);
  Route::post("/SiteManager/projects/{project}/CreateWorker/",[SiteManagerController::class,'CreateWorker']);
  Route::get('/workers/{worker}/attendance', [SiteManagerController::class, 'getWorkerAttendance']);
  Route::delete('/projects/{project}/workers/{worker}', [SiteManagerController::class, 'removeWorkerFromProject']);
  Route::get('/projects/{project}/incidents', [SiteManagerController::class, 'getIncidents']);
Route::post('/projects/{project}/incidents',[SiteManagerController::class, 'storeIncident']);
Route::get('/projects/{project}/resources', [SiteManagerController::class, 'getResources']);
Route::post('/projects/{project}/createResource',[SiteManagerController::class, 'createResource']);
Route::get('/projects/{project}/photo', [SiteManagerController::class, 'getProjectPhoto']);



/*
|--------------------------------------------------------------------------
| Worker inerface routes
|--------------------------------------------------------------------------
*/
 
Route::get(
    '/Worker/getProjects',
    [WorkerController::class, 'getProjects']
);

Route::get(
    '/Worker/projects/{project}/home',
    [WorkerController::class, 'home']
);

Route::post(
    '/Worker/projects/{project}/report',
    [WorkerController::class, 'reportIssue']
);

Route::patch(
    '/Worker/tasks/{task}/done',
    [WorkerController::class, 'markTaskDone']
);


 

/*
|--------------------------------------------------------------------------
| Worker Activity
|--------------------------------------------------------------------------
| Temporary development setup:
| worker ID 48 is used until authentication/login is implemented.
|--------------------------------------------------------------------------
*/

Route::get(
    '/projects/{projectId}/worker-activity/chat',
    [WorkerActivityController::class, 'getMessages']
);

Route::post(
    '/projects/{projectId}/worker-activity/chat',
    [WorkerActivityController::class, 'sendMessage']
);

Route::get(
    '/projects/{projectId}/worker-activity/attendance',
    [WorkerActivityController::class, 'getMyAttendance']
);

Route::post(
    '/projects/{projectId}/worker-activity/check-in',
    [WorkerActivityController::class, 'checkIn']
);

Route::post(
    '/projects/{projectId}/worker-activity/check-out',
    [WorkerActivityController::class, 'checkOut']
);

Route::get(
    '/projects/{projectId}/worker-activity/notifications',
    [WorkerActivityController::class, 'getNotifications']
);
 