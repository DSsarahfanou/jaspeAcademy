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
    public $adminMessage;

    public function __construct($student, $formation, $status, $adminMessage)
    {
        $this->student = $student;
        $this->formation = $formation;
        $this->status = $status;
        $this->message = $adminMessage;
    }

    public function build()
    {
        $statusText = $this->status === 'approved' ? 'Approuvée' : 'Rejetée';
        return $this->subject('Réponse à votre demande de stage')
                    ->view('emails.internship_request_response')
                    ->with([
                        'student_name' => $this->student->name . ' ' . $this->student->surname,
                        'formation_name' => $this->formation->name,
                        'status' => $statusText,
                        'message' => $this->message,
                    ]);
    }
}