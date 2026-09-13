<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
protected $fillable = [
    'project_id',
    'user_id',
    'entity_type',
    'entity_id',
    'action_type',
    'message'
];}
