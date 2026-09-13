<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'project_id',
        'task_id',
        'uploaded_by',
        'type',
        'url',
        'related_type',
        'related_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function inspection()
    {
        return $this->belongsTo(Inspection::class, 'related_id')
            ->where('related_type', 'inspection');
    }
}