<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NonConformity extends Model
{
    protected $fillable = [
        'project_id',
        'inspection_check_id',
        'reported_by',
        'assigned_to',
        'title',
        'description',
        'severity',
        'status',
        'due_date',
        'closed_at',
    ];

    public function inspectionCheck()
    {
        return $this->belongsTo(InspectionCheck::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}