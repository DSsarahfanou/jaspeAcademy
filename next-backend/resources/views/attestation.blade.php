<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Attestation de Formation</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            margin: 0;
            padding: 0;
            color: #1a237e;
            position: relative;
        }

        .container {
            border: 8px double #d4af37;
            padding: 60px;
            margin: 40px auto;
            max-width: 850px;   
            position: relative;
            z-index: 2;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
        }

        .header img {
            width: 120px;
        }

        .title {
            font-size: 40px;
            font-weight: bold;
            margin: 40px 0 20px;
            color: #1a237e;
            text-align: center;
        }

        .recipient {
            font-size: 24px;
            font-style: italic;
            margin: 10px 0;
            color: #0d47a1;
        }

        .description {
            font-size: 18px;
            margin: 30px 0;
            line-height: 1.7;
            color: #333;
            text-align: center;
        }

        .signature {
            margin-top: 80px;
            text-align: right;
            font-size: 16px;
            color: #444;
        }

        .signature-line {
            margin-top: 40px;
            border-top: 1px solid #000;
            width: 220px;
        }

        .info-box {
            margin-top: 50px;
            font-size: 13px;
            color: #333;
        }

        .footer {
            margin-top: 50px;
            font-size: 11px;
            text-align: center;
            color: #666;
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.08;
            z-index: 1;
        }

        .watermark img {
            width: 800px;
            height: auto;
        }
    </style>
</head>
<body>

    {{-- Logo filigrane visible en PDF --}}
    <div class="watermark">
        <img src="{{ public_path('images/bg.png') }}" alt="Filigrane">
    </div>

    <div class="container">
        <div class="header">
            <img src="{{ public_path('images/logo.png') }}" alt="Logo JaspeAcademy">
        </div>

        <div class="title">Attestation de Formation</div>

        <div class="description">
            Ceci certifie que<br>
            <span class="recipient">{{ $student_name }}</span><br>
            a suivi avec succès la formation<br>
            <strong>"{{ $formation_name }}"</strong><br>
            avec une note de <strong>{{ $score }}%</strong><br>
            Délivrée le <strong>{{ $date }}</strong>.
        </div>

        <div class="signature">
            <p>Signature de l'instructeur</p>
            <div class="signature-line"></div>
        </div>

        <div class="info-box">
            <p>
                <strong>Jaspe Technologies</strong> est un cabinet d’ingénierie Télécom et TIC basé au Bénin et au Togo.
                Nous déployons des solutions en réseaux, fibre optique, vidéosurveillance, sécurité, data centers et formation professionnelle à travers <strong>jaspeAcademy</strong>.
            </p>
            <p>
                <i class="fas fa-map-marker-alt"></i> Calavi, Bidossesi &bull; <i class="fas fa-phone"></i> +229 47332880 / +229 21333008 &bull; <i class="fas fa-envelope"></i> contact@jaspetechnologies.com
            </p>
        </div>

        <div class="footer">
            © 2025 Jaspe Technologies – jaspeAcademy. Made by Xpérience.
        </div>
    </div>
</body>
</html>
