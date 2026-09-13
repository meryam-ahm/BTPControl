<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportItem extends Model
{
protected $fillable = [
    'report_id',
    'label',
    'type',
    'value'
];}
