<!-- <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture N°{{ $order->id }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f7f9fc;
            color: #333;
            padding: 40px;
            font-size: 14px;
        }
        .invoice-container {
            background-color: #fff;
            padding: 30px;
            max-width: 800px;
            margin: auto;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        .header-container {
            display: flex;
            justify-content: space-between;
        }
        .client-info, .entreprise-info {
            width: 48%;
        }
        .client-info {
            padding-right: 2rem;
            text-align: left;
        }
        .entreprise-info {
            text-align: right;
        }
        .logo {
            width: 8rem;
            height: auto;
            margin-bottom: 1rem;
        }
        /*header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #eee;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }*/

        .client-info h3 {
            color: #0077cc;
            /* margin-bottom: 10px; */
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f0f8ff;
            color: #0077cc;
        }
        .totals {
            text-align: right;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .footer-note {
            font-size: 11px;
            color: #888;
            font-style: italic;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
<div class="invoice-container">



    <header>
        <div class="header-container">
            <div class="client-info">
                <img src="{{ public_path('logo.png') }}" alt="Logo Jaspe" class="logo">
                <h3>Facturé à :</h3>
                <p><strong>Nom :</strong> {{ $order->student->name }}</p>
                <p><strong>Date :</strong> {{ \Carbon\Carbon::now()->format('d/m/Y') }}</p>
                <p><strong>Facture N° :</strong> FAC-{{ $order->id }}</p>
            </div>
            
            <div class="entreprise-info">
                <h2>Jaspe Technologies</h2>
                <p>Rue 123, Calavi, Bénin</p>
                <p>Tél: +229 90 00 00 00</p>
                <p>Email: contact@jaspe-tech.com</p>
            </div>
        </div>
    </header>

    <section>
        <table>
            <thead>
                <tr>
                    <th>Équipement</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire (FCFA)</th>
                    <th>Total (FCFA)</th>
                </tr>
            </thead>
            <tbody>
                @php $total = 0; @endphp
                @foreach($order->equipment_orders as $item)
                    @php
                        $itemTotal = $item->equipment->price * $item->quantity;
                        $total += $itemTotal;
                    @endphp
                    <tr>
                        <td>{{ $item->equipment->name }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>{{ number_format($item->equipment->price, 0, ',', ' ') }}</td>
                        <td>{{ number_format($itemTotal, 0, ',', ' ') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>

    <div class="totals">
        <strong>Total TTC : {{ number_format($total, 0, ',', ' ') }} FCFA</strong>
    </div>

    <p class="footer-note">
        Cette facture est générée électroniquement. Toute falsification est passible de poursuites judiciaires.
    </p>
</div>
</body>
</html> -->


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture N°{{ $order->id }}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f7f9fc;
            color: #333;
            padding: 40px;
            font-size: 14px;
        }
        .invoice-container {
            background-color: #fff;
            padding: 30px;
            max-width: 800px;
            margin: auto;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }

        header{
            border-bottom: 2px solid #eee;
        }

        .logo {
            width: 50px;
            height: auto;
        }
        h2 {
            color: #2c5282;
            margin-bottom: 10px;
            font-size: 18px;
        }
        h3 {
            color: #2b6cb0;
            margin-bottom: 10px;
            font-size: 16px;
        }
        p {
            margin-bottom: 8px;
            line-height: 1.4;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .th, .td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
        }
        .th {
            background-color: #ebf8ff;
            color: #2b6cb0;
            font-weight: 600;
        }
        .totals {
            text-align: right;
            font-size: 16px;
            margin-bottom: 20px;
            font-weight: bold;
            color: #2b6cb0;
        }
        .footer-note {
            font-size: 11px;
            color: #718096;
            font-style: italic;
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
        }
    </style>
</head>
<body>
<div class="invoice-container">
    <header>
        <table width="100%" style="margin-bottom: 30px;">
            <tr>
                <td style="width: 48%; padding-right: 10px; ">
                    <img src="{{ public_path('logo.png') }}" alt="Logo Jaspe" style="width: 100px; height: auto; margin-bottom: 10px;">
                    <h3 style="color: #2b6cb0;">Facturé à :</h3>
                    <p><strong>Nom :</strong> {{ $order->student->name }}</p>
                    <p><strong>Date :</strong> {{ \Carbon\Carbon::now()->format('d/m/Y') }}</p>
                    <p><strong>Facture N° :</strong> FAC-{{ $order->id }}</p>
                </td>
                <td style="width: 48%; padding-left: 10px; text-align: right;">
                    <h2 style="color: #2c5282;">Jaspe Technologies</h2>
                    <p>Rue 123, Calavi, Bénin</p>
                    <p>Tél: +229 90 00 00 00</p>
                    <p>Email: contact@jaspe-tech.com</p>
                </td>
            </tr>
        </table>
    </header>

    <section>
        <table class="table">
            <thead>
                <tr>
                    <th class="th">Équipement</th>
                    <th class="th">Quantité</th>
                    <th class="th">Prix Unitaire (FCFA)</th>
                    <th class="th">Total (FCFA)</th>
                </tr>
            </thead>
            <tbody>
                @php $total = 0; @endphp
                @foreach($order->equipment_orders as $item)
                    @php
                        $itemTotal = $item->equipment->price * $item->quantity;
                        $total += $itemTotal;
                    @endphp
                    <tr>
                        <td class="td">{{ $item->equipment->name }}</td>
                        <td class="td">{{ $item->quantity }}</td>
                        <td class="td">{{ number_format($item->equipment->price, 0, ',', ' ') }}</td>
                        <td class="td">{{ number_format($itemTotal, 0, ',', ' ') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>

    <div class="totals">
        <strong>Total TTC : {{ number_format($total, 0, ',', ' ') }} FCFA</strong>
    </div>

    <p class="footer-note">
        Cette facture est générée électroniquement. Toute falsification est passible de poursuites judiciaires.
    </p>
</div>
</body>
</html>