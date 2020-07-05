<?php

use App\ClassData;
use Illuminate\Database\Seeder;

class ClassDataProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $classesData = ClassData::all();
        foreach($classesData as $classdata) {
            $classdata->update([
                'project_id' => 9
            ]);
        }
    }
}
