<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InspectionCheck;

class InspectionCheckController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'inspection_id' => 'required|exists:inspections,id',
            'check_name' => 'required|string',
            'required_value' => 'nullable|string',
            'actual_value' => 'nullable|string',
            'unit' => 'nullable|string',
            'status' => 'required|in:pending,ok,fail',
            'severity' => 'nullable|in:low,medium,high',
            'comment' => 'nullable|string',
        ]);

        $check = InspectionCheck::create([
            'inspection_id' => $request->inspection_id,
            'check_name' => $request->check_name,
            'required_value' => $request->required_value,
            'actual_value' => $request->actual_value,
            'unit' => $request->unit,
            'status' => $request->status,
            'severity' => $request->severity,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Checklist created successfully.',
            'data' => $check
        ], 201);
    }
}