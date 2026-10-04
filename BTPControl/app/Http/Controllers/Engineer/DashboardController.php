<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Dashboard statistics.
     */
    public function stats(): JsonResponse
    {
        return response()->json([
            [
                'title' => 'Total Projects',
                'value' => Project::count(),
            ],

            [
                'title' => 'Active',
                'value' => Project::where(
                    'status',
                    'active'
                )->count(),
            ],

            [
                'title' => 'On Hold',
                'value' => Project::where(
                    'status',
                    'paused'
                )->count(),
            ],

            [
                'title' => 'Delayed',
                'value' => Project::whereNotIn(
                    'status',
                    ['completed', 'cancelled']
                )
                ->whereNotNull('end_date')
                ->whereDate(
                    'end_date',
                    '<',
                    Carbon::today()
                )
                ->count(),
            ],

            [
                'title' => 'Completed',
                'value' => Project::where(
                    'status',
                    'completed'
                )->count(),
            ],

            [
                'title' => 'Total Budget',
                'value' => Project::sum('budget'),
            ],
        ]);
    }

    /**
     * Get projects with pagination.
     *
     * This endpoint is used by the main projects table.
     */
  public function table(Request $request): JsonResponse
{
    $query = Project::with([
        'users' => function ($query) {
            $query->wherePivot(
                'role_on_proj',
                'site_manager'
            );
        }
    ]);

    // Search
    if ($request->filled('search')) {
        $query->where(
            'projects.name',
            'like',
            '%' . $request->search . '%'
        );
    }

    // Status
    if ($request->filled('status')) {
        $query->where(
            'projects.status',
            $request->status
        );
    }

    // Client
    if ($request->filled('client_id')) {
        $query->where(
            'projects.client_id',
            $request->client_id
        );
    }

    // Project type
    if ($request->filled('type')) {
        $query->where(
            'projects.type',
            'like',
            '%' . $request->type . '%'
        );
    }

    // Start date
    if ($request->filled('start_date')) {
        $query->whereDate(
            'projects.start_date',
            '>=',
            $request->start_date
        );
    }

    // End date
    if ($request->filled('end_date')) {
        $query->whereDate(
            'projects.end_date',
            '<=',
            $request->end_date
        );
    }

    // Site Manager
    if ($request->filled('chef_id')) {
        $query->whereHas(
            'users',
            function ($q) use ($request) {
                $q->where(
                    'users.id',
                    $request->chef_id
                )->wherePivot(
                    'role_on_proj',
                    'site_manager'
                );
            }
        );
    }

    // Pagination
    $projects = $query
        ->latest()
        ->paginate(
            $request->integer('per_page', 10)
        );

    $projects->getCollection()->transform(
        function ($project) {
            $manager = $project->users->first();

            return [
                'id' => $project->id,
                'name' => $project->name,
                'type' => $project->type
                    ? trim($project->type)
                    : 'Construction',
                'client_id' => $project->client_id,
                'chef' => $manager?->name,
                'chef_id' => $manager?->id,
                'start_date' => $project->start_date,
                'end_date' => $project->end_date,
                'progress' => 0,
                'status' => $project->status,
                'budget' => $project->budget,
                'issues' => 0,
                'location' => $project->location,
            ];
        }
    );

    return response()->json([
        'data' => $projects->items(),
        'current_page' => $projects->currentPage(),
        'last_page' => $projects->lastPage(),
        'per_page' => $projects->perPage(),
        'total' => $projects->total(),
    ]);
}

    
    /**
     * Search projects by name.
     */
    public function searchProject(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $projects = Project::where(
            'name',
            'like',
            $request->name . '%'
        )
        ->latest()
        ->get();

        return response()->json([
            'data' => $projects,
        ]);
    }

    /**
     * Get available filter data.
     */
    public function filtersData(): JsonResponse
    {
        $types = Project::whereNotNull('type')
            ->pluck('type')
            ->map(function ($type) {
                return trim($type);
            })
            ->unique()
            ->values();

        $siteManagers = User::whereHas(
            'projects',
            function ($query) {
                $query->where(
                    'role_on_proj',
                    'site_manager'
                );
            }
        )
        ->select(
            'id',
            'name'
        )
        ->orderBy('name')
        ->get();

        return response()->json([
            'types' => $types,

            'chefs' => $siteManagers,

            'statuses' => [
                'planned',
                'active',
                'paused',
                'completed',
                'cancelled',
            ],
        ]);
    }

    /**
     * Get all clients.
     */
    public function clients(): JsonResponse
    {
        return response()->json(
            Client::latest()->get()
        );
    }

    /**
     * Get Site Managers assigned to a project.
     */
    public function siteManagers(
        $projectId
    ): JsonResponse {

        $managers = ProjectUser::with('user')
            ->where(
                'project_id',
                $projectId
            )
            ->where(
                'role_on_proj',
                'site_manager'
            )
            ->get()
            ->map(function ($item) {

                return [
                    'id' => $item->user->id,

                    'name' => $item->user->name,
                ];
            });

        return response()->json($managers);
    }

    /**
     * Update a project.
     */
    public function update(
        Request $request,
        Project $project
    ): JsonResponse {

        $validated = $request->validate([
            'name' => 'required|string|max:255',

            'type' => 'nullable|string|max:255',

            'location' => 'nullable|string|max:255',

            'start_date' => 'nullable|date',

            'end_date' => 'nullable|date|after_or_equal:start_date',

            'budget' => 'nullable|numeric|min:0',

            'status' => 'required|in:planned,active,paused,completed,cancelled',
        ]);

        $project->update($validated);

        return response()->json([
            'success' => true,

            'message' => 'Project updated successfully.',

            'project' => $project->fresh(),
        ]);
    }

    /**
     * Delete a project.
     */
    public function destroy(
        Project $project
    ): JsonResponse {

        try {

            $project->users()->detach();

            $project->delete();

            return response()->json([
                'success' => true,

                'message' => 'Project deleted successfully.',
            ]);

        } catch (\Throwable $e) {

            report($e);

            return response()->json([
                'success' => false,

                'message' => 'Failed to delete project.',
            ], 500);
        }
    }
}