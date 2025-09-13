<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InternshipRequestResponse extends Mailable
{
    use Queueable, SerializesModels;

    public $student;
    public $formation;
    public $status;
    public $messageFromAdmin;

    public function __construct($student, $formation, $status, $messageFromAdmin = '')
    {
        $this->student = $student;
        $this->formation = $formation;
        $this->status = $status;
        $this->messageFromAdmin = $messageFromAdmin;
    }

    public function build()
    {
        $subject = $this->status === 'approved'
            ? 'Votre demande de stage a été approuvée'
            : 'Votre demande de stage a été rejetée';

        return $this->subject($subject)
            ->markdown('emails.internship_request_response');
    }
}
