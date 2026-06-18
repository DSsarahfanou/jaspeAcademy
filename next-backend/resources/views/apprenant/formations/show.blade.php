@extends('layouts.master')
@section('title', $fs->formation->name)

@section('breadcrumb')
    <x-breadcrumb :items="[
        ['label' => 'Mes formations', 'url' => route('apprenant.formations.index')],
        ['label' => $fs->formation->name]
    ]" />
@endsection

@push('styles')
<style>
    [x-cloak] { display: none !important; }
    .lesson-sidebar { height: calc(100vh - 7rem); }
    .media-frame { height: 460px; }
    @media (max-width: 768px) { .media-frame { height: 250px; } }
</style>
@endpush

@php
    $formation       = $fs->formation;
    $modules         = $formation->modules->load('lessons');
    $formationId     = $formation->id;
    $initProgression = (int)($fs->progression ?? 0);
    $initCompleted   = $completedLessons ?? [];
@endphp

@section('content')
<div x-data="lecteurFormation()" x-init="init()" class="relative -m-6">

    {{-- ═══ LAYOUT DEUX COLONNES ═══ --}}
    <div class="flex">

        {{-- ── SIDEBAR MODULES (sticky) ── --}}
        <aside class="hidden lg:flex flex-col w-68 flex-shrink-0 bg-white border-r border-gray-100 lesson-sidebar sticky top-14 overflow-y-auto"
               style="width:268px">

            <div class="px-4 py-4 border-b border-gray-100">
                <p class="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Progression</p>
                <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-500"
                             :class="progression >= 100 ? 'bg-green-500' : 'bg-blue-500'"
                             :style="'width:' + Math.min(progression,100) + '%'"></div>
                    </div>
                    <span x-text="progression + '%'" class="text-xs font-bold text-blue-600 w-9 text-right"></span>
                </div>
            </div>

            <nav class="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
                @foreach($modules as $mIdx => $module)
                @php $mi = (int)$mIdx; @endphp

                {{-- Module --}}
                <div class="mb-1">
                    <button @click="clickModule({{ $mi }})"
                            class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all"
                            :class="{
                                'bg-blue-600 text-white shadow': moduleIndex==={{ $mi }},
                                'bg-green-50 text-green-700 border border-green-200': moduleIndex!=={{ $mi }} && isModuleCompleted({{ $mi }}),
                                'text-gray-700 hover:bg-gray-50': moduleIndex!=={{ $mi }} && !isModuleCompleted({{ $mi }}) && peutAccederModule({{ $mi }}),
                                'text-gray-300 cursor-not-allowed': !peutAccederModule({{ $mi }}) && moduleIndex!=={{ $mi }}
                            }">
                        <span class="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs"
                              :class="moduleIndex==={{ $mi }} ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'">
                            {{ $mi + 1 }}
                        </span>
                        <span class="flex-1 text-left truncate">{{ $module->title }}</span>
                        <template x-if="isModuleCompleted({{ $mi }})">
                            <i class="fas fa-check-circle text-xs flex-shrink-0"
                               :class="moduleIndex==={{ $mi }} ? 'text-white' : 'text-green-500'"></i>
                        </template>
                        <template x-if="!isModuleCompleted({{ $mi }}) && !peutAccederModule({{ $mi }})">
                            <i class="fas fa-lock text-gray-300 text-xs flex-shrink-0"></i>
                        </template>
                    </button>

                    {{-- Leçons --}}
                    <div x-show="moduleIndex==={{ $mi }}" x-cloak class="mt-0.5 ml-4 space-y-0.5">
                        @foreach($module->lessons as $lIdx => $lesson)
                        @php $li = (int)$lIdx; $lkey = $module->id.':'.$lesson->id; @endphp
                        <button @click="clickLecon({{ $mi }},{{ $li }})"
                                class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-all"
                                :class="{
                                    'bg-blue-50 text-blue-700 font-semibold': moduleIndex==={{ $mi }} && leconIndex==={{ $li }},
                                    'text-green-600': completedLessons.includes('{{ $lkey }}') && !(moduleIndex==={{ $mi }} && leconIndex==={{ $li }}),
                                    'text-gray-500 hover:bg-gray-50': !completedLessons.includes('{{ $lkey }}') && peutAccederLecon({{ $mi }},{{ $li }}),
                                    'text-gray-300 cursor-not-allowed': !peutAccederLecon({{ $mi }},{{ $li }})
                                }">
                            <template x-if="completedLessons.includes('{{ $lkey }}')">
                                <i class="fas fa-check-circle text-green-500 flex-shrink-0" style="font-size:10px"></i>
                            </template>
                            <template x-if="!completedLessons.includes('{{ $lkey }}') && moduleIndex==={{ $mi }} && leconIndex==={{ $li }}">
                                <i class="fas fa-play-circle text-blue-500 flex-shrink-0" style="font-size:10px"></i>
                            </template>
                            <template x-if="!completedLessons.includes('{{ $lkey }}') && !(moduleIndex==={{ $mi }} && leconIndex==={{ $li }})">
                                <i class="fas fa-circle text-gray-200 flex-shrink-0" style="font-size:6px;margin:2px"></i>
                            </template>
                            <span class="truncate">{{ $lesson->title }}</span>
                            @if($lesson->contents)
                                @if(str_ends_with($lesson->contents,'.mp4') || str_ends_with($lesson->contents,'.webm'))
                                    <i class="fas fa-video text-gray-300 ml-auto flex-shrink-0" style="font-size:9px"></i>
                                @elseif(str_ends_with($lesson->contents,'.pdf'))
                                    <i class="fas fa-file-pdf text-gray-300 ml-auto flex-shrink-0" style="font-size:9px"></i>
                                @endif
                            @endif
                        </button>
                        @endforeach
                    </div>
                </div>
                @endforeach
            </nav>

            {{-- Bouton quiz --}}
            @if($formation->quizzes->count() > 0)
            <div class="px-3 pb-3">
                <button @click="allerAuQuiz()"
                        :class="progression >= 100 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
                        class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all">
                    <i class="fas fa-clipboard-check"></i> Passer le quiz
                </button>
            </div>
            @endif
        </aside>

        {{-- ── MAIN CONTENT ── --}}
        <main class="flex-1 min-w-0 p-6 space-y-5 overflow-auto">

            {{-- Titre + progression --}}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="min-w-0">
                    <h1 class="text-lg font-bold text-gray-800 truncate">{{ $formation->name }}</h1>
                    <div class="flex items-center gap-3 mt-1.5">
                        <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-xs">
                            <div class="h-full rounded-full transition-all duration-500"
                                 :class="progression >= 100 ? 'bg-green-500' : 'bg-blue-500'"
                                 :style="'width:'+Math.min(progression,100)+'%'"></div>
                        </div>
                        <span x-text="progression+'%'" class="text-sm font-bold text-blue-600"></span>
                    </div>
                </div>
                <button @click="showInfos = !showInfos"
                        class="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-blue-200">
                    <i class="fas" :class="showInfos ? 'fa-chevron-up' : 'fa-chevron-down'" style="font-size:9px"></i>
                    <span x-text="showInfos ? 'Masquer' : 'Détails'"></span>
                </button>
            </div>

            {{-- Détails formation (collapsible) --}}
            <div x-show="showInfos" x-cloak
                 x-transition:enter="transition ease-out duration-200"
                 x-transition:enter-start="opacity-0 -translate-y-2"
                 x-transition:enter-end="opacity-100 translate-y-0"
                 class="bg-gray-50 rounded-2xl p-4 space-y-3">
                @if($formation->picture)
                <img src="{{ asset('storage/'.$formation->picture) }}" alt="{{ $formation->name }}"
                     class="w-full h-40 object-cover rounded-xl">
                @endif
                @if($formation->prerequisites)
                <p class="text-sm text-gray-600"><span class="font-semibold">Prérequis :</span> {{ $formation->prerequisites }}</p>
                @endif
                @if($formation->formation_details)
                <p class="text-sm text-gray-500 leading-relaxed line-clamp-3">{{ $formation->formation_details }}</p>
                @endif
            </div>

            {{-- ── LECTEUR ── --}}
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {{-- Header leçon courante --}}
                <div class="px-5 py-3.5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                    <p class="text-xs text-blue-500 font-semibold uppercase tracking-wider" x-text="currentModuleTitle"></p>
                    <h2 class="font-bold text-gray-800 text-sm mt-0.5" x-text="currentLessonTitle"></h2>
                </div>

                {{-- Zone média --}}
                <div class="bg-gray-900 media-frame flex items-center justify-center">
                    <template x-if="currentMediaType === 'video'">
                        <video controls controlslist="nodownload" class="w-full h-full object-contain"
                               :src="currentMediaUrl" :key="currentMediaUrl">
                            Votre navigateur ne supporte pas la vidéo.
                        </video>
                    </template>
                    <template x-if="currentMediaType === 'pdf'">
                        <iframe :src="currentMediaUrl" class="w-full h-full border-0" title="PDF"></iframe>
                    </template>
                    <template x-if="currentMediaType === 'none'">
                        <div class="flex flex-col items-center gap-3 text-gray-500 p-8 text-center">
                            <i class="fas fa-file-alt text-4xl text-gray-600"></i>
                            <p class="text-sm" x-text="currentLessonContent || 'Aucun contenu média pour cette leçon.'"></p>
                        </div>
                    </template>
                </div>

                {{-- Navigation Précédent / Suivant --}}
                <div class="px-5 py-3.5 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">

                    <button @click="allerPrecedent()"
                            :disabled="moduleIndex===0 && leconIndex===0"
                            class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-600
                                   hover:border-blue-300 hover:text-blue-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                        <i class="fas fa-arrow-left text-xs"></i> Précédent
                    </button>

                    <p class="text-xs text-gray-400 hidden sm:block"
                       x-text="'Module '+(moduleIndex+1)+'/'+modules.length+' · Leçon '+(leconIndex+1)+'/'+(moduleActuel?.lessons?.length||1)"></p>

                    <template x-if="isLastLesson">
                        <button @click="allerAuQuiz()"
                                class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-green-600 hover:bg-green-700 text-white transition-all shadow-sm">
                            <i class="fas fa-clipboard-check"></i> Passer le test
                        </button>
                    </template>
                    <template x-if="!isLastLesson">
                        <button @click="allerSuivant()"
                                class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm">
                            Suivant <i class="fas fa-arrow-right text-xs"></i>
                        </button>
                    </template>
                </div>
            </div>

            {{-- Réunions disponibles --}}
            @if($meetings->isNotEmpty())
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <h3 class="font-semibold text-amber-800 text-sm flex items-center gap-2 mb-3">
                    <i class="fas fa-video text-amber-500"></i>
                    {{ $meetings->count() }} réunion(s) disponible(s) à votre niveau
                </h3>
                <div class="space-y-2">
                    @foreach($meetings as $meeting)
                    <div class="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-amber-100">
                        <div>
                            <p class="text-sm font-semibold text-gray-800">Niveau {{ $meeting->progression_level }}%</p>
                            <p class="text-xs text-gray-400">{{ \Carbon\Carbon::parse($meeting->scheduled_at)->locale('fr')->isoFormat('D MMM [à] HH[h]mm') }}</p>
                        </div>
                        <span class="text-xs bg-amber-100 text-amber-700 font-semibold px-3 py-1.5 rounded-full">
                            Disponible
                        </span>
                    </div>
                    @endforeach
                </div>
            </div>
            @endif

        </main>
    </div>

    {{-- ═══ POPUP JALONS & QUIZ ═══ --}}
    <div x-show="showPopup" x-cloak
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
         x-transition:enter="transition duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100">
        <div class="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-sm text-center"
             x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 scale-90" x-transition:enter-end="opacity-100 scale-100">

            {{-- Jalon atteint (25 / 50 / 75%) --}}
            <template x-if="niveauAtteint !== 'quiz_bloque'">
                <div>
                    <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-trophy text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-blue-700 mb-2">
                        Bravo ! Vous avez atteint <span x-text="niveauAtteint + '%'"></span>
                    </h3>
                    <p class="text-gray-500 text-sm mb-6">
                        Une réunion est prévue à ce niveau. Participez-y avant de passer le quiz final.
                    </p>
                    <div class="flex gap-3 justify-center">
                        <a :href="meetUrl"
                           class="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors">
                            <i class="fas fa-video mr-1"></i> Voir mes réunions
                        </a>
                        <button @click="showPopup = false"
                                class="px-5 py-2.5 border-2 border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-semibold rounded-xl transition-colors">
                            Continuer quand même
                        </button>
                    </div>
                </div>
            </template>

            {{-- Quiz bloqué : réunions obligatoires non faites --}}
            <template x-if="niveauAtteint === 'quiz_bloque'">
                <div>
                    <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-lock text-red-500 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-red-600 mb-2">Réunions obligatoires manquantes</h3>
                    <p class="text-gray-500 text-sm mb-3">
                        Vous devez avoir participé aux réunions des niveaux
                        <strong>25%</strong>, <strong>50%</strong> et <strong>75%</strong>
                        avant d'accéder au quiz.
                    </p>
                    <div class="flex gap-2 justify-center mb-5">
                        <template x-for="level in [25,50,75]" :key="level">
                            <span class="text-xs font-bold px-3 py-1.5 rounded-full"
                                  :class="completedMeetingLevels.includes(level)
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-red-100 text-red-600'">
                                <i class="fas"
                                   :class="completedMeetingLevels.includes(level) ? 'fa-check' : 'fa-times'"></i>
                                <span x-text="level + '%'"></span>
                            </span>
                        </template>
                    </div>
                    <div class="flex gap-3 justify-center">
                        <a :href="meetUrl"
                           class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
                            <i class="fas fa-video mr-1"></i> Aller aux réunions
                        </a>
                        <button @click="showPopup = false"
                                class="px-5 py-2.5 border-2 border-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-colors">
                            Fermer
                        </button>
                    </div>
                </div>
            </template>
        </div>
    </div>

    {{-- Toast --}}
    <div x-show="toast.visible" x-cloak
         x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition duration-200" x-transition:leave-end="opacity-0 translate-y-2"
         class="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold"
         :class="toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'">
        <i class="fas" :class="toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
        <span x-text="toast.message"></span>
    </div>

</div>
@endsection

@php
    $completedMeetingLevels = \App\Models\Meeting::where('formation_id', $formation->id)
        ->whereHas('students', fn($q) => $q->where('student_id', auth()->id()))
        ->pluck('progression_level')
        ->toArray();

    // Préparation des données JS — évite les fn() imbriquées dans @json()
    $modulesData = $modules->map(function ($m) {
        return [
            'id'      => $m->id,
            'title'   => $m->title,
            'lessons' => $m->lessons->map(function ($l) {
                return [
                    'id'       => $l->id,
                    'title'    => $l->title,
                    'contents' => $l->contents,
                ];
            })->values(),
        ];
    })->values();

    $meetingsData = $meetings->map(function ($m) {
        return ['progression_level' => $m->progression_level];
    })->values();

    $storageBase = rtrim(asset('storage'), '/');
    $quizUrl     = route('apprenant.formations.quiz', $formation->id);
    $meetUrl     = route('apprenant.meet.index');
@endphp

@push('scripts')
<script>
function lecteurFormation() {
    return {
        // ── Données PHP → JS ──
        modules:          @json($modulesData),
        completedLessons: @json($initCompleted),
        progression:      {{ $initProgression }},
        formationId:      {{ $formationId }},
        quizUrl:          @json($quizUrl),
        meetUrl:          @json($meetUrl),
        storageBase:      @json($storageBase),

        // ── État UI ──
        moduleIndex:            0,
        leconIndex:             0,
        showInfos:              false,
        showPopup:              false,
        niveauAtteint:          null,   // number (25|50|75) ou 'quiz_bloque'
        shownMilestones:        [],     // jalons dont le popup a déjà été affiché cette session
        completedMeetingLevels: @json($completedMeetingLevels),
        toast: { visible: false, message: '', type: 'success' },

        async init() {
            this.shownMilestones = [...this.completedMeetingLevels];
        },

        get moduleActuel()      { return this.modules[this.moduleIndex] || null; },
        get leconActuelle()     { return this.moduleActuel?.lessons?.[this.leconIndex] || null; },
        get currentModuleTitle(){ return this.moduleActuel?.title || ''; },
        get currentLessonTitle(){ return this.leconActuelle?.title || ''; },
        get currentLessonContent(){ return this.leconActuelle?.contents || ''; },
        get currentMediaType() {
            const c = this.leconActuelle?.contents || '';
            if (!c) return 'none';
            if (/\.(mp4|webm|ogg)$/i.test(c)) return 'video';
            if (/\.pdf$/i.test(c)) return 'pdf';
            return 'none';
        },
        get currentMediaUrl() {
            const c = this.leconActuelle?.contents || '';
            if (!c) return '';
            if (c.startsWith('http')) return c;
            return this.storageBase + '/' + c;
        },
        get isLastLesson() {
            if (!this.moduleActuel) return false;
            return this.moduleIndex === this.modules.length - 1
                && this.leconIndex  === this.moduleActuel.lessons.length - 1;
        },
        get totalLessons() {
            return this.modules.reduce((t, m) => t + (m.lessons?.length || 0), 0);
        },

        key(mId, lId) { return `${mId}:${lId}`; },
        isModuleCompleted(mi) {
            const m = this.modules[mi];
            return m?.lessons?.length > 0 && m.lessons.every(l => this.completedLessons.includes(this.key(m.id, l.id)));
        },
        peutAccederModule(mi) { return mi === 0 || this.isModuleCompleted(mi - 1); },
        peutAccederLecon(mi, li) {
            if (!this.peutAccederModule(mi)) return false;
            if (li === 0) return true;
            const m = this.modules[mi];
            return this.completedLessons.includes(this.key(m.id, m.lessons[li-1].id));
        },

        clickModule(mi) {
            if (!this.peutAccederModule(mi)) { this.showToast('Terminez les modules précédents d\'abord.', 'error'); return; }
            this.moduleIndex = mi; this.leconIndex = 0;
        },
        clickLecon(mi, li) {
            if (!this.peutAccederLecon(mi, li)) { this.showToast('Terminez les leçons précédentes d\'abord.', 'error'); return; }
            this.moduleIndex = mi; this.leconIndex = li;
        },

        allerSuivant() {
            this.marquerLeconComplete();
            if (this.leconIndex < this.moduleActuel.lessons.length - 1) {
                this.leconIndex++;
            } else if (this.moduleIndex < this.modules.length - 1) {
                this.showToast(`Module "${this.moduleActuel.title}" terminé !`, 'success');
                this.moduleIndex++;
                this.leconIndex = 0;
            }
        },
        allerPrecedent() {
            if (this.leconIndex > 0) { this.leconIndex--; }
            else if (this.moduleIndex > 0) { this.moduleIndex--; this.leconIndex = this.modules[this.moduleIndex].lessons.length - 1; }
        },
        allerAuQuiz() {
            this.marquerLeconComplete();

            if (this.progression < 100) {
                this.showToast('Terminez toutes les leçons avant de passer le quiz.', 'error');
                return;
            }

            // Bloquer si une des 3 réunions obligatoires n'a pas été complétée
            const missing = [25, 50, 75].filter(l => !this.completedMeetingLevels.includes(l));
            if (missing.length > 0) {
                this.niveauAtteint = 'quiz_bloque';
                this.showPopup = true;
                return;
            }

            window.location.href = this.quizUrl;
        },

        marquerLeconComplete() {
            if (!this.leconActuelle) return;
            const k = this.key(this.moduleActuel.id, this.leconActuelle.id);
            if (this.completedLessons.includes(k)) return;

            const prev = this.progression;
            this.completedLessons = [...this.completedLessons, k];
            const newProg = this.totalLessons > 0
                ? Math.round((this.completedLessons.length / this.totalLessons) * 100)
                : 0;
            this.progression = newProg;
            this.sauvegarderProgression(newProg, this.completedLessons);

            // Popup jalon : UNIQUEMENT si
            //  1. On vient de franchir ce palier (prev < jalon <= newProg)
            //  2. ET la réunion pour ce palier n'est PAS encore complétée
            //  3. ET on n'a pas déjà montré ce popup cette session
            const jalon = [25, 50, 75].find(j => prev < j && newProg >= j);
            if (jalon
                && !this.completedMeetingLevels.includes(jalon)
                && !this.shownMilestones.includes(jalon)
            ) {
                this.shownMilestones = [...this.shownMilestones, jalon];
                this.niveauAtteint  = jalon;
                this.showPopup      = true;
            }
        },

        async sauvegarderProgression(prog, completed) {
            try {
                const token = document.querySelector('meta[name="csrf-token"]')?.content || '';
                await fetch(`/api/formation_student/${this.formationId}/progression`, {
                    method: 'PATCH', credentials: 'include',
                    headers: { 'Content-Type':'application/json', 'Accept':'application/json', 'X-CSRF-TOKEN': token },
                    body: JSON.stringify({ progression: prog, completed_lessons: completed }),
                });
            } catch(e) { console.error('Progression save error:', e); }
        },

        showToast(msg, type = 'success') {
            this.toast = { visible: true, message: msg, type };
            setTimeout(() => { this.toast.visible = false; }, 3500);
        },
    };
}
</script>
@endpush
