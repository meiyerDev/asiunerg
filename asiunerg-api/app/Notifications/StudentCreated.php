<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StudentCreated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = config('services.spa.url_student');
        
        return (new MailMessage)
                    ->subject('AsiUnerg - ¡Ingresa ya!')
                    ->greeting("¡ Hola $notifiable->name $notifiable->lastname !")
                    ->line('Nos complace informarte que ya has sido registrado como estudiante en AsiUnerg.')
                    ->line('¡ Ya puedes registrar tu usuario !')
                    ->action('Registrate aquí', $url.'/registrar')
                    ->line('¡Gracias por preferirnos!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
