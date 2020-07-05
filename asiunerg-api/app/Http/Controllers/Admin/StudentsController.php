<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Imports\StudentsImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use App\Notifications\StudentCreated;
use App\Http\Resources\StudentMatterInscription;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        /* Obtenemos los usuarios pertenecientes al role Student */
        $users = Student::orderBy('created_at','desc')->paginate(5);

        /* Verificamos si la consulta es axios */
        if ($request->ajax()) {
            return response()->json($users, 200);
        }
        return view('users.students');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /* Validar los datos recibidos */
        $request->validate([
            'identity' => ['required', 'max:9', 'unique:users', 'unique:students'],
            'name'     => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users', 'unique:students'],
        ]);

        /* Registrar estudiante */
        $student = Student::create([
            'identity' => $request->input('identity'),
            'name'     => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email'    => $request->input('email'),
        ]);

        $student->notify(new StudentCreated());

        return response()->json([
            'message' => __('Estudiante registrado exitosamente.'),
            'data'    => $student,
        ], 201);
    }

    /**
     * Store a group newlies created resource in storeage
     * 
     * @param \Iluminate\Http\Request $request
     * @return \Iluminate\Http\Response
     */
    public function storeExcel(Request $request)
    {
        $request->validate([
            'excel_student' => ['required']
        ]);

        /* Importando el archivo excel para el tratamiento con el paquete Laravel-Excel */
        Excel::import(new StudentsImport, $request->file('excel_student'));

        return response()->json([
            'message' => __('Archivo cargado y datos registrados exitosamente.'),
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $estudiante)
    {
        return response()->json($estudiante, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $estudiante)
    {
        /* Validar los datos recibidos */
        $request->validate([
            'identity' => ['required', 'max:9'],
            'name'     => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255'],
        ]);
        
        $user = User::where('identity',$estudiante->identity)->first();
        if(!empty($user))
        {
            /* Verificar si existe el correo en otro usuario */
            $existEmail = User::where('email',$request->input('email'))->where('id','!=',$user->id)->exists();
            if(!$existEmail)
            {
                /* Actualizar datos en la DB */
                $user->name  = ($request->input('name') && $request->input('lastname')) ? "$request->name $request->lastname" : $user->name;
                $user->email = ($request->input('email')) ? $request->input('email') : $user->email;

                $user->save();
            }
            else
            {
                return response()->json([
                    'message' => __('El correo ya existe.'),
                ], 422);
            }
        }

        /* Verificar si existe el correo en otro estudiante */
        $existStudentEmail = Student::where('email',$request->input('email'))->where('id','!=',$estudiante->id)->exists();
        if(!$existStudentEmail)
        {
            /* Acutalizar datos en la DB */
            $estudiante->name = ($request->input('name')) ? $request->input('name') : $estudiante->name;
            $estudiante->lastname = ($request->input('lastname')) ? $request->input('lastname') : $estudiante->lastname;
            $estudiante->email = ($request->input('email')) ? $request->input('email') : $estudiante->email;
    
            $estudiante->save();
        }
        else
        {
            return response()->json([
                'message' => __('El correo ya existe.'),
            ], 422);
        }


        return response()->json([
            'message' => __('Estudiante actualizado existosamente.'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $estudiante)
    {
        /* Verificamos si existe un usuario con esa cédula*/
        $user = User::where('identity',$estudiante->identity)->first();
        if(!empty($user)) {
            $user->delete();
        }

        $estudiante->delete();

        return response()->json([
            'message' => __('Estudiante eliminado exitosamente.')
        ], 200);
    }

    public function getMatterInscription(Student $estudiante)
    {
        $studentMatter = $estudiante->inscriptions->load('section.matter');
        return StudentMatterInscription::make($studentMatter, 200);
    }
}
