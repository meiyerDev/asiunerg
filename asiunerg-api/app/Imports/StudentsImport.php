<?php

namespace App\Imports;

use App\Models\Student;
use Illuminate\Support\Collection;
use App\Notifications\StudentCreated;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;

class StudentsImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
    	/* Validacion de todas las filas del excel */
    	Validator::make($rows->toArray(), [
            '*.0' => ['required', 'unique:users,identity', 'unique:students,identity'],
            '*.1' => ['required', 'string', 'max:255'],
            '*.2' => ['required', 'string', 'max:255'],
            '*.3' => ['required', 'string', 'email', 'max:255', 'unique:users,email', 'unique:students,email'],
        ])->validate();
		
		/* recorrer cada fila del excel */
        foreach ($rows as $row) {
        	/* Registrar nuevo estudiante */
        	$student = Student::create([
		        'identity' => $row[0],
		        'lastname' => $row[1],
		        'name'     => $row[2],
		        'email'    => $row[3],
        	]);

        	/* Enviar correo de invitandolo a utilizar el sistema */
            $student->notify(new StudentCreated());
        }
    }
}
