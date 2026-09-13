<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectUser;
use App\Models\User;

class QuickActionController extends Controller
{
    public function index($projectId)
    {
        // return ONLY site managers of this project
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