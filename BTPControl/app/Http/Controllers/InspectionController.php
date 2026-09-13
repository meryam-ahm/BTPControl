<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\InspectionCheck;
use App\Models\NonConformity;
use App\Models\Media;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    // LIST INSPECTIONS
    public function index($projectId)
    {
        return Inspection::where('project_id', $projectId)
            ->latest()
            ->get();
    }

    // CREATE INSPECTION
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string',
            'type' => 'required|in:quality,safety',
            'inspection_date' => 'required|date',
            'inspected_by' => 'required|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $inspection = Inspection::create([
            'project_id' => $request->project_id,
            'task_id' => null,
            'inspected_by' => $request->inspected_by,
            'type' => $request->type,
            'title' => $request->title,
            'inspection_date' => $request->inspection_date,
            'status' => 'draft',
            'notes' => $request->notes,
        ]);

        return response()->json($inspection, 201);
    }

    // SINGLE INSPECTION
    public function show($id)
    {
        $inspection = Inspection::with('checks')->findOrFail($id);

        $photos = Media::where('related_type', 'inspection')
            ->where('related_id', $inspection->id)
            ->where('type', 'photo')
            ->get();

        return response()->json([
            'id' => $inspection->id,
            'project_id' => $inspection->project_id,
            'title' => $inspection->title,
            'date' => $inspection->inspection_date,
            'status' => $inspection->status,
            'checks' => $inspection->checks,
            'photos' => $photos,
        ]);
    }

    // NON CONFORMITIES
    public function nonConformities($projectId)
    {
        return NonConformity::where('project_id', $projectId)
            ->latest()
            ->get();
    }
}