<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\Media;
use App\Models\NonConformity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InspectionController extends Controller
{
    public function index($projectId): JsonResponse
    {
        return response()->json(
            Inspection::where('project_id', $projectId)
                ->latest()
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:quality,safety',
            'inspection_date' => 'required|date',
            'inspected_by' => 'required|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $inspection = Inspection::create([
            ...$validated,
            'task_id' => null,
            'status' => 'draft',
        ]);

        return response()->json(
            $inspection,
            201
        );
    }

    public function show($id): JsonResponse
    {
        $inspection = Inspection::with('checks')
            ->findOrFail($id);

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

    public function nonConformities($projectId): JsonResponse
    {
        return response()->json(
            NonConformity::where(
                'project_id',
                $projectId
            )
            ->latest()
            ->get()
        );
    }
}