<?php

namespace App\Http\Controllers;

use App\Models\InspectionCheck;
use App\Models\NonConformity;
use App\Models\ProjectUser;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NonConformityController extends Controller
{
    public function index($projectId): JsonResponse
    {
        return response()->json(
            NonConformity::where('project_id', $projectId)
                ->latest()
                ->get()
        );
    }
    public function siteManagers($projectId): JsonResponse
{
    $managers = ProjectUser::where('project_id', $projectId)
        ->where('role_on_proj', 'site_manager')
        ->with('user:id,name')
        ->get()
        ->filter(fn ($projectUser) => $projectUser->user !== null)
        ->unique('user_id')
        ->map(function ($projectUser) {
            return [
                'id' => $projectUser->user->id,
                'name' => $projectUser->user->name,
            ];
        })
        ->values();

    return response()->json($managers);
}

    public function show($id): JsonResponse
    {
        return response()->json(
            NonConformity::findOrFail($id)
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'inspection_check_id' =>
                'required|exists:inspection_checks,id',
            'assigned_to' => 'nullable|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'severity' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        $check = InspectionCheck::with('inspection')
            ->findOrFail(
                $validated['inspection_check_id']
            );

        if (
            !$check->inspection ||
            $check->inspection->project_id != $validated['project_id']
        ) {
            return response()->json([
                'message' =>
                    'Inspection check does not belong to this project.',
            ], 422);
        }

        $nc = NonConformity::create([
            'project_id' => $validated['project_id'],
            'inspection_check_id' =>
                $validated['inspection_check_id'],
            'reported_by' => 54,
            'assigned_to' =>
                $validated['assigned_to'] ?? null,
            'title' => $validated['title'],
            'description' =>
                $validated['description'] ?? null,
            'severity' => $validated['severity'],
            'status' => 'open',
            'due_date' =>
                $validated['due_date'] ?? null,
        ]);

        return response()->json([
            'message' =>
                'Non-conformity created successfully.',
            'data' => $nc,
        ], 201);
    }
}