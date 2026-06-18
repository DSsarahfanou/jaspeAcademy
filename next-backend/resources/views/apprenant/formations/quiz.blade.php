@extends('layouts.master')
@section('title', 'Quiz — ' . ($quiz->title ?? 'Formation'))

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Mes Formations', 'url' => route('apprenant.formations.index')],
        ['label' => 'Formation', 'url' => route('apprenant.formations.show', $id)],
        ['label' => 'Quiz']
    ]" />
@endsection

@section('content')
<div class="max-w-3xl mx-auto" x-data="{
    current: 0,
    answers: {},
    total: {{ $quiz->questions->count() }},
    submitted: false,
    get progress() { return Math.round((Object.keys(this.answers).length / this.total) * 100) },
    get canSubmit() { return Object.keys(this.answers).length === this.total },
    next() { if (this.current < this.total - 1) this.current++ },
    prev() { if (this.current > 0) this.current-- },
}">

    {{-- Header quiz --}}
    <div class="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-3">
            <div>
                <p class="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Quiz de validation</p>
                <h1 class="text-xl font-bold">{{ $quiz->title }}</h1>
            </div>
            <div class="text-right">
                <p class="text-3xl font-bold" x-text="Object.keys(answers).length + '/' + total"></p>
                <p class="text-blue-200 text-xs">réponses données</p>
            </div>
        </div>
        <div class="bg-white/20 rounded-full h-2 overflow-hidden">
            <div class="h-full bg-white rounded-full transition-all duration-500"
                 :style="'width:' + progress + '%'"></div>
        </div>
    </div>

    <form method="POST" action="{{ route('apprenant.formations.quiz.submit', $id) }}"
          @submit.prevent="if(canSubmit) { submitted = true; $el.submit() }">
        @csrf
        <input type="hidden" name="quiz_id" value="{{ $quiz->id }}">

        {{-- Questions --}}
        @foreach($quiz->questions as $index => $question)
        <div x-show="current === {{ $index }}"
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 translate-x-4"
             x-transition:enter-end="opacity-100 translate-x-0"
             class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">

            <div class="px-6 py-5 border-b border-gray-100">
                <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold
                                 flex items-center justify-center">
                        {{ $index + 1 }}
                    </span>
                    <p class="font-semibold text-gray-800 leading-snug pt-1">{{ $question->title }}</p>
                </div>
            </div>

            <div class="p-6 space-y-3">
                @foreach($question->options as $option)
                <label class="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150
                    hover:border-blue-300 hover:bg-blue-50 group"
                    :class="answers['{{ $question->id }}'] == '{{ $option->id }}'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'">
                    <input type="radio"
                           name="answers[{{ $question->id }}]"
                           value="{{ $option->id }}"
                           x-model="answers['{{ $question->id }}']"
                           @change="answers = {...answers}"
                           class="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                    <span class="text-sm text-gray-700 group-hover:text-blue-700 leading-snug"
                          :class="answers['{{ $question->id }}'] == '{{ $option->id }}' ? 'text-blue-700 font-medium' : ''">
                        {{ $option->title }}
                    </span>
                </label>
                @endforeach
            </div>
        </div>
        @endforeach

        {{-- Navigation --}}
        <div class="flex items-center justify-between gap-3 mt-4">
            <button type="button"
                    @click="prev()"
                    :disabled="current === 0"
                    class="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600
                           text-sm font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors
                           disabled:opacity-40 disabled:cursor-not-allowed">
                <i class="fas fa-arrow-left text-xs"></i> Précédent
            </button>

            {{-- Numéros de question --}}
            <div class="flex gap-1.5 flex-wrap justify-center">
                @foreach($quiz->questions as $i => $q)
                <button type="button"
                        @click="current = {{ $i }}"
                        :class="{
                            'bg-blue-600 text-white': current === {{ $i }},
                            'bg-green-500 text-white': current !== {{ $i }} && answers['{{ $q->id }}'],
                            'bg-gray-200 text-gray-600': current !== {{ $i }} && !answers['{{ $q->id }}']
                        }"
                        class="w-8 h-8 rounded-full text-xs font-bold transition-all">
                    {{ $i + 1 }}
                </button>
                @endforeach
            </div>

            <template x-if="current < total - 1">
                <button type="button"
                        @click="next()"
                        class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700
                               text-white text-sm font-semibold transition-colors">
                    Suivant <i class="fas fa-arrow-right text-xs"></i>
                </button>
            </template>

            <template x-if="current === total - 1">
                <button type="submit"
                        :disabled="!canSubmit || submitted"
                        class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700
                               text-white text-sm font-bold transition-colors shadow-sm
                               disabled:opacity-50 disabled:cursor-not-allowed">
                    <i x-show="submitted" class="fas fa-spinner fa-spin" x-cloak></i>
                    <i x-show="!submitted" class="fas fa-check-circle"></i>
                    <span x-text="submitted ? 'Envoi...' : 'Soumettre le quiz'">Soumettre</span>
                </button>
            </template>
        </div>

        {{-- Avertissement si incomplet --}}
        <div x-show="!canSubmit && current === total - 1" x-cloak
             class="mt-3 flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-4 py-3 text-sm">
            <i class="fas fa-exclamation-triangle text-yellow-500 flex-shrink-0"></i>
            Vous devez répondre à toutes les questions avant de soumettre.
            (<span x-text="total - Object.keys(answers).length"></span> restante(s))
        </div>
    </form>
</div>
@endsection
