<!DOCTYPE html>
<html>
<head>
    <title>Demande de stage</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { text-align: center; color: #2b6cb0; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; }
        .value { margin-left: 10px; }
        .container { max-width: 800px; margin: auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Demande de stage</h1>
        <div class="section">
            <h2>Informations personnelles</h2>
            <p><span class="label">Nom :</span><span class="value">{{ $name }}</span></p>
            <p><span class="label">Prénom :</span><span class="value">{{ $surname }}</span></p>
            <p><span class="label">Email :</span><span class="value">{{ $email }}</span></p>
            <p><span class="label">Téléphone :</span><span class="value">{{ $phone }}</span></p>
            <p><span class="label">Adresse :</span><span class="value">{{ $address }}</span></p>
            <p><span class="label">Date de naissance :</span><span class="value">{{ $birth_date }}</span></p>
            <p><span class="label">Genre :</span><span class="value">{{ $gender }}</span></p>
        </div>
        <div class="section">
            <h2>Informations sur le stage</h2>
            <p><span class="label">Formation :</span><span class="value">{{ $formation_name }}</span></p>
            <p><span class="label">Dans le pays :</span><span class="value">{{ $isInCountry ? 'Oui' : 'Non' }}</span></p>
            @unless($isInCountry)
                <p><span class="label">Proches pour hébergement :</span><span class="value">{{ $hasRelatives ? 'Oui' : 'Non' }}</span></p>
                @unless($hasRelatives)
                    <p><span class="label">Capacité à assurer l'hébergement :</span><span class="value">{{ $canProvideAccommodation ? 'Oui' : 'Non' }}</span></p>
                @endunless
            @endunless
            <p><span class="label">Durée souhaitée (mois) :</span><span class="value">{{ $durationMonths }}</span></p>
        </div>
    </div>
</body>     
</html>