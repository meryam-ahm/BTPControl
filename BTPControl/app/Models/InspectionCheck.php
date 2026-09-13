<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionCheck extends Model
{
    protected $fillable = [
        'inspection_id',
        'check_name',
        'required_value',
        'actual_value',
        'unit',
        'status',
        'severity',
        'comment'
    ];

 public function inspection()
{
    return $this->belongsTo(Inspection::class);
}

    public function nonConformity()
    {
        return $this->hasOne(NonConformity::class);
    }

}