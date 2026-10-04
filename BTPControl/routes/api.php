<?php

use Illuminate\Support\Facades\Route;

// =========================
// AUTHENTICATION
// =========================

use App\Http\Controllers\Auth\AuthController;

// =========================
// SHARED DOMAIN CONTROLLERS
// =========================

use App\Http\Controllers\TaskController;
use App\Http\Controllers\ExecutionController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\InspectionCheckController;
use App\Http\Controllers\NonConformityController;
use App\Http\Controllers\ChatMessageController;
// =========================
// ENGINEER CONTROLLERS
// =========================

use App\Http\Controllers\Engineer\ProjectController;
use App\Http\Controllers\Engineer\DashboardController
    as EngineerDashboardController;

// =========================
// SITE MANAGER CONTROLLERS
// =========================

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

// =========================
// WORKER CONTROLLERS
// =========================

use App\Http\Controllers\Worker\DashboardController
    as WorkerDashboardController;

use App\Http\Controllers\Worker\TaskController
    as WorkerTaskController;

use App\Http\Controllers\Worker\ReportController
    as WorkerReportController;

use App\Http\Controllers\Worker\ActivityController
    as WorkerActivityController;

use App\Http\Controllers\SiteManager\WorkerController 
     as WorkerControllerForSiteManager;


// =========================================================
// PUBLIC AUTHENTICATION ROUTES
// =========================================================

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


// =========================================================
// AUTHENTICATED API
// =========================================================

Route::middleware('auth:sanctum')->group(function () {

    // =====================================================
    // AUTHENTICATED USER
    // =====================================================

    Route::get(
        'auth/me',
        [AuthController::class, 'me']
    );

    Route::post(
        'auth/logout',
        [AuthController::class, 'logout']
    );

    //===========================================
    //Chat routes
    //==============================================
     Route::get(
        '/projects/{project}/chat',
        [ChatMessageController::class, 'index']
    );

    Route::post(
        '/projects/{project}/chat',
        [ChatMessageController::class, 'store']
    );
    // =====================================================
    // ENGINEER
    // =====================================================

    // Engineer Dashboard
    Route::get(
        'engineer/dashboard',
        [EngineerDashboardController::class, 'index']
    );
     

    // Engineer Dashboard - Project Filters
    Route::get(
        'engineer/dashbored/projects/filters-data',
        [EngineerDashboardController::class, 'filtersData']
    );
 
    Route::get('/tasks/task-inbox', [TaskController::class, 'taskInbox'] );

 
    // Engineer Dashboard - Projects
    // IMPORTANT: uses DashboardController::table()
    // because this method contains pagination + filters
    Route::get(
        'engineer/dashbored/projects',
        [EngineerDashboardController::class, 'table']
    );


    // Engineer Dashboard Statistics
    Route::get(
        'engineer/dashboard/stats',
        [EngineerDashboardController::class, 'stats']
    );


    // Create Project
    Route::post(
        'engineer/projects',
        [ProjectController::class, 'store']
    );


    // Show Project
    Route::get(
        'engineer/projects/{project}',
        [ProjectController::class, 'show']
    );


    // Update Project
    Route::put(
        'engineer/projects/{project}',
        [ProjectController::class, 'update']
    );


    // Delete Project
    Route::delete(
        'engineer/projects/{project}',
        [ProjectController::class, 'destroy']
    );
    // loading projects in planning page 
     Route::get('engineer/getProjects',[ProjectController::class,'getProjects']);
 

    // =====================================================
    // ENGINEER - TASKS
    // =====================================================
     //stats in planing page based on selected project 
    Route::get(
    'engineer/projects/{id}/stats',
    [ProjectController::class, 'stats']
);

// get workers in planing page
  Route::get(
    'engineer/projects/{id}/workers',
    [ProjectController::class, 'getProjectWorkers']
);
 // Project Timeline / Gantt
    Route::get(
        '/engineer/projects/{project}/timeline',
        [TaskController::class, 'timeline']
    );
    // get parent task dependignon the selected project in the task form
 Route::get(
    '/engineer/TaskController/parent-tasks/{projectId}',
    [TaskController::class, 'getParentTasks']
);

    // Shared Task Form Data

    Route::get(
        'engineer/TaskController/task-form-data',
        [TaskController::class, 'index']
    );


    // Create Task
    Route::post(
        'engineer/TaskController/CreateTask',
        [TaskController::class, 'store']
    );


    // Engineer Project Tasks
    Route::get(
        'engineer/projects/{project}/tasks',
        [TaskController::class, 'projectTasks']
    );


    // Shared Project Tasks
    Route::get(
        'projects/{project}/tasks',
        [TaskController::class, 'projectTasks']
    );


   

    // Task Media
    Route::post(
        'engineer/TaskController/tasks/{task}/upload-media',
        [TaskController::class, 'uploadMedia']
    );


    // =====================================================
    // ENGINEER - EXECUTION / INSPECTIONS
    // =====================================================

    // Execution
    Route::get(
        'engineer/projects/{project}/execution',
        [ExecutionController::class, 'execution']
    );
    Route::get(   
        'engineer/inspections/{inspectionId}/getquality',
        [ExecutionController::class, 'quality']
    );
  Route::get(
    'engineer/projects/{projectId}/getsafety',
    [ExecutionController::class, 'safety']
);
   
    Route::post(
        'engineer/projects/{project}/execution',
        [ExecutionController::class, 'store']
    );


    // Inspections
    Route::get(
        'engineer/projects/{projectId}/inspections',
        [InspectionController::class, 'index']
    );

    Route::post(
        'engineer/projects/{project}/inspections',
        [InspectionController::class, 'store']
    );


    // Inspection Checks
    Route::get(
        'engineer/inspections/{inspection}/checks',
        [InspectionCheckController::class, 'index']
    );

    Route::post(
        'engineer/inspections-checks',
        [InspectionCheckController::class, 'store']
    );


    // Non-Conformities
    Route::get(
        'engineer/projects/{project}/non-conformities',
        [NonConformityController::class, 'index']
    );

    Route::get(
         'engineer/projects/{projectId}/site-managers',
          [NonConformityController::class, 'siteManagers']
    );

    Route::post(
        'engineer/projects/{project}/non-conformities',
        [NonConformityController::class, 'store']
    );

    //get site managers to  Report incident 
      
    Route::get(
        'engineer/projects/{projectId}/site-managers',
        [NonConformityController::class, 'siteManagers']
    );
    
    // store te incident i non conformaities table

    Route::post(
        'engineer/non-conformities',
        [NonConformityController::class, 'store']
    );

    Route::get(
    'engineer/inspections/{id}',
    [InspectionController::class, 'show']
);
    // =====================================================
    // SITE MANAGER
    // =====================================================

    // Site Manager Projects
    Route::get(
        'SiteManager/Projects',
        [SiteManagerDashboardController::class, 'projects']
    );

    // Site Manager Dashboard Statistics
    Route::get(
        'projects/{project}/statsSiteManager',
        [SiteManagerDashboardController::class, 'stats']
    );


    // Project Photo
    Route::get(
        'projects/{project}/photo',
        [SiteManagerDashboardController::class, 'photo']
    );


    // Site Manager Workers
    Route::get(
        'projects/{project}/workers',
        [SiteManagerDashboardController::class, 'selectedProject']
    );

      Route::post("/SiteManager/projects/{project}/CreateWorker/",
      [WorkerControllerForSiteManager::class,'CreateWorker']); 

    // Site Manager Tasks
    Route::get(
        'SiteManager/projects/{project}/tasks',
        [SiteManagerDashboardController::class, 'tasks']
    );


    // Site Manager Task Form Data
    Route::get(
        'SiteManager/{project}/task-form-data',
        [SiteManagerDashboardController::class, 'taskFormData']
    );


    // Site Manager Create Task
    Route::post(
        'SiteManager/CreateTask',
        [SiteManagerTaskController::class, 'store']
    );


    // Site Manager Workers Management
    Route::get(
        'SiteManager/projects/{project}/workers',
        [SiteManagerWorkerController::class, 'index']
    );


    // =====================================================
    // SITE MANAGER - RESOURCES
    // =====================================================

    Route::get(
        'projects/{project}/resources',
        [SiteManagerResourceController::class, 'index']
    );

    Route::post(
        'projects/{project}/createResource',
        [SiteManagerResourceController::class, 'store']
    );


    // =====================================================
    // SITE MANAGER - INCIDENTS
    // =====================================================

    Route::get(
        'projects/{project}/incidents',
        [SiteManagerIncidentController::class, 'index']
    );

    Route::post(
        'projects/{project}/incidents',
        [SiteManagerIncidentController::class, 'store']
    );


    // =====================================================
    // WORKER
    // =====================================================

    // Worker Projects
    Route::get(
        'Worker/getProjects',
        [WorkerDashboardController::class, 'projects']
    );


    // Worker Dashboard
    Route::get(
        'Worker/projects/{project}/home',
        [WorkerDashboardController::class, 'home']
    );


    // Worker Reports
    Route::post(
        'Worker/projects/{project}/report',
        [WorkerReportController::class, 'store']
    );


    // Worker Complete Task
    Route::patch(
        'Worker/tasks/{task}/done',
        [WorkerTaskController::class, 'complete']
    );


    // =====================================================
    // WORKER ACTIVITY
    // =====================================================

    // Chat - Get Messages
    Route::get(
        'projects/{project}/worker-activity/chat',
        [WorkerActivityController::class, 'messages']
    );


    // Chat - Send Message
    Route::post(
        'projects/{project}/worker-activity/chat',
        [WorkerActivityController::class, 'sendMessage']
    );


    // Attendance
    Route::get(
        'projects/{project}/worker-activity/attendance',
        [WorkerActivityController::class, 'attendance']
    );


    // Check In
    Route::post(
        'projects/{project}/worker-activity/check-in',
        [WorkerActivityController::class, 'checkIn']
    );


    // Check Out
    Route::post(
        'projects/{project}/worker-activity/check-out',
        [WorkerActivityController::class, 'checkOut']
    );


    // Notifications
    Route::get(
        'projects/{project}/worker-activity/notifications',
        [WorkerActivityController::class, 'notifications']
    );

});