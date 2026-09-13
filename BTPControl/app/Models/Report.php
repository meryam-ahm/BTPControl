<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
protected $fillable = [
    'project_id',
    'created_by',
    'type',
    'report_date',
    'summary'
];}
