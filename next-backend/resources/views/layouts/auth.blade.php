<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Connexion') — JaspeAcademy</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    keyframes: {
                        'fade-in-up': {
                            '0%': { opacity: '0', transform: 'translateY(16px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        }
                    },
                    animation: { 'fade-in-up': 'fade-in-up 0.4s ease-out' }
                }
            }
        }
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        body { font-family: 'Inter', sans-serif; }
        [x-cloak] { display: none !important; }
        .auth-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 40%, #2563eb 70%, #3b82f6 100%);
        }
        .input-field {
            width: 100%; padding: 10px 14px; border-radius: 10px;
            border: 1.5px solid #e2e8f0; font-size: 0.875rem;
            transition: border-color 0.2s, box-shadow 0.2s; outline: none; background: #fff;
        }
        .input-field:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .input-field.error { border-color: #ef4444; }
        .btn-primary {
            width: 100%; padding: 11px; border-radius: 10px;
            background: #2563eb; color: #fff; font-weight: 600; font-size: 0.9rem;
            transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
            border: none; cursor: pointer;
            box-shadow: 0 4px 14px rgba(37,99,235,0.35);
        }
        .btn-primary:hover { background: #1d4ed8; box-shadow: 0 6px 20px rgba(37,99,235,0.4); }
        .btn-primary:active { transform: translateY(1px); }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
    </style>
    @stack('styles')
</head>

<body class="auth-bg min-h-screen flex items-center justify-center p-4" x-data>

    {{-- Decorative blobs --}}
    <div class="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

    {{-- Card --}}
    <div class="relative w-full max-w-md animate-fade-in-up">
        {{-- Logo band --}}
        <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-3 shadow-lg">
                <i class="fas fa-graduation-cap text-white text-2xl"></i>
            </div>
            <h1 class="text-white text-2xl font-bold tracking-tight">JaspeAcademy</h1>
            <p class="text-blue-200 text-sm mt-0.5">Plateforme de formation professionnelle</p>
        </div>

        {{-- Form card --}}
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            {{-- Flash message --}}
            @if(session('success'))
                <div class="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm">
                    <i class="fas fa-check-circle text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>{{ session('success') }}</span>
                </div>
            @endif
            @if(session('error'))
                <div class="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
                    <i class="fas fa-exclamation-circle text-red-500 mt-0.5 flex-shrink-0"></i>
                    <span>{{ session('error') }}</span>
                </div>
            @endif

            @yield('content')
        </div>

        <p class="text-center text-blue-200/60 text-xs mt-6">
            &copy; {{ date('Y') }} JaspeAcademy. Tous droits réservés.
        </p>
    </div>

    @stack('scripts')
</body>
</html>
