<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'JaspeAcademy') - Plateforme Formation</title>
    
    <!-- TailwindCSS + Font Awesome -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .transition-smooth { transition: all 0.3s ease; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Sidebar (responsive) -->
    <div class="flex h-screen">
        <aside class="w-64 bg-indigo-900 text-white fixed h-full z-20 transform -translate-x-full md:translate-x-0 transition-smooth" id="sidebar">
            <div class="p-4">
                <h2 class="text-2xl font-bold">JaspeAcademy</h2>
                <p class="text-indigo-300 text-sm">Plateforme e-learning</p>
            </div>
            <nav class="mt-8">
                @auth
                    @role('admin')
                        <x-sidebar-link href="{{ route('admin.dashboard') }}" icon="dashboard">Dashboard Admin</x-sidebar-link>
                        <x-sidebar-link href="{{ route('admin.formations') }}" icon="book">Formations</x-sidebar-link>
                        <x-sidebar-link href="{{ route('admin.users') }}" icon="users">Utilisateurs</x-sidebar-link>
                        <x-sidebar-link href="{{ route('admin.orders') }}" icon="shopping-cart">Commandes</x-sidebar-link>
                    @endrole
                    
                    @role('animateur')
                        <x-sidebar-link href="{{ route('animateur.dashboard') }}" icon="dashboard">Dashboard</x-sidebar-link>
                        <x-sidebar-link href="{{ route('animateur.formations') }}" icon="book">Mes formations</x-sidebar-link>
                        <x-sidebar-link href="{{ route('animateur.meetings') }}" icon="video">Réunions</x-sidebar-link>
                        <x-sidebar-link href="{{ route('animateur.etudiants') }}" icon="graduation-cap">Étudiants</x-sidebar-link>
                    @endrole
                    
                    @role('apprenant')
                        <x-sidebar-link href="{{ route('dashboard') }}" icon="dashboard">Dashboard</x-sidebar-link>
                        <x-sidebar-link href="{{ route('mes-formations') }}" icon="book">Mes formations</x-sidebar-link>
                        <x-sidebar-link href="{{ route('quiz') }}" icon="puzzle-piece">Quiz</x-sidebar-link>
                        <x-sidebar-link href="{{ route('certificats') }}" icon="certificate">Certificats</x-sidebar-link>
                    @endrole
                    
                    <x-sidebar-link href="{{ route('profil') }}" icon="user">Mon profil</x-sidebar-link>
                @endauth
            </nav>
        </aside>
        
        <!-- Main content -->
        <main class="flex-1 ml-0 md:ml-64">
            <!-- Header -->
            <header class="bg-white shadow-sm">
                <div class="px-6 py-4 flex justify-between items-center">
                    <button id="toggleSidebar" class="md:hidden text-gray-600">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                    <div class="flex items-center space-x-4">
                        @auth
                            <span class="text-sm text-gray-600">{{ auth()->user()->name }}</span>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="text-red-600 text-sm">Déconnexion</button>
                            </form>
                        @endauth
                    </div>
                </div>
            </header>
            
            <!-- Page content -->
            <div class="p-6">
                @if(session('success'))
                    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
                        {{ session('success') }}
                    </div>
                @endif
                
                @if(session('error'))
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                        {{ session('error') }}
                    </div>
                @endif
                
                @yield('content')
            </div>
        </main>
    </div>
    
    <script>
        document.getElementById('toggleSidebar')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('-translate-x-full');
        });
    </script>
    @stack('scripts')
</body>
</html>