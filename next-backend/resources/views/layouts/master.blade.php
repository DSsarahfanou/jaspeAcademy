<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'JaspeAcademy') — Plateforme de Formation</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        primary: {
                            50: '#eff6ff',  100: '#dbeafe', 200: '#bfdbfe',
                            300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6',
                            600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
                        }
                    },
                    keyframes: {
                        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                        'slide-in':   { '0%': { opacity: '0', transform: 'translateX(-10px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
                    },
                    animation: {
                        'fade-in-up': 'fade-in-up 0.3s ease-out',
                        'slide-in':   'slide-in 0.2s ease-out',
                    }
                }
            }
        }
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        [x-cloak] { display: none !important; }
        body { font-family: 'Inter', sans-serif; }

        /* Sidebar scrollbar */
        #sidebar::-webkit-scrollbar { width: 4px; }
        #sidebar::-webkit-scrollbar-track { background: transparent; }
        #sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }

        /* Nav link */
        .nav-link {
            display: flex; align-items: center; gap: 10px;
            padding: 9px 12px; border-radius: 8px;
            color: #bfdbfe; font-size: 0.875rem; font-weight: 500;
            transition: all 0.18s ease; text-decoration: none;
        }
        .nav-link:hover { background: rgba(255,255,255,0.12); color: #fff; }
        .nav-link.active { background: rgba(255,255,255,0.18); color: #fff; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); }
        .nav-link .nav-icon { width: 18px; text-align: center; flex-shrink: 0; }
        .nav-section-label {
            padding: 12px 12px 4px; font-size: 0.65rem; font-weight: 700;
            color: #93c5fd; text-transform: uppercase; letter-spacing: 0.08em;
        }

        /* Page transition */
        main { animation: fade-in-up 0.25s ease-out; }

        /* Smooth scrollbar for main */
        main::-webkit-scrollbar { width: 6px; }
        main::-webkit-scrollbar-track { background: #f1f5f9; }
        main::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    </style>

    @stack('styles')
</head>

<body class="bg-gray-50 antialiased"
      x-data="{
          sidebarOpen: window.innerWidth >= 768,
          userMenuOpen: false,
          init() {
              window.addEventListener('resize', () => {
                  if (window.innerWidth >= 768) this.sidebarOpen = true;
              });
          }
      }">

    {{-- ═══════════════════ SIDEBAR ═══════════════════ --}}
    {{-- Mobile overlay --}}
    <div x-show="sidebarOpen && window.innerWidth < 768"
         x-cloak
         @click="sidebarOpen = false"
         class="fixed inset-0 bg-black/50 z-20 md:hidden"
         x-transition:enter="transition duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0">
    </div>

    <aside id="sidebar"
           :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
           class="fixed top-0 left-0 h-full w-64 bg-blue-600 z-30
                  flex flex-col overflow-y-auto
                  transition-transform duration-300 ease-in-out shadow-2xl
                  md:translate-x-0">

        {{-- Logo --}}
        <div class="flex items-center gap-3 px-5 py-4 border-b border-blue-500/60 flex-shrink-0">
            <div class="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <i class="fas fa-graduation-cap text-white text-base"></i>
            </div>
            <div>
                <h1 class="text-white font-bold text-base leading-tight tracking-tight">JaspeAcademy</h1>
                <p class="text-blue-200 text-xs font-medium">Plateforme e-learning</p>
            </div>
        </div>

        {{-- User card --}}
        <div class="px-4 py-3 border-b border-blue-500/40 flex-shrink-0">
            <div class="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                @php
                    $avatar = auth()->user()->picture_url ?? auth()->user()->picture ?? null;
                    $initials = strtoupper(substr(auth()->user()->name, 0, 1) . substr(auth()->user()->surname ?? '', 0, 1));
                @endphp
                @if($avatar)
                    <img src="{{ asset('storage/' . $avatar) }}"
                         class="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 flex-shrink-0" alt="Avatar">
                @else
                    <div class="w-8 h-8 rounded-full bg-blue-500 ring-2 ring-white/30 flex items-center justify-center flex-shrink-0">
                        <span class="text-white font-bold text-xs">{{ $initials }}</span>
                    </div>
                @endif
                <div class="min-w-0">
                    <p class="text-white font-semibold text-xs truncate leading-tight">
                        {{ auth()->user()->name }} {{ auth()->user()->surname }}
                    </p>
                    <p class="text-blue-200 text-xs truncate">
                        @php
                            $roleLabels = ['admin' => 'Administrateur', 'teacher' => 'Animateur', 'student' => 'Apprenant'];
                        @endphp
                        {{ $roleLabels[auth()->user()->role] ?? auth()->user()->role }}
                    </p>
                </div>
            </div>
        </div>

        {{-- Navigation --}}
        <nav class="flex-1 px-3 py-3">
            @php $role = auth()->user()->role; @endphp

            {{-- ── ADMIN ── --}}
            @if($role === 'admin')
                <div class="nav-section-label">Principal</div>
                <a href="{{ route('admin.dashboard') }}"
                   class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-chart-pie nav-icon"></i> Dashboard
                </a>

                <div class="nav-section-label">Gestion académique</div>
                <a href="{{ route('admin.formations.index') }}"
                   class="nav-link {{ request()->routeIs('admin.formations.*') ? 'active' : '' }}">
                    <i class="fas fa-book-open nav-icon"></i> Formations
                </a>
                <a href="{{ route('admin.teachers.index') }}"
                   class="nav-link {{ request()->routeIs('admin.teachers.*') ? 'active' : '' }}">
                    <i class="fas fa-chalkboard-teacher nav-icon"></i> Enseignants
                </a>
                <a href="{{ route('admin.equipments.index') }}"
                   class="nav-link {{ request()->routeIs('admin.equipments.*') ? 'active' : '' }}">
                    <i class="fas fa-box-open nav-icon"></i> Équipements
                </a>
                <a href="{{ route('admin.orders.index') }}"
                   class="nav-link {{ request()->routeIs('admin.orders.*') ? 'active' : '' }}">
                    <i class="fas fa-shopping-cart nav-icon"></i> Commandes
                </a>

                <div class="nav-section-label">Administration</div>
                <a href="{{ route('admin.internship.index') }}"
                   class="nav-link {{ request()->routeIs('admin.internship.*') ? 'active' : '' }}">
                    <i class="fas fa-file-signature nav-icon"></i> Demandes stage
                </a>
                <a href="{{ route('admin.accounts.index') }}"
                   class="nav-link {{ request()->routeIs('admin.accounts.*') ? 'active' : '' }}">
                    <i class="fas fa-users-cog nav-icon"></i> Gestion comptes
                </a>
                <a href="{{ route('admin.profil.index') }}"
                   class="nav-link {{ request()->routeIs('admin.profil.*') ? 'active' : '' }}">
                    <i class="fas fa-user-circle nav-icon"></i> Mon profil
                </a>

            {{-- ── ANIMATEUR / TEACHER ── --}}
            @elseif($role === 'teacher')
                <div class="nav-section-label">Principal</div>
                <a href="{{ route('animateur.dashboard') }}"
                   class="nav-link {{ request()->routeIs('animateur.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-chart-line nav-icon"></i> Dashboard
                </a>

                <div class="nav-section-label">Formation</div>
                <a href="{{ route('animateur.formations.index') }}"
                   class="nav-link {{ request()->routeIs('animateur.formations.*') ? 'active' : '' }}">
                    <i class="fas fa-book-open nav-icon"></i> Mes formations
                </a>
                <a href="{{ route('animateur.reunions.index') }}"
                   class="nav-link {{ request()->routeIs('animateur.reunions.*') ? 'active' : '' }}">
                    <i class="fas fa-video nav-icon"></i> Réunions
                </a>
                <a href="{{ route('animateur.apprenants.index') }}"
                   class="nav-link {{ request()->routeIs('animateur.apprenants.*') ? 'active' : '' }}">
                    <i class="fas fa-users nav-icon"></i> Apprenants
                </a>

                <div class="nav-section-label">Compte</div>
                <a href="{{ route('animateur.profil.index') }}"
                   class="nav-link {{ request()->routeIs('animateur.profil.*') ? 'active' : '' }}">
                    <i class="fas fa-user-circle nav-icon"></i> Mon profil
                </a>

            {{-- ── APPRENANT / STUDENT ── --}}
            @else
                <div class="nav-section-label">Principal</div>
                <a href="{{ route('apprenant.dashboard') }}"
                   class="nav-link {{ request()->routeIs('apprenant.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-home nav-icon"></i> Dashboard
                </a>

                <div class="nav-section-label">Formation</div>
                <a href="{{ route('apprenant.formations.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.formations.*') ? 'active' : '' }}">
                    <i class="fas fa-book nav-icon"></i> Mes formations
                </a>
                <a href="{{ route('apprenant.catalogue.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.catalogue.*') ? 'active' : '' }}">
                    <i class="fas fa-search nav-icon"></i> Catalogue
                </a>
                <a href="{{ route('apprenant.certificats.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.certificats.*') ? 'active' : '' }}">
                    <i class="fas fa-award nav-icon"></i> Certificats
                </a>
                <a href="{{ route('apprenant.meet.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.meet.*') ? 'active' : '' }}">
                    <i class="fas fa-video nav-icon"></i> Mes réunions
                </a>

                <div class="nav-section-label">Espace perso</div>
                <a href="{{ route('apprenant.shop.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.shop.*') ? 'active' : '' }}">
                    <i class="fas fa-box-open nav-icon"></i> Shop
                </a>
                <a href="{{ route('apprenant.orders.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.orders.*') ? 'active' : '' }}">
                    <i class="fas fa-shopping-bag nav-icon"></i> Commandes
                </a>
                <a href="{{ route('apprenant.stage.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.stage.*') ? 'active' : '' }}">
                    <i class="fas fa-briefcase nav-icon"></i> Stage
                </a>
                <a href="{{ route('apprenant.profil.index') }}"
                   class="nav-link {{ request()->routeIs('apprenant.profil.*') ? 'active' : '' }}">
                    <i class="fas fa-user-circle nav-icon"></i> Mon profil
                </a>
            @endif
        </nav>

        {{-- Logout --}}
        <div class="px-3 py-3 border-t border-blue-500/40 flex-shrink-0">
            <form method="POST" action="{{ route('web.logout') }}">
                @csrf
                <button type="submit"
                        class="nav-link w-full text-left hover:!bg-red-500/80 hover:!text-white group">
                    <i class="fas fa-sign-out-alt nav-icon group-hover:scale-110 transition-transform"></i>
                    Déconnexion
                </button>
            </form>
        </div>
    </aside>

    {{-- ═══════════════════ MAIN CONTENT ═══════════════════ --}}
    <div class="min-h-screen flex flex-col md:ml-64 transition-all duration-300">

        {{-- ── HEADER ── --}}
        <header class="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div class="flex items-center justify-between h-14 px-4">

                {{-- Left: sidebar toggle --}}
                <div class="flex items-center gap-3">
                    <button @click="sidebarOpen = !sidebarOpen"
                            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-all">
                        <i class="fas" :class="sidebarOpen ? 'fa-indent' : 'fa-outdent'" style="font-size:1.1rem"></i>
                    </button>

                    {{-- Breadcrumb --}}
                    @hasSection('breadcrumb')
                        <div class="hidden sm:block">
                            @yield('breadcrumb')
                        </div>
                    @endif
                </div>

                {{-- Right: actions --}}
                <div class="flex items-center gap-1">
                    {{-- Notification bell --}}
                    <button class="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-all">
                        <i class="fas fa-bell" style="font-size:1rem"></i>
                    </button>

                    {{-- User dropdown --}}
                    <div x-data="{ open: false }" class="relative ml-1">
                        <button @click="open = !open"
                                class="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-all">
                            @php $avatar = auth()->user()->picture_url ?? auth()->user()->picture ?? null; @endphp
                            @if($avatar)
                                <img src="{{ asset('storage/' . $avatar) }}"
                                     class="w-7 h-7 rounded-full object-cover" alt="">
                            @else
                                <div class="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">
                                        {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                                    </span>
                                </div>
                            @endif
                            <span class="hidden sm:block text-sm font-medium text-gray-700">
                                {{ auth()->user()->name }}
                            </span>
                            <i class="fas fa-chevron-down text-gray-400 text-xs transition-transform duration-200"
                               :style="open ? 'transform:rotate(180deg)' : ''"></i>
                        </button>

                        {{-- Dropdown --}}
                        <div x-show="open"
                             @click.outside="open = false"
                             x-cloak
                             x-transition:enter="transition ease-out duration-150"
                             x-transition:enter-start="opacity-0 scale-95"
                             x-transition:enter-end="opacity-100 scale-100"
                             x-transition:leave="transition ease-in duration-100"
                             x-transition:leave-start="opacity-100 scale-100"
                             x-transition:leave-end="opacity-0 scale-95"
                             class="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">

                            <div class="px-4 py-2.5 border-b border-gray-100">
                                <p class="text-sm font-semibold text-gray-800 truncate">
                                    {{ auth()->user()->name }} {{ auth()->user()->surname }}
                                </p>
                                <p class="text-xs text-gray-500 truncate">{{ auth()->user()->email }}</p>
                            </div>

                            <form method="POST" action="{{ route('web.logout') }}">
                                @csrf
                                <button class="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600
                                               hover:bg-red-50 transition-colors">
                                    <i class="fas fa-sign-out-alt w-4 text-center"></i> Déconnexion
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {{-- ── PAGE TITLE ZONE (optionnel) ── --}}
        @hasSection('page-header')
        <div class="bg-white border-b border-gray-100 px-6 py-4">
            @yield('page-header')
        </div>
        @endif

        {{-- ── MAIN ── --}}
        <main class="flex-1 p-6 overflow-auto">
            <x-toast />
            @yield('content')
        </main>

    </div>

    @stack('scripts')
</body>
</html>
