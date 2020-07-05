<?php

namespace App\Http\Controllers\AuthMovil;

use App\User;
use App\Pedoxa\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\{ValidationException};
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    public function login(Request $request)
    {
    	$request->validate([
            'identity'  => ['required','numeric'],
    		'email'     => ['required'],
    		'password'  => ['required']
    	]);

        /*-- Validar existencia de la cédula (ASIUNERG) --*/
        $identityExist = Validator::make(['identity'=>$request->identity],[
            'identity' => 'exists:mysql.users,identity',
        ]);

        /*-- inciar sesión o fallar por credenciales si existe --*/
        if(! $identityExist->fails())
        {
        	if(Auth::attempt($request->only('email','password','identity'),$request->filled('remember')))
            {
        		return response()->json([
                    'user' => Auth::user(),
                    'role' => Auth::user()->getRoleNames(),
                    'token' => encrypt(Auth::id()),
                ], 200);
        	}
        	throw ValidationException::withMessages([
        		'email' => ['Las credenciales no coinciden.']
        	]);
        }

        throw ValidationException::withMessages([
            'identity' => ['La cédula no pertenece a ningun usuario.']
        ]);
    }

    public function logout()
    {
    	Auth::logout();
    }

    public function isAuth()
    {
        return response()->json(Auth::check(),200);
    }

    public function test()
    {
        return response()->json(['respuesta' => true], 200);
    }

    public function loginToken(Request $request)
    {
        $request->validate([
            'identity' => 'required|numeric',
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required'
        ]);

        /*-- Validar existencia de la cédula (ASIUNERG) --*/
        $identityExist = Validator::make(['identity'=>$request->identity],[
            'identity' => 'exists:mysql.users,identity',
        ]);

        /*-- inciar sesión o fallar por credenciales si existe --*/
        if(! $identityExist->fails())
        {
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password))
            {
                throw ValidationException::withMessages([
                    'email' => [__('These credentials do not match our records.')],
                ]);
            }

            $token = $user->createToken($request->device_name)->plainTextToken;

            $response = [
                'role' => $user->getRoleNames(),
                'token' => $token
            ];

            return response()->json($response, 201);
        }

        throw ValidationException::withMessages([
            'identity' => ['La cédula no pertenece a ningun usuario.']
        ]);
    }

    public function logoutToken(Request $request)
    {
        $request->validate([
            'device_name' => 'required'
        ]);

        $tokens = $request->user()->tokens()->where('name',$request->device_name);

        if($tokens->exists()) {
            $tokens->delete();
            return response('Loggedout', 200);
        }

        return response([
            'message' => __('Error, Buena suerte con eso tiburoncín.')
        ], 403);
    }

    public function getRole(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'role' => $user->getRoleNames()
        ], 200);
    }
}