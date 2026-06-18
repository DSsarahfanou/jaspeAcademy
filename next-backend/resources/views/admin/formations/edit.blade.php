@extends('layouts.master')
@section('title', 'Modifier — ' . $formation->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Formations', 'url' => route('admin.formations.index')],
        ['label' => $formation->name, 'url' => route('admin.formations.show', $formation->id)],
        ['label' => 'Modifier']
    ]" />
@endsection

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100">
            <h1 class="text-lg font-bold text-gray-800">Modifier la formation</h1>
            <p class="text-sm text-gray-500 mt-0.5">Les modules et quiz sont gérés via l'API.</p>
        </div>

        @if($errors->any())
            <div class="mx-6 mt-5 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                @foreach($errors->all() as $e) <p>• {{ $e }}</p> @endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('admin.formations.update', $formation->id) }}"
              enctype="multipart/form-data" class="p-6 space-y-5">
            @csrf
            @method('PUT')

            {{-- Image actuelle --}}
            @if($formation->picture)
            <div>
                <p class="text-xs font-semibold text-gray-700 mb-1.5">Image actuelle</p>
                <img src="{{ asset('storage/' . $formation->picture) }}"
                     class="h-32 rounded-xl object-cover border border-gray-200" alt="Couverture">
            </div>
            @endif

            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Titre <span class="text-red-500">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $formation->name) }}" required
                           class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
                </div>

                <div class="col-span-2">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Enseignant <span class="text-red-500">*</span></label>
                    <select name="teacher_id" required
                            class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 appearance-none transition-all">
                        <option value="">— Choisir un enseignant —</option>
                        @foreach($teachers as $t)
                            <option value="{{ $t->id }}"
                                {{ old('teacher_id', $formation->user_id) == $t->id ? 'selected' : '' }}>
                                {{ $t->name }} {{ $t->surname }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Prix (FCFA) <span class="text-red-500">*</span></label>
                    <input type="number" name="price" value="{{ old('price', $formation->price) }}" min="0" required
                           class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Prérequis</label>
                    <input type="text" name="prerequisites" value="{{ old('prerequisites', $formation->prerequisites) }}"
                           class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
                </div>

                <div class="col-span-2">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Description <span class="text-red-500">*</span></label>
                    <textarea name="formation_details" rows="4" required
                              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none transition-all">{{ old('formation_details', $formation->formation_details) }}</textarea>
                </div>

                <div class="col-span-2">
                    <label class="block text-xs font-semibold text-gray-700 mb-1.5">Remplacer l'image</label>
                    <input type="file" name="picture" accept="image/*"
                           class="block w-full text-sm text-gray-500
                                  file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0
                                  file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer">
                </div>
            </div>

            <div class="flex gap-3 pt-2">
                <a href="{{ route('admin.formations.show', $formation->id) }}"
                   class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-gray-300 transition-colors">
                    Annuler
                </a>
                <button type="submit"
                        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
