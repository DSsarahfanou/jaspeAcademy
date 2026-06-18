@extends('layouts.master')
@section('title', 'Gestion des Comptes')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Gestion des comptes']
    ]" />
@endsection

@section('content')
<div class="space-y-5">
    <div>
        <h1 class="text-xl font-bold text-gray-800">Gestion des Comptes</h1>
        <p class="text-sm text-gray-500">{{ $users->total() }} utilisateur(s) au total</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-100">
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Utilisateur</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Email</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Rôle</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Inscrit le</th>
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    @foreach($users as $usr)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-5 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    @if($usr->picture)
                                        <img src="{{ asset('storage/' . $usr->picture) }}" class="w-full h-full object-cover">
                                    @else
                                        <span class="text-blue-600 font-bold text-sm">{{ strtoupper(substr($usr->name, 0, 1)) }}</span>
                                    @endif
                                </div>
                                <p class="font-semibold text-gray-800 text-sm">{{ $usr->name }} {{ $usr->surname }}</p>
                            </div>
                        </td>
                        <td class="px-5 py-4 hidden sm:table-cell text-gray-500 text-xs">{{ $usr->email }}</td>
                        <td class="px-5 py-4">
                            @php $roleCls = ['admin' => 'bg-red-100 text-red-700', 'teacher' => 'bg-purple-100 text-purple-700', 'student' => 'bg-blue-100 text-blue-700']; @endphp
                            <span class="text-xs font-semibold px-2 py-0.5 rounded-full {{ $roleCls[$usr->role] ?? 'bg-gray-100 text-gray-600' }}">
                                {{ ucfirst($usr->role) }}
                            </span>
                        </td>
                        <td class="px-5 py-4 hidden md:table-cell text-xs text-gray-400">
                            {{ $usr->created_at->locale('fr')->isoFormat('D MMM YYYY') }}
                        </td>
                        <td class="px-5 py-4">
                            <div class="flex items-center gap-2">
                                {{-- Changer rôle --}}
                                @if($usr->id !== auth()->id())
                                <form method="POST" action="{{ route('admin.accounts.update', $usr->id) }}" class="flex gap-1">
                                    @csrf @method('PATCH')
                                    <select name="role" class="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none">
                                        <option value="student" {{ $usr->role === 'student' ? 'selected' : '' }}>Apprenant</option>
                                        <option value="teacher" {{ $usr->role === 'teacher' ? 'selected' : '' }}>Enseignant</option>
                                        <option value="admin"   {{ $usr->role === 'admin'   ? 'selected' : '' }}>Admin</option>
                                    </select>
                                    <button type="submit"
                                            class="text-xs bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-700 px-2 py-1 rounded-lg transition-colors">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </form>
                                <form method="POST" action="{{ route('admin.accounts.destroy', $usr->id) }}"
                                      onsubmit="return confirm('Supprimer ce compte ?')">
                                    @csrf @method('DELETE')
                                    <button class="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                                @else
                                    <span class="text-xs text-gray-400 italic">Votre compte</span>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if($users->hasPages())
        <div class="px-5 py-4 border-t border-gray-100">
            {{ $users->links() }}
        </div>
        @endif
    </div>
</div>
@endsection
