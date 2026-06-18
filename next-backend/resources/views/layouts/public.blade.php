<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'JaspeAcademy') — Plateforme de formation</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        primary: { 50:'#eff6ff',100:'#dbeafe',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a' }
                    }
                }
            }
        }
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        body { font-family: 'Inter', sans-serif; }
        [x-cloak] { display: none !important; }
    </style>
    @stack('styles')
</head>
<body class="bg-white text-gray-800 antialiased" x-data="{ mobileOpen: false }">

    {{-- ═══ NAVBAR ═══ --}}
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">

                {{-- Logo --}}
                <a href="{{ route('public.home') }}" class="flex items-center gap-2.5">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-graduation-cap text-white text-sm"></i>
                    </div>
                    <span class="font-bold text-gray-900 text-lg">JaspeAcademy</span>
                </a>

                {{-- Desktop nav --}}
                <nav class="hidden md:flex items-center gap-1">
                    <a href="{{ route('public.home') }}"
                       class="px-3 py-2 rounded-lg text-sm font-medium {{ request()->routeIs('public.home') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }} transition-colors">
                        Accueil
                    </a>
                    <a href="{{ route('public.formations') }}"
                       class="px-3 py-2 rounded-lg text-sm font-medium {{ request()->routeIs('public.formations*') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }} transition-colors">
                        Formations
                    </a>
                    <a href="{{ route('public.shop') }}"
                       class="px-3 py-2 rounded-lg text-sm font-medium {{ request()->routeIs('public.shop') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }} transition-colors">
                        Shop
                    </a>
                    <a href="{{ route('public.about') }}"
                       class="px-3 py-2 rounded-lg text-sm font-medium {{ request()->routeIs('public.about') ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' }} transition-colors">
                        À propos
                    </a>
                </nav>

                {{-- CTA --}}
                <div class="hidden md:flex items-center gap-2">
                    @auth
                        <a href="{{ route('web.redirect') }}"
                           class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
                            <i class="fas fa-tachometer-alt text-xs"></i> Dashboard
                        </a>
                    @else
                        <a href="{{ route('web.auth.login') }}"
                           class="px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 text-sm font-medium transition-colors">
                            Connexion
                        </a>
                        <a href="{{ route('web.auth.register') }}"
                           class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm">
                            S'inscrire
                        </a>
                    @endauth
                </div>

                {{-- Mobile toggle --}}
                <button @click="mobileOpen = !mobileOpen"
                        class="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                    <i class="fas" :class="mobileOpen ? 'fa-times' : 'fa-bars'"></i>
                </button>
            </div>
        </div>

        {{-- Mobile menu --}}
        <div x-show="mobileOpen" x-cloak
             class="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            <a href="{{ route('public.home') }}" class="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Accueil</a>
            <a href="{{ route('public.formations') }}" class="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Formations</a>
            <a href="{{ route('public.shop') }}" class="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Shop</a>
            <a href="{{ route('public.about') }}" class="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">À propos</a>
            <div class="pt-2 border-t border-gray-100 flex flex-col gap-2">
                @auth
                    <a href="{{ route('web.redirect') }}" class="block text-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Dashboard</a>
                @else
                    <a href="{{ route('web.auth.login') }}" class="block text-center px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium">Connexion</a>
                    <a href="{{ route('web.auth.register') }}" class="block text-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">S'inscrire</a>
                @endauth
            </div>
        </div>
    </header>

    {{-- ═══ CONTENT ═══ --}}
    <main>
        @yield('content')
    </main>

    {{-- ═══ FOOTER ═══ --}}
    <footer class="bg-gray-900 text-gray-400 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-2.5 mb-4">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <i class="fas fa-graduation-cap text-white text-sm"></i>
                        </div>
                        <span class="font-bold text-white text-lg">JaspeAcademy</span>
                    </div>
                    <p class="text-sm leading-relaxed max-w-sm">
                        Plateforme de formation professionnelle en ligne. Développez vos compétences à votre rythme avec des experts certifiés.
                    </p>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-sm mb-3">Navigation</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="{{ route('public.formations') }}" class="hover:text-white transition-colors">Formations</a></li>
                        <li><a href="{{ route('public.shop') }}" class="hover:text-white transition-colors">Shop</a></li>
                        <li><a href="{{ route('public.about') }}" class="hover:text-white transition-colors">À propos</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-semibold text-sm mb-3">Compte</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="{{ route('web.auth.login') }}" class="hover:text-white transition-colors">Connexion</a></li>
                        <li><a href="{{ route('web.auth.register') }}" class="hover:text-white transition-colors">Inscription</a></li>
                    </ul>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
                &copy; {{ date('Y') }} JaspeAcademy. Tous droits réservés.
            </div>
        </div>
    </footer>

    @stack('scripts')
</body>
</html>
