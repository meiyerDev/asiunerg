<?php

use App\User;
use App\Pedoxa\Project;
use App\Pedoxa\Teacher;
use Faker\Factory;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Builder;

class TeacherPedoxaToAsiunergSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $project = Project::all()->last();
        $teachers = Teacher::whereHas('sections',function (Builder $query) use ($project)
        {
            $query->where('proyecto_id',$project->id);
        })->get();
        foreach($teachers as $teacher) {
            $user = User::firstOrCreate(
                [
                    'identity' => $teacher->cedula,
                ],
                [
                    'name' => ucwords($teacher->nombres." ".$teacher->apellidos),
                    'username' => lcfirst($faker->unique()->firstName),
                    'email' => $teacher->email ? $teacher->email : $faker->unique()->safeEmail,
                    'password' => Hash::make($teacher->cedula),
                    'remember_token' => Str::random(10),
                ]
            );
            $user->assignRole('Teacher');
        }
    }
}
