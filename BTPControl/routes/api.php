<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| GENERAL CONTROLLERS
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ExecutionController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\InspectionCheckController;
use App\Http\Controllers\NonConformityController;

/*
|--------------------------------------------------------------------------
| ENGINEER
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Engineer\DashboardController
    as EngineerDashboardController;

/*
|--------------------------------------------------------------------------
| SITE MANAGER
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\SiteManager\DashboardController
    as SiteManagerDashboardController;

use App\Http\Controllers\SiteManager\WorkerController
    as SiteManagerWorkerController;

use App\Http\Controllers\SiteManager\TaskController
    as SiteManagerTaskController;

use App\Http\Controllers\SiteManager\ResourceController
    as SiteManagerResourceController;

use App\Http\Controllers\SiteManager\IncidentController
    as SiteManagerIncidentController;

/*
|--------------------------------------------------------------------------
| WORKER
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\Worker\DashboardController
    as WorkerDashboardController;

use App\Http\Controllers\Worker\TaskController
    as WorkerTaskController;

use App\Http\Controllers\Worker\ReportController
    as WorkerReportController;

use App\Http\Controllers\Worker\ActivityController
    as WorkerActivityController;


/*
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| PUBLIC AUTHENTICATION
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {

    Route::post(
        '/register',
        [AuthController::class, 'register']
    );

    Route::post(
        '/login',
        [AuthController::class, 'login']
    );
});


/*
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| AUTHENTICATED APPLICATION
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | ENGINEER
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ENGINEER DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::get(
        'engineer/dashboard/stats',
        [EngineerDashboardController::class, 'stats']
    );

    Route::get(
        'engineer/dashbored/table',
        [EngineerDashboardController::class, 'table']
    );

    Route::get(
        'engineer/dashbored/clients',
        [EngineerDashboardController::class, 'clients']
    );

    Route::get(
        'engineer/dashbored/projects/search',
        [EngineerDashboardController::class, 'searchProject']
    );

    Route::get(
        'engineer/dashbored/projects/filter',
        [EngineerDashboardController::class, 'filterProjects']
    );

    Route::get(
        'engineer/dashbored/filters-data',
        [EngineerDashboardController::class, 'filtersData']
    );


    /*
    |--------------------------------------------------------------------------
    | ENGINEER PROJECT UPDATE
    |--------------------------------------------------------------------------
    */

    Route::put(
        'engineer/projects/{project}',
        [EngineerDashboardController::class, 'update']
    );


    /*
    |--------------------------------------------------------------------------
    | ENGINEER PROJECT DELETE
    |--------------------------------------------------------------------------
    */

    Route::delete(
        'engineer/projects/{project}',
        [EngineerDashboardController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | ENGINEER PROJECTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'engineer/getProjects',
        [ProjectController::class, 'getProjects']
    );

    Route::get(
        'engineer/projects/{projectId}/workers',
        [ProjectController::class, 'getProjectWorkers']
    );


    /*
    |--------------------------------------------------------------------------
    | ENGINEER TASKS
    |--------------------------------------------------------------------------
    */

    Route::post(
        'engineer/TaskController/CreateTask',
        [TaskController::class, 'store']
    );

    Route::get(
        'engineer/TaskController/task-form-data',
        [TaskController::class, 'index']
    );

    Route::get(
        'engineer/TaskController/tasksList',
        [TaskController::class, 'tasksList']
    );

    Route::get(
        'engineer/projects/{projectId}/tasks',
        [TaskController::class, 'getProjectTasks']
    );

    Route::post(
        'engineer/TaskController/tasks/{taskId}/upload-media',
        [TaskController::class, 'uploadTaskMedia']
    );


    /*
    |--------------------------------------------------------------------------
    | PROJECT TIMELINE
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/timeline',
        [TaskController::class, 'timeline']
    );


    /*
    |--------------------------------------------------------------------------
    | PROJECT STATS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{id}/stats',
        [ProjectController::class, 'stats']
    );


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | EXECUTION
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/execution',
        [ExecutionController::class, 'execution']
    );

    Route::get(
        'inspections/{id}/getquality',
        [ExecutionController::class, 'quality']
    );

    Route::get(
        'projects/{id}/getsafety',
        [ExecutionController::class, 'safety']
    );


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | INSPECTIONS
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/inspections',
        [InspectionController::class, 'index']
    );

    Route::get(
        'inspections/{id}',
        [InspectionController::class, 'show']
    );

    Route::post(
        'inspections',
        [InspectionController::class, 'store']
    );

    Route::post(
        'inspection-checks',
        [InspectionCheckController::class, 'store']
    );

    Route::get(
        'projects/{projectId}/non-conformities',
        [InspectionController::class, 'nonConformities']
    );


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | NON-CONFORMITIES
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/non-conformities/list',
        [NonConformityController::class, 'index']
    );

    Route::get(
        'non-conformities/{id}',
        [NonConformityController::class, 'show']
    );

    Route::post(
        'non-conformities',
        [NonConformityController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | SITE MANAGER
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER PROJECTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'SiteManager/getProjects',
        [SiteManagerDashboardController::class, 'projects']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER DASHBOARD STATS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{project}/statsSiteManager',
        [SiteManagerDashboardController::class, 'stats']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER WORKERS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{project}/workers',
        [SiteManagerDashboardController::class, 'selectedProject']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER TASKS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{project}/tasks',
        [SiteManagerDashboardController::class, 'tasks']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER TASK FORM DATA
    |--------------------------------------------------------------------------
    */

    Route::get(
        'SiteManager/{project}/task-form-data',
        [SiteManagerDashboardController::class, 'taskFormData']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER PROJECT TASKS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'SiteManager/projects/{project}/tasks',
        [SiteManagerDashboardController::class, 'tasks']
    );


    /*
    |--------------------------------------------------------------------------
    | CREATE SITE MANAGER TASK
    |--------------------------------------------------------------------------
    */

    Route::post(
        'SiteManager/CreateTask',
        [SiteManagerTaskController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | CREATE WORKER
    |--------------------------------------------------------------------------
    */

    Route::post(
        'SiteManager/projects/{project}/CreateWorker',
        [SiteManagerWorkerController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER ATTENDANCE
    |--------------------------------------------------------------------------
    */

    Route::get(
        'workers/{worker}/attendance',
        [SiteManagerWorkerController::class, 'attendance']
    );


    /*
    |--------------------------------------------------------------------------
    | REMOVE WORKER FROM PROJECT
    |--------------------------------------------------------------------------
    */

    Route::delete(
        'projects/{project}/workers/{worker}',
        [SiteManagerWorkerController::class, 'destroy']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER RESOURCES
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{project}/resources',
        [SiteManagerResourceController::class, 'index']
    );

    Route::post(
        'projects/{project}/createResource',
        [SiteManagerResourceController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER INCIDENTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{project}/incidents',
        [SiteManagerIncidentController::class, 'index']
    );

    Route::post(
        'projects/{project}/incidents',
        [SiteManagerIncidentController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | SITE MANAGER PHOTO
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{project}/photo',
        [SiteManagerDashboardController::class, 'photo']
    );


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | WORKER
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | WORKER PROJECTS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'Worker/getProjects',
        [WorkerDashboardController::class, 'projects']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER HOME
    |--------------------------------------------------------------------------
    */

    Route::get(
        'Worker/projects/{project}/home',
        [WorkerDashboardController::class, 'home']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER REPORT
    |--------------------------------------------------------------------------
    */

    Route::post(
        'Worker/projects/{project}/report',
        [WorkerReportController::class, 'store']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER TASK COMPLETE
    |--------------------------------------------------------------------------
    */

    Route::patch(
        'Worker/tasks/{task}/done',
        [WorkerTaskController::class, 'complete']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER ACTIVITY CHAT - GET
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/worker-activity/chat',
        [WorkerActivityController::class, 'messages']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER ACTIVITY CHAT - POST
    |--------------------------------------------------------------------------
    */

    Route::post(
        'projects/{projectId}/worker-activity/chat',
        [WorkerActivityController::class, 'sendMessage']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER ACTIVITY ATTENDANCE
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/worker-activity/attendance',
        [WorkerActivityController::class, 'attendance']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER CHECK IN
    |--------------------------------------------------------------------------
    */

    Route::post(
        'projects/{projectId}/worker-activity/check-in',
        [WorkerActivityController::class, 'checkIn']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER CHECK OUT
    |--------------------------------------------------------------------------
    */

    Route::post(
        'projects/{projectId}/worker-activity/check-out',
        [WorkerActivityController::class, 'checkOut']
    );


    /*
    |--------------------------------------------------------------------------
    | WORKER NOTIFICATIONS
    |--------------------------------------------------------------------------
    */

    Route::get(
        'projects/{projectId}/worker-activity/notifications',
        [WorkerActivityController::class, 'notifications']
    );


    /*
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    | CURRENT USER
    |--------------------------------------------------------------------------
    |--------------------------------------------------------------------------
    */

    Route::get(
        'auth/me',
        [AuthController::class, 'me']
    );


    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    Route::post(
        'auth/logout',
        [AuthController::class, 'logout']
    );
});