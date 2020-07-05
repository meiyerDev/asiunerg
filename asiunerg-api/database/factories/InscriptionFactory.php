<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Inscription;
use Faker\Generator as Faker;

$factory->define(Inscription::class, function (Faker $faker) {
    return [
        'section_id' => $faker->numberBetween($min = 1108, $max = 1459),
        'student_id' => $faker->numberBetween($min = 510, $max = 578),
        'active' => True
    ];
});
