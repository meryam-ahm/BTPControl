<?php

 
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectUser;
use App\Models\User;

class ProjectUserController extends Controller
{
    public function siteManagers($projectId)
    {
        $managers = ProjectUser::where('project_users.project_id', $projectId)
            ->where('project_users.role_on_proj', 'chef_chantier')
            ->join('users', 'users.id', '=', 'project_users.user_id')
            ->select(
                'users.id',
                'users.name'
            )
            ->get();

        return response()->json($managers);
    }
}