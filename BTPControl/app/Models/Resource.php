<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
protected $fillable = [
    'project_id',
    'name',
    'type',
    'quantity',
    'unit',
    'status',
    'supplier',
];
}