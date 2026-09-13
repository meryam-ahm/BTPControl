<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    protected $fillable = [
        'project_id',
        'task_id',
        'inspected_by',
        'type',
        'title',
        'inspection_date',
        'status',
        'notes'
    ];

    public function checks()
    {
        return $this->hasMany(InspectionCheck::class);
    }
    
}