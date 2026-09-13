<?php

namespace App\Models;

use App\Models\Media;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
protected $fillable = [
    'project_id',
    'title',
    'description',
    'assigned_to',
    'parent_task_id',
    'status',
    'priority',
    'progress',
    'estimated_hours',
    'begin_date',
    'due_date'
];
public function assignedUser()
{
    return $this->belongsTo(User::class, 'assigned_to');
}
public function media()
{
    return $this->hasMany(Media::class, 'task_id');
}

public function project()
{
    return $this->belongsTo(Project::class);
}
public function unssigned_to(){
    return $this->belongsTo( Task::class ,'parent_id');
}
public function parent(){
    return $this->belongsTo(Task::class,'parent_id');
}
}
  