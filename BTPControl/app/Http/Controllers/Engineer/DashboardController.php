<?php

namespace App\Http\Controllers\Engineer;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            [
                'title' => 'Total Projects',
                'value' => Project::count(),
            ],
            [
                'title' => 'Active',
                'value' => Project::where('status', 'active')->count(),
            ],
            [
                'title' => 'On Hold',
                'value' => Project::where('status', 'paused')->count(),
            ],
            [
                'title' => 'Delayed',
                'value' => Project::whereNotIn('status', ['completed', 'cancelled'])
                    ->whereNotNull('end_date')
                    ->whereDate('end_date', '<', Carbon::today())
                    ->count(),
            ],
            [
                'title' => 'Completed',
                'value' => Project::where('status', 'completed')->count(),
            ],
            [
                'title' => 'Total Budget',
                'value' => Project::sum('budget'),
            ],
        ]);
    }

    public function table(Request $request): JsonResponse
    {
        $projects = Project::with([
            'users' => function ($query) {
                $query->wherePivot('role_on_proj', 'chef_chantier');
            }
        ])
        ->latest()
        ->paginate($request->integer('per_page', 15));

        $data = $projects->getCollection()->map(function ($project) {
            $chef = $project->users->first();

            return [
                'id' => $project->id,
                'name' => $project->name,
                'type' => $project->type ?? 'Construction',
                'chef' => $chef?->name,
                'chef_id' => $chef?->id,
                'start_date' => $project->start_date,
                'end_date' => $project->end_date,
                'progress' => 0,
                'status' => $project->status,
                'budget' => $project->budget,
                'issues' => 0,
                'location' => $project->location,
            ];
        });

        return response()->json([
            'data' => $data,
            'current_page' => $projects->currentPage(),
            'last_page' => $projects->lastPage(),
            'per_page' => $projects->perPage(),
            'total' => $projects->total(),
        ]);
    }

    public function filterProjects(Request $request): JsonResponse
    {
        $query = Project::with([
            'users' => function ($query) {
                $query->wherePivot('role_on_proj', 'chef_chantier');
            }
        ]);

        if ($request->filled('name')) {
            $query->where('name', 'like', $request->name . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        if ($request->filled('type')) {
            $query->where('type', 'like', '%' . $request->type . '%');
        }

        if ($request->filled('start_date')) {
            $query->whereDate('start_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('end_date', '<=', $request->end_date);
        }

        if ($request->filled('chef_id')) {
            $query->whereHas('users', function ($q) use ($request) {
                $q->where('users.id', $request->chef_id)
                    ->where('role_on_proj', 'chef_chantier');
            });
        }

        return response()->json([
            'data' => $query->latest()->get(),
        ]);
    }

    public function searchProject(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        return response()->json([
            'data' => Project::where(
                'name',
                'like',
                $request->name . '%'
            )->get(),
        ]);
    }

    public function filtersData(): JsonResponse
    {
        $types = Project::whereNotNull('type')
            ->pluck('type')
            ->map(fn ($type) => trim($type))
            ->unique()
            ->values();

        $chefs = User::whereHas('projects', function ($query) {
            $query->where('role_on_proj', 'chef_chantier');
        })
        ->select('id', 'name')
        ->orderBy('name')
        ->get();

        return response()->json([
            'types' => $types,
            'chefs' => $chefs,
            'statuses' => [
                'planned',
                'active',
                'paused',
                'completed',
                'cancelled',
            ],
        ]);
    }

    public function clients(): JsonResponse
    {
        return response()->json(
            Client::latest()->get()
        );
    }

    public function siteManagers($projectId): JsonResponse
    {
        $managers = ProjectUser::with('user')
            ->where('project_id', $projectId)
            ->where('role_on_proj', 'chef_chantier')
            ->get()
            ->map(fn ($item) => [
                'id' => $item->user->id,
                'name' => $item->user->name,
            ]);

        return response()->json($managers);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
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

    public function destroy(Project $project): JsonResponse
    {
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