<?php

namespace App\Http\Controllers;
 use Illuminate\Http\JsonResponse;

use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EngineerDashboardController extends Controller
{
    
    public function filterProjects(Request $request)
    {
        $query = Project::with(['users' => function ($q) {
            $q->wherePivot('role_on_proj', 'chef_chantier');
        }]);

        if ($request->filled('name')) {
            $query->where('name', 'LIKE', $request->name . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        if ($request->filled('type')) {
            $query->where('type', 'LIKE', '%' . $request->type . '%');
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('start_date', [
                $request->start_date,
                $request->end_date
            ]);
        }

        if ($request->filled('chef_id')) {
            $query->whereHas('users', function ($q) use ($request) {
                $q->where('users.id', $request->chef_id)
                  ->where('role_on_proj', 'chef_chantier');
            });
        }

        return response()->json([
            'data' => $query->get()
        ]);
    }

    public function searchProject(Request $request)
    {
        return response()->json([
            'data' => Project::where('name', 'LIKE', $request->name . '%')->get()
        ]);
    }

    public function filtersData()
    {
        $types = Project::whereNotNull('type')->pluck('type')
            ->map(fn ($t) => trim($t))
            ->unique()
            ->values();

        $chefs = User::whereHas('projects', function ($q) {
                $q->where('role_on_proj', 'chef_chantier');
            })
            ->select('id', 'name')
            ->get();

            
        $statuses = [
            'planned',
            'active',
            'paused',
            'completed',
            'cancelled'
        ];

        return response()->json([
            'types' => $types,
            'chefs' => $chefs,
            'statuses' => $statuses,
        ]);
    }

public function destroy(Project $project): JsonResponse
{
    try {
        $project->users()->detach();

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete project.',
            'error' => $e->getMessage()
        ], 500);
    }
}
 

public function update(Request $request, Project $project)
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

    public function stats()
    {
        return response()->json([
            ["title" => "Total Projects", "value" => Project::count()],
            ["title" => "Active", "value" => Project::where('status', 'active')->count()],
            ["title" => "On Hold", "value" => Project::where('status', 'paused')->count()],
            ["title" => "Delayed", "value" => Project::where('end_date', '<', Carbon::today())->count()],
            ["title" => "Completed", "value" => Project::where('status', 'completed')->count()],
            ["title" => "Total Budget", "value" => Project::sum('budget')],
        ]);
    }
 
public function table(Request $request)
{
    // Pass 15 directly into the paginate method
    $projects = Project::with([
        'users' => function ($q) {
            $q->wherePivot('role_on_proj', 'chef_chantier');
        }
    ])->latest()->paginate(15); // Changed from 5 to 15

    return response()->json([
        'data' => $projects->map(function ($project) {
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
        }),

        'current_page' => $projects->currentPage(),
        'last_page' => $projects->lastPage(),
        'per_page' => $projects->perPage(),
        'total' => $projects->total(),
    ]);
}


    public function clients()
    {
        return Client::latest()->get();
    }
public function siteManagers($projectId)
{
    $managers = ProjectUser::with('user')
        ->where('project_id', $projectId)
        ->where('role_on_proj', 'chef_chantier')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->user->id,
                'name' => $item->user->name,
            ];
        });

    return response()->json($managers);
}
}