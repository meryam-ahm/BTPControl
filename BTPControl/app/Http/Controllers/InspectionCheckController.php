<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\InspectionCheck;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InspectionCheckController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'inspection_id' => 'required|exists:inspections,id',
            'check_name' => 'required|string|max:255',
            'required_value' => 'nullable|string',
            'actual_value' => 'nullable|string',
            'unit' => 'nullable|string',
            'status' => 'required|in:pending,ok,fail',
            'severity' => 'nullable|in:low,medium,high',
            'comment' => 'nullable|string',
        ]);

        $inspection = Inspection::findOrFail(
            $validated['inspection_id']
        );

        $check = InspectionCheck::create([
            'inspection_id' => $inspection->id,
            'check_name' => $validated['check_name'],
            'required_value' =>
                $validated['required_value'] ?? null,
            'actual_value' =>
                $validated['actual_value'] ?? null,
            'unit' => $validated['unit'] ?? null,
            'status' => $validated['status'],
            'severity' =>
                $validated['severity'] ?? null,
            'comment' =>
                $validated['comment'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Checklist created successfully.',
            'data' => $check,
        ], 201);
    }
}