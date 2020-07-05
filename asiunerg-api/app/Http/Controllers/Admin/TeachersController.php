<?php

namespace App\Http\Controllers\Admin;

use App\User;
use App\Pedoxa\Teacher;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Notifications\UserCreated;
use App\Imports\TeachersUserImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\TeacherMatterAssign;

class TeachersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        /* Obtenemos los usuarios pertenecientes al role Teacher */
        $users = User::role('Teacher')->orderBy('created_at','desc')->paginate(5);
        
        /* Verificamos si la consulta es axios */
        if ($request->ajax()) {
            return response()->json($users, 200);
        }
        return view('users.teachers');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'identity' => ['required', 'max:9','exists:pedoxa.docentes,cedula'],
            'username' => ['required', 'string', 'max:255'],
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
        ]);

        $password = Str::random(15);

        $user = User::create([
            'identity' => $request->identity,
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
        ]);

        $user->assignRole('Teacher');
        
        $user->notify(new UserCreated($password));

        return response()->json([
            'message' => __('Usuario registrado exitosamente.'),
            'data' => $user,
        ], 201);
    }

    /**
     * Store a group newly created resource in storeage
     * 
     * @param \Iluminate\Http\Request $request
     * @return \Iluminate\Http\Response
     */
    public function storeExcel(Request $request)
    {
        $request->validate([
            'excel_teacher' => ['required']
        ]);

        /* Importando el archivo excel para el tratamiento con el paquete Laravel-Excel */
        Excel::import(new TeachersUserImport, $request->file('excel_teacher'));

        return response()->json([
            'message' => __('Archivo cargado y datos registrados exitosamente.'),
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $teacher = Teacher::where('cedula',$id)->first();

        if(empty($teacher)){
            return response()->json([
                'status' => 422,
                'message' => __('Esta cédula no existe.')
            ]);
        }

        $exist = $teacher->user()->exists();

        if ($exist) {
            return response()->json([
                'status' => 422,
                'message' => __('Esta cédula ya está asociada a un usuario.')
            ]);
        }

        return response()->json($teacher, 200);
    }

    public function getMatterAssign(User $profesore)
    {
        /* cargamos todos las secciones-materias pertenecientes a ese profesor */
        $matterAssign = $profesore->load('teacher.sections.matter');
        return TeacherMatterAssign::make($matterAssign);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $profesore)
    {
        return response()->json($profesore, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $profesore)
    {
        $request->validate([
            'identity' => ['required', 'max:9'],
            'username' => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255'],
        ]);
        
        $existEmail = User::where('email',$request->email)->where('id','!=',$profesore->id)->exists();
        $existPedoxaEmail = Teacher::where('email',$request->email)->where('cedula','!=',$request->identity)->exists();
        
        if($existEmail || $existPedoxaEmail)
        {
            return response()->json([
                'message' => __('El correo ya existe.'),
            ], 422);
        }

        $profesore->username = ($request->username) ? $request->username : $profesore->name;
        $profesore->email = ($request->email) ? $request->email : $profesore->name;

        $profesore->save();

        return response()->json([
            'message' => __('Usuario actualizado exitosamente.'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $profesore)
    {
        $profesore->delete();
        return response()->json([
            'message' => __('Profesor eliminado exitosamente.')
        ],200);
    }

}
