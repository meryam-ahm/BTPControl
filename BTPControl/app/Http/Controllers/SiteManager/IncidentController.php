<?php

namespace App\Http\Controllers\SiteManager;

use App\Http\Controllers\Controller;
use App\Models\Inspection;
use App\Models\InspectionCheck;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IncidentController extends Controller
{
    public function index($projectId): JsonResponse
    {
        $incidents = InspectionCheck::where('status', 'fail')
            ->whereHas('inspection', function ($query) use ($projectId) {
                $query->where('project_id', $projectId);
            })
            ->with('inspection')
            ->latest()
            ->get()
            ->map(fn ($check) => [
                'id' => $check->id,
                'title' => $check->check_name,
                'severity' => ucfirst($check->severity ?? 'low'),
                'dateTime' => $check->inspection?->inspection_date
                    ? $check->inspection->inspection_date->format('d/m/Y')
                    : 'No date',
                'status' => $check->inspection?->status === 'completed'
                    ? 'Closed'
                    : 'Open',
            ]);

        return response()->json($incidents);
    }

    public function store(Request $request, $projectId): JsonResponse
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

        $inspection = DB::transaction(function () use (
            $validated,
            $projectId
        ) {
            $inspection = Inspection::create([
                'project_id' => $projectId,
                'task_id' => $validated['task_id'] ?? null,

                // Temporary until Sanctum
                'inspected_by' => 54,

                'type' => $validated['type'],
                'title' => $validated['title'],
                'inspection_date' =>
                    $validated['inspection_date']
                    ?? now()->toDateString(),

                'status' => 'completed',
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($validated['checks'] as $check) {
                InspectionCheck::create([
                    'inspection_id' => $inspection->id,
                    'check_name' => $check['check_name'],
                    'required_value' =>
                        $check['required_value'] ?? null,
                    'actual_value' =>
                        $check['actual_value'] ?? null,
                    'unit' => $check['unit'] ?? null,
                    'status' => $check['status'],
                    'severity' =>
                        $check['status'] === 'fail'
                            ? ($check['severity'] ?? null)
                            : null,
                    'comment' => $check['comment'] ?? null,
                ]);
            }

            return $inspection;
        });

        return response()->json([
            'message' => 'Incident reported successfully.',
            'incident' => $inspection->load('checks'),
        ], 201);
    }
}