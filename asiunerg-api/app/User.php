<?php

namespace App;

use Spatie\MediaLibrary\HasMedia;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\MediaLibrary\MediaCollections\File;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, Notifiable, HasRoles, SoftDeletes, InteractsWithMedia;

    protected $connection = 'mysql';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'identity', 'username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Pedoxa\Teacher::class,'identity','cedula');
    }

    public function student()
    {
        return $this->hasOne(Models\Student::class);
    }

    /* MEDIA-LIBRARY */
    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('avatars')
            ->useFallbackUrl(asset('/images/anonymous-user.jpg'))
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg','image/png']);
    }
    /* MEDIA-LIBRARY */
}
