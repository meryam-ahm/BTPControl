<?php

namespace App\Http\Controllers\SiteManager;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ProjectUser;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class WorkerController extends Controller
{
    public function CreateWorker(Request $request, $project) 
    { 
         $validated = $request->validate([ 
            'name' => 'required|string|max:255', 
            'email' => 'nullable|email|unique:users,email', 
            'phone' => 'nullable|string|max:30', 
        ]); 
 
        return DB::transaction(function () use ($validated, $project) { 
 
            // Create worker account 
            $worker = User::create([ 
                'name' => $validated['name'], 
                'email' => $validated['email'] ?? null, 
                'phone' => $validated['phone'] ?? null, 
 
                // Worker NEVER receives this password 
                'password' => Hash::make(Str::random(40)), 
 
                'role' => 'worker', 
                'type_user' => 'worker', 
            ]); 
 
            // Automatically assign worker to project 
            ProjectUser::create([ 
                'project_id' => $project, 
                'user_id' => $worker->id, 
                'role_on_proj' => 'worker', 
            ]); 
 
            return response()->json([ 
                'message' => 'Worker created and assigned successfully.', 
 
                'worker' => [ 
                    'id' => $worker->id, 
                    'name' => $worker->name, 
                    'email' => $worker->email, 
                    'phone' => $worker->phone, 
                ], 
            ], 201); 
        }); 
        } 
    public function store(Request $request, $projectId): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'phone' => 'nullable|string|max:30',
        ]);

        return DB::transaction(function () use ($validated, $projectId) {
            $worker = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'password' => Hash::make(Str::random(40)),
                'role' => 'worker',
                'type_user' => 'worker',
            ]);

            ProjectUser::create([
                'project_id' => $projectId,
                'user_id' => $worker->id,
                'role_on_proj' => 'worker',
            ]);

            return response()->json([
                'message' => 'Worker created and assigned successfully.',
                'worker' => $worker,
            ], 201);
        });
    }

    public function attendance($projectId, $workerId): JsonResponse
    {
        $exists = ProjectUser::where('project_id', $projectId)
            ->where('user_id', $workerId)
            ->where('role_on_proj', 'worker')
            ->exists();

        if (!$exists) {
            return response()->json([
                'message' => 'Worker is not assigned to this project.',
            ], 404);
        }

        $history = Attendance::where('project_id', $projectId)
            ->where('user_id', $workerId)
            ->latest('check_in')
            ->get()
            ->map(fn ($record) => [
                'id' => $record->id,
                'date' => $record->check_in?->format('Y-m-d'),
                'check_in' => $record->check_in?->format('H:i'),
                'status' => strtolower(
                    $record->status ?? 'absent'
                ),
            ]);

        return response()->json($history);
    }

    public function destroy($projectId, $workerId): JsonResponse
    {
        $deleted = ProjectUser::where('project_id', $projectId)
            ->where('user_id', $workerId)
            ->where('role_on_proj', 'worker')
            ->delete();

        if (!$deleted) {
            return response()->json([
                'message' => 'Worker not found in project.',
            ], 404);
        }

        return response()->json([
            'message' => 'Worker removed successfully.',
        ]);
    }
}