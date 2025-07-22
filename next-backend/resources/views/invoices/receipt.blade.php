    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        .header { text-align: center; }
        .content { margin-top: 30px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Facture de formation</h1>
    </div>

    <div class="content">
        <p><strong>Étudiant :</strong> {{ $student->name }} ({{ $student->email }})</p>
        <p><strong>Formation :</strong> {{ $formation->name }}</p>
        <p><strong>Montant :</strong> {{ number_format($formation->price, 0, ',', ' ') }} FCFA</p>
        <p><strong>Date :</strong> {{ now()->format('d/m/Y H:i') }}</p>
        <p><strong>Transaction ID :</strong> {{ $transactionId }}</p>
    </div>

    <div class="footer" style="margin-top: 50px;">
        <p>Merci pour votre inscription !</p>
    </div>
</body>
</html>
