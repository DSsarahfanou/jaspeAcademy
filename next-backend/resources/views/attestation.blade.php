<!DOCTYPE html>
<html>
<head>
    <title>Attestation de Formation</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        h1 { color: #333; }
        .certificate { border: 2px solid #000; padding: 20px; margin: 20px; }
        .signature { margin-top: 50px; }
    </style>
</head>
<body>
    <div class="certificate">
        <h1>Attestation de Formation</h1>
        <p>Ceci certifie que</p>
        <h2>{{ $student_name }}</h2>
        <p>a suivi avec succès la formation</p>
        <h3>{{ $formation_name }}</h3>
        <p>avec une note de {{ $score }}%</p>
        <p>Date : {{ $date }}</p>
        <div class="signature">
            <p>_________________________</p>
            <p>Signature de l'instructeur</p>
        </div>
    </div>
</body>
</html> 