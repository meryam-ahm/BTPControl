<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','client_id','location','budget','status','created_by'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_users')
            ->withPivot('role_on_proj')
            ->withTimestamps();
    }
}