<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
 
    /**
     * Upload Image
     *
     * @param  Request  $request
     * @return Response
     */
    public function uploadImage(Request $request)
    {
        /* upload image */
        $request->validate([
          'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
		$user = $request->user();
		
		/* obtenemos el archivo */
        $imageFile = $request->file('image');

        if(!Storage::exists('users/profile/'.$user->id)){
            Storage::makeDirectory('users/profile/'.$user->id);
        }
        
        $imagePath = Storage::put('users/profile/'.$user->id, $img);
        $path = Storage::url($imagePath);
		
		/* se registra como imagen de perfil del usuario */
        $user->picture = $path;
 
        /* se crea el registro del archivo */
        $image = new File;
        $image->path = $user->id;
        $image->path = $path;
        $image->save();
        
        return response()->json([
            'path_image' => $path
        ], 201);
    }
}
