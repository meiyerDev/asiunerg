<?php

namespace App\Http\Controllers\AuthMovil;

use App\{User};
use App\Models\{Student};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
    	$request->validate([
            'identity'  => ['required','numeric','unique:users','exists:mysql.students,identity'],
    		'email'		=> ['required','email','unique:users'],
    		'password'  => ['required','min:8','confirmed']
    	]);

    	/* Obtenemos los datos guardados del estudiante */
		$student = Student::where('identity', $request->input('identity'))->first();
		
		if(! empty($student))
		{
	    	$newUser = User::create([
	    		'identity' => $student->identity,
	    		'name'     => "$student->name $student->lastname",
	    		'email'    => $request->email,
	    		'password' => Hash::make($request->password)
	    	]);
	
			/* Enlazamos el estudiante al usuario */
	    	$student->user_id = $newUser->id;

			/* Guardamos los datos */
	    	$student->save();

	    	/* Asignar role estudiante al usuario */
        	$newUser->assignRole('Student');
			

	    	return response()->json([
	    		'message' => __('Usuario registrado existosamente.')
	    	], 201);
		}

		return response()->json([
    		'message' => __('La cédula que intenta registrar fue deshabilitada.'),
    		'errors' => [
    			'identity' => [
    				__('Cédula inválida.')
    			]
    		]
    	], 422);
    }
}