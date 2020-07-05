<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\User;

class LoginTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @test
     */
    public function user_can_login_with_sactum_from_spa()
    {
        $user = factory(User::class)->create(['email' => 'meiyerjaimes@gmail.com']);
		
		Sanctum::actingAs($user);

		$response = $this->get('/api/auth');

		$response->assertOk();
    }
}
