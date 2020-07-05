<?php

use App\Models\Absence;
use Illuminate\Database\Seeder;

class AbsenceProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $absences = Absence::all();
        foreach($absences as $absence) {
            $absence->update([
                'project_id' => 9
            ]);
        }
    }
}
