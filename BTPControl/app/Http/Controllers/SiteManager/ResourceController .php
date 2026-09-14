<?php

namespace App\Http\Controllers\SiteManager;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    private const UNITS = [
        'unit',
        'piece',
        'kg',
        'tonne',
        'litre',
        'm3',
        'm2',
        'm',
        'mm',
        'bag',
        'box',
        'pallet',
        'roll',
        'sheet',
        'bar',
        'bundle',
        'load',
        'hour',
        'day',
    ];

    public function index($projectId): JsonResponse
    {
        return response()->json([
            'resources' => Resource::where(
                'project_id',
                $projectId
            )
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'type',
                'quantity',
                'unit',
                'status',
                'supplier',
            ]),
        ]);
    }

    public function store(Request $request, $projectId): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:material,equipment,tool,vehicle',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|in:' . implode(',', self::UNITS),
            'status' => 'required|in:available,in_use,damaged,out_of_stock',
            'supplier' => 'nullable|string|max:255',
        ]);

        $resource = Resource::create([
            'project_id' => $projectId,
            'name' => $validated['name'],
            'type' => $validated['type'],
            'quantity' => $validated['quantity'],
            'unit' => $validated['unit'],
            'status' => $validated['status'],
            'supplier' => $validated['supplier'] ?? null,
        ]);

        return response()->json([
            'message' => 'Resource added successfully.',
            'resource' => $resource,
        ], 201);
    }
}