<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: auto; padding: 20px; }
        h1 { color: #2b6cb0; }
        .status-approved { color: #2ecc71; }
        .status-rejected { color: #e74c3c; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Réponse à votre demande de stage</h1>
        <p>Cher(e) {{ $student_name }},</p>
        <p>Nous avons examiné votre demande de stage pour la formation <strong>{{ $formation_name }}</strong>.</p>
        <p>Statut : <span class="status-{{ $status === 'Approuvée' ? 'approved' : 'rejected' }}">{{ $status }}</span></p>
        @if($message)
            <p><strong>Message de l'administrateur :</strong> {{ $message }}</p>
        @endif
        <p>Cordialement,</p>
        <p>L'équipe administrative</p>
    </div>
</body>
</html>