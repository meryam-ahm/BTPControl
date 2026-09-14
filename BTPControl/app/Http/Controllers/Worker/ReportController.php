<?php

namespace App\Http\Controllers\Worker;

use App\Http\Controllers\Controller;
use App\Models\Inspection;
use App\Models\InspectionCheck;
use App\Models\ProjectUser;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function store(
        Request $request,
        $projectId
    ): JsonResponse {
        $validated = $request->validate([
            'task_id' => 'nullable|exists:tasks,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:quality,safety',
            'inspection_date' => 'required|date',
            'notes' => 'nullable|string',
            'checks' => 'required|array|min:1',

            'checks.*.check_name' =>
                'required|string|max:255',

            'checks.*.required_value' =>
                'nullable|string|max:255',

            'checks.*.actual_value' =>
                'nullable|string|max:255',

            'checks.*.unit' =>
                'nullable|string|max:50',

            'checks.*.status' =>
                'required|in:pending,ok,fail',

            'checks.*.severity' =>
                'nullable|in:low,medium,high',

            'checks.*.comment' =>
                'nullable|string',
        ]);

        $workerId = $request->user()->id;

        $assigned = ProjectUser::where(
            'project_id',
            $projectId
        )
            ->where(
                'user_id',
                $workerId
            )
            ->where(
                'role_on_proj',
                'worker'
            )
            ->exists();

        if (!$assigned) {
            return response()->json([
                'message' => 'Worker is not assigned to this project.',
            ], 403);
        }

        if (!empty($validated['task_id'])) {
            $validTask = Task::where(
                'id',
                $validated['task_id']
            )
                ->where(
                    'project_id',
                    $projectId
                )
                ->where(
                    'assigned_to',
                    $workerId
                )
                ->exists();

            if (!$validTask) {
                return response()->json([
                    'message' => 'Selected task does not belong to this worker.',
                ], 422);
            }
        }

        $inspection = DB::transaction(
            function () use (
                $validated,
                $projectId,
                $workerId
            ) {
                $inspection = Inspection::create([
                    'project_id' => $projectId,
                    'task_id' => $validated['task_id'] ?? null,
                    'inspected_by' => $workerId,
                    'type' => $validated['type'],
                    'title' => $validated['title'],
                    'inspection_date' => $validated['inspection_date'],
                    'status' => 'draft',
                    'notes' => $validated['notes'] ?? null,
                ]);

                foreach ($validated['checks'] as $check) {
                    InspectionCheck::create([
                        'inspection_id' => $inspection->id,

                        'check_name' =>
                            $check['check_name'],

                        'required_value' =>
                            $check['required_value'] ?? null,

                        'actual_value' =>
                            $check['actual_value'] ?? null,

                        'unit' =>
                            $check['unit'] ?? null,

                        'status' =>
                            $check['status'],

                        'severity' =>
                            $check['severity'] ?? null,

                        'comment' =>
                            $check['comment'] ?? null,
                    ]);
                }

                return $inspection->load('checks');
            }
        );

        return response()->json([
            'success' => true,
            'message' => 'Report submitted successfully.',
            'inspection' => $inspection,
        ], 201);
    }
}