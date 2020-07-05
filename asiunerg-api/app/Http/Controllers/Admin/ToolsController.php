<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Tools\Department as ToolsDepartment;
use App\Pedoxa\Department;
use Illuminate\Http\Request;

class ToolsController extends Controller
{
    public function getDepartments()
    {
        $departments = Department::all();

        return ToolsDepartment::collection($departments);
    }
}
