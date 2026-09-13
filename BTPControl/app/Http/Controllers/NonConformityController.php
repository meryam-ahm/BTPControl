<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NonConformity;

class NonConformityController extends Controller
{
    public function index($projectId)
    {
        return NonConformity::where('project_id', $projectId)
            ->latest()
            ->get();
    }

    public function show($id)
    {
        return NonConformity::findOrFail($id);
    }

    public function store(Request $request)
    {
        $nc = NonConformity::create([
            'project_id' => $request->project_id,
            'inspection_check_id' => $request->inspection_check_id,
            'reported_by' => 1,
            'assigned_to' => $request->assigned_to,
            'title' => $request->title,
            'description' => $request->description,
            'severity' => $request->severity,
            'status' => 'open',
            'due_date' => $request->due_date,
        ]);

        return response()->json($nc);
    }
}
