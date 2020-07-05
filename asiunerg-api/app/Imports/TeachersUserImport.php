<?php

namespace App\Imports;

use App\User;
use App\Pedoxa\Teacher;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Notifications\UserCreated;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TeachersUserImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
    	/* Validacion de todas las filas del excel */
    	Validator::make($rows->toArray(), [
            '*.cedula' 	 => ['required', 'max:9','exists:pedoxa.docentes,cedula','unique:users,identity'],
            '*.username' => ['required', 'string', 'max:255'],
            '*.nombres'  => ['required', 'string', 'max:255'],
            '*.correo'   => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
         ])->validate();
		
		/* recorrer cada fila del excel */
        foreach ($rows as $row) {
        	/* Generar una contraseña de una palabra random */
        	$password = Str::random(15);
        	/* Buscar los datos de la cedula en la DB del Pedoxa */
        	$teacher = Teacher::where('cedula',$row['cedula'])->first();
        	/* Registrar usuario usuario */
        	$user = User::create([
        		'identity' => $teacher->cedula,
        		'name'     => "$teacher->nombres $teacher->apellidos",
        		'username' => $row['username'],
        		'email'    => ($teacher->correo) ? $teacher->correo : $row['correo'],
        		'password' => Hash::make($password),
        	]);
        	$user->assignRole('Teacher');
            /* Enviar correo para informar de la contraseña del usuario */
            $user->notify(new UserCreated($password));
        }
    }
}
