<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Inspection;
use App\Models\InspectionCheck;

class ExecutionController extends Controller
{
    public function getquality($inspectionId)
    {
        $inspection = Inspection::where('id', $inspectionId)
            ->where('type', 'quality')
            ->firstOrFail();

        $checks = InspectionCheck::where('inspection_id', $inspection->id)
            ->select(
                'id',
                'inspection_id',
                'check_name',
                'required_value',
                'actual_value',
                'unit',
                'status',
                'severity',
                'comment'
            )
            ->get();

        return response()->json($checks);
    }

public function getsafety($projectId)
{
    $checks = InspectionCheck::whereHas('inspection', function ($q) use ($projectId) {
        $q->where('project_id', $projectId)
          ->where('type', 'safety');
    })->get();

    $total = $checks->count();

    $low = $checks->where('severity', 'low')->count();
    $medium = $checks->where('severity', 'medium')->count();
    $high = $checks->where('severity', 'high')->count();

    return response()->json([
        [
            "name" => "Low",
            "value" => $total ? round(($low / $total) * 100) : 0,
            "color" => "#22c55e"
        ],
        [
            "name" => "Medium",
            "value" => $total ? round(($medium / $total) * 100) : 0,
            "color" => "#f59e0b"
        ],
        [
            "name" => "High",
            "value" => $total ? round(($high / $total) * 100) : 0,
            "color" => "#ef4444"
        ]
    ]);
}

  public function execution($projectId)
{
    // =========================
    // PHASES
    // =========================

    $phases = Task::where('project_id', $projectId)
        ->select('id', 'title', 'progress')
        ->get();
   
    $totalPhases = $phases->count();

    $completedPhases = $phases->where('progress', 100)->count();
    
    $globalProgress = $totalPhases > 0
        ? round($phases->avg('progress'))
        : 0;

    // =========================
    // QUALITY INSPECTION
    // =========================

    $qualityInspection = Inspection::where('project_id', $projectId)
        ->where('type', 'quality')
        ->latest()
        ->first();

    // =========================
    // INSPECTIONS LIST
    // =========================

    $inspections = Inspection::where('project_id', $projectId)
        ->latest()
        ->take(5)
        ->get();

    // =========================
    // NON CONFORMITIES
    // =========================

    $nonConformities = InspectionCheck::where('status', 'fail')
        ->whereHas('inspection', function ($q) use ($projectId) {
            $q->where('project_id', $projectId);
        })
        ->get();

    $failures = $nonConformities->count();

    // =========================
    // QUALITY SCORE
    // =========================

    $totalQualityChecks = InspectionCheck::whereHas('inspection', function ($q) use ($projectId) {
        $q->where('project_id', $projectId)
          ->where('type', 'quality');
    })->count();

    $passedQualityChecks = InspectionCheck::where('status', 'ok')
        ->whereHas('inspection', function ($q) use ($projectId) {
            $q->where('project_id', $projectId)
              ->where('type', 'quality');
        })
        ->count();

    $qualityScore = $totalQualityChecks > 0
        ? round(($passedQualityChecks / $totalQualityChecks) * 100)
        : 0;

    // =========================
    // SAFETY SCORE
    // =========================

    $totalSafetyChecks = InspectionCheck::whereHas('inspection', function ($q) use ($projectId) {
        $q->where('project_id', $projectId)
          ->where('type', 'safety');
    })->count();

    $passedSafetyChecks = InspectionCheck::where('status', 'ok')
        ->whereHas('inspection', function ($q) use ($projectId) {
            $q->where('project_id', $projectId)
              ->where('type', 'safety');
        })
        ->count();

    $safetyScore = $totalSafetyChecks > 0
        ? round(($passedSafetyChecks / $totalSafetyChecks) * 100)
        : 0;

    // =========================
    // OPEN INSPECTIONS
    // =========================

    $openInspections = Inspection::where('project_id', $projectId)
        ->where('status', 'open')
        ->count();

    // =========================
    // RESPONSE
    // =========================

    return response()->json([
        'phases' => $phases,

        'qualityInspection' => $qualityInspection,

        'inspections' => $inspections,

        'nonConformities' => $nonConformities,

        'kpis' => [
            'global_progress' => $globalProgress,
            'completed_phases' => $completedPhases,
            'total_phases' => $totalPhases,

            'quality_score' => $qualityScore,
            'safety_score' => $safetyScore,

            'failures' => $failures,
            'open_inspections' => $openInspections,
        ],
    ]);
}
}