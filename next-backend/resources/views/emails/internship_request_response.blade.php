@component('mail::message')
# Bonjour {{ $student->name }} {{ $student->surname }},

Votre demande de stage pour la formation **{{ $formation->name }}** a été **@if($status==='approved') approuvée @else rejetée @endif**.

@isset($messageFromAdmin)
@unless(empty($messageFromAdmin))
**Message de l'administration :**
> {{ $messageFromAdmin }}
@endunless
@endisset

@component('mail::button', ['url' => config('app.frontend_url', 'http://localhost:3000').'/dashboard/apprenant'])
Voir mon espace
@endcomponent

Merci,  
Jaspe Academy
@endcomponent
