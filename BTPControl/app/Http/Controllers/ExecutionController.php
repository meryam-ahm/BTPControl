<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\InspectionCheck;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class ExecutionController extends Controller
{
    public function quality($inspectionId): JsonResponse
    {
        $inspection = Inspection::where('id', $inspectionId)
            ->where('type', 'quality')
            ->firstOrFail();

        return response()->json(
            $inspection->checks()
                ->select([
                    'id',
                    'inspection_id',
                    'check_name',
                    'required_value',
                    'actual_value',
                    'unit',
                    'status',
                    'severity',
                    'comment',
                ])
                ->get()
        );
    }

    public function safety($projectId): JsonResponse
    {
        $checks = InspectionCheck::whereHas(
            'inspection',
            fn ($query) => $query
                ->where('project_id', $projectId)
                ->where('type', 'safety')
        )->whereIn('status', ['ok', 'fail'])->get();

        $total = $checks->count();

        return response()->json([
            [
                'name' => 'Low',
                'value' => $total
                    ? round(
                        $checks->where('severity', 'low')->count()
                        / $total * 100
                    )
                    : 0,
                'color' => '#22c55e',
            ],
            [
                'name' => 'Medium',
                'value' => $total
                    ? round(
                        $checks->where('severity', 'medium')->count()
                        / $total * 100
                    )
                    : 0,
                'color' => '#f59e0b',
            ],
            [
                'name' => 'High',
                'value' => $total
                    ? round(
                        $checks->where('severity', 'high')->count()
                        / $total * 100
                    )
                    : 0,
                'color' => '#ef4444',
            ],
        ]);
    }

    public function execution($projectId): JsonResponse
    {
        $phases = Task::where('project_id', $projectId)
            ->whereNull('parent_task_id')
            ->select('id', 'title', 'progress')
            ->get();

        $totalPhases = $phases->count();

        $qualityChecks = InspectionCheck::whereHas(
            'inspection',
            fn ($query) => $query
                ->where('project_id', $projectId)
                ->where('type', 'quality')
        )->whereIn('status', ['ok', 'fail'])->get();

        $safetyChecks = InspectionCheck::whereHas(
            'inspection',
            fn ($query) => $query
                ->where('project_id', $projectId)
                ->where('type', 'safety')
        )->whereIn('status', ['ok', 'fail'])->get();

        $qualityScore = $qualityChecks->count()
            ? round(
                $qualityChecks->where('status', 'ok')->count()
                / $qualityChecks->count() * 100
            )
            : 0;

        $safetyScore = $safetyChecks->count()
            ? round(
                $safetyChecks->where('status', 'ok')->count()
                / $safetyChecks->count() * 100
            )
            : 0;

        $nonConformities = InspectionCheck::where('status', 'fail')
            ->whereHas(
                'inspection',
                fn ($query) =>
                    $query->where('project_id', $projectId)
            )
            ->get();

        return response()->json([
            'phases' => $phases,

            'qualityInspection' => Inspection::where(
                'project_id',
                $projectId
            )
                ->where('type', 'quality')
                ->latest()
                ->first(),

            'inspections' => Inspection::where(
                'project_id',
                $projectId
            )
                ->latest()
                ->take(5)
                ->get(),

            'nonConformities' => $nonConformities,

            'kpis' => [
                'global_progress' => $totalPhases
                    ? round($phases->avg('progress'))
                    : 0,

                'completed_phases' =>
                    $phases->where('progress', 100)->count(),

                'total_phases' => $totalPhases,

                'quality_score' => $qualityScore,
                'safety_score' => $safetyScore,

                'failures' => $nonConformities->count(),

                'open_inspections' => Inspection::where(
                    'project_id',
                    $projectId
                )
                    ->whereIn('status', ['draft', 'open'])
                    ->count(),
            ],
        ]);
    }
}