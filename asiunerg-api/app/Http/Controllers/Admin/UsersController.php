<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Notifications\UserCreated;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        /* Obtenemos los usuarios pertenecientes al rol Admin */
        $users = Admin::orderBy('created_at','desc')->paginate(5);
        
        /* Verificamos si es una petición axios */
        if($request->ajax()) {
	       return response()->json($users,200);
        }
        return view('users.index',compact('users'));
    }

    public function store(Request $request)
    {
    	$request->validate([
            'username'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:admins'],
        ]);
        
        /* Generar contraseña aleatoria */
        $password = Str::random(15);
        /* Se registra el nuevo usuario con una contraseña random */
    	$user = Admin::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
        ]);
        /* Asignamos a role administrador */
        // $user->assignRole('','Admin');

        /* Enviar Contraseña por correo */
        $user->notify(new UserCreated($password));

        return response()->json([
            'message' => __('Usuario registrado exitosamente.'),
            'data' => $user,
        ], 201);
    }

    public function edit(Admin $user)
    {
        return response()->json($user,200);
    }

    public function update(Request $request, Admin $user)
    {
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255'],
        ]);
        
        $existEmail = Admin::where('email',$request->input('email'))->where('id','!=',$user->id)->exists();
        
        if($existEmail){
            return response()->json([
                'message' => __('El correo ya existe.'),
            ], 422);
        }

        $user->name = ($request->has('name')) ? $request->name : $user->name;
        $user->username = ($request->has('username')) ? $request->username : $user->name;
        $user->email = ($request->has('email')) ? $request->email : $user->name;

        $user->save();

        return response()->json([
            'message' => __('Usuario actualizado exitosamente.'),
        ], 200);
    }

    public function destroy(Admin $user)
    {
        $user->delete();
        return response()->json([
            'message' => __('Usuario eliminado exitosamente.'),
        ], 200);
    }
}
