@extends('layouts.master')
@section('title', 'Mon Profil Admin')

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Dashboard', 'url' => route('admin.dashboard')],
        ['label' => 'Mon profil']
    ]" />
@endsection

@section('content')
<div class="max-w-2xl mx-auto space-y-6" x-data="{ editMode: false, preview: null }">

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center gap-5">
            <div class="w-20 h-20 rounded-2xl overflow-hidden bg-blue-900 flex items-center justify-center">
                <template x-if="preview"><img :src="preview" class="w-full h-full object-cover"></template>
                <template x-if="!preview">
                    @if($user->picture)
                        <img src="{{ asset('storage/' . $user->picture) }}" class="w-full h-full object-cover">
                    @else
                        <i class="fas fa-shield-alt text-white/60 text-3xl"></i>
                    @endif
                </template>
            </div>
            <div>
                <h1 class="text-xl font-bold text-gray-800">{{ $user->name }} {{ $user->surname }}</h1>
                <p class="text-sm text-gray-500">{{ $user->email }}</p>
                <span class="inline-block mt-1 text-xs bg-red-100 text-red-700 font-semibold px-2.5 py-0.5 rounded-full">
                    Administrateur
                </span>
            </div>
            <button @click="editMode = !editMode"
                    class="ml-auto flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl
                           border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors">
                <i class="fas" :class="editMode ? 'fa-times' : 'fa-edit'"></i>
                <span x-text="editMode ? 'Annuler' : 'Modifier'"></span>
            </button>
        </div>
    </div>

    <form method="POST" action="{{ route('admin.profil.update') }}" enctype="multipart/form-data"
          class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        @csrf @method('PUT')

        <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">Informations</h2>
        </div>

        <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1.5">Nom</label>
                    <input type="text" name="name" value="{{ $user->name }}" :disabled="!editMode"
                           class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1.5">Prénom</label>
                    <input type="text" name="surname" value="{{ $user->surname }}" :disabled="!editMode"
                           class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all">
                </div>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Téléphone</label>
                <input type="tel" name="phone" value="{{ $user->phone }}" :disabled="!editMode"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all">
            </div>
            <div x-show="editMode" x-cloak>
                <label class="block text-xs font-semibold text-gray-600 mb-1.5">Photo</label>
                <input type="file" name="picture" accept="image/*"
                       @change="preview = $event.target.files[0] ? URL.createObjectURL($event.target.files[0]) : null"
                       class="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer">
            </div>
        </div>

        <div x-show="editMode" x-cloak class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" @click="editMode = false"
                    class="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-gray-300 transition-colors">
                Annuler
            </button>
            <button type="submit"
                    class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm">
                <i class="fas fa-save mr-1.5"></i> Enregistrer
            </button>
        </div>
    </form>
</div>
@endsection
