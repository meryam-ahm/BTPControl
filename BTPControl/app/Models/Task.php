<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'project_id',
        'assigned_to',
        'parent_task_id',
        'title',
        'description',
        'priority',
        'status',
        'progress',
        'estimated_hours',
        'begin_date',
        'due_date',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
    public function parent()
{
    return $this->belongsTo(Task::class, 'parent_task_id');
}

public function children()
{
    return $this->hasMany(Task::class, 'parent_task_id');
}

    public function media()
    {
        return $this->hasMany(Media::class, 'task_id');
    }

    public function updates()
    {
        return $this->hasMany(TaskUpdate::class);
    }
}