@props([
    'formation'  => [],
    'showAction' => true,
    'actionLabel'=> 'Voir la formation',
    'actionUrl'  => '#',
    'badge'      => null,
])

@php
    $image    = $formation['image'] ?? $formation['image_url'] ?? null;
    $title    = $formation['title'] ?? $formation['name'] ?? 'Formation';
    $desc     = $formation['description'] ?? '';
    $price    = $formation['price'] ?? null;
    $duration = $formation['duration'] ?? null;
    $level    = $formation['level'] ?? null;
@endphp

<div class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg
            transition-all duration-250 overflow-hidden group flex flex-col">

    {{-- Image / Placeholder --}}
    <div class="relative overflow-hidden h-44 bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0">
        @if($image)
            <img src="{{ asset('storage/' . $image) }}"
                 alt="{{ $title }}"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        @else
            <div class="absolute inset-0 flex flex-col items-center justify-center">
                <i class="fas fa-book-open text-white/40 text-4xl mb-2"></i>
                <p class="text-white/60 text-xs font-medium">{{ $title }}</p>
            </div>
        @endif

        @if($badge)
            <span class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold
                         px-2.5 py-1 rounded-full shadow">
                {{ $badge }}
            </span>
        @endif

        @if($price !== null)
            <span class="absolute top-3 right-3 bg-white text-blue-700 text-xs font-bold
                         px-2.5 py-1 rounded-full shadow">
                {{ $price == 0 ? 'Gratuit' : number_format($price, 0, ',', ' ') . ' FCFA' }}
            </span>
        @endif
    </div>

    {{-- Body --}}
    <div class="p-4 flex flex-col flex-1">
        <h3 class="font-semibold text-gray-800 text-sm leading-snug mb-1.5 line-clamp-2
                   group-hover:text-blue-600 transition-colors">
            {{ $title }}
        </h3>

        @if($desc)
            <p class="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{{ $desc }}</p>
        @endif

        {{-- Meta --}}
        <div class="flex items-center gap-3 text-xs text-gray-400 mt-auto mb-3">
            @if($duration)
                <span class="flex items-center gap-1">
                    <i class="fas fa-clock text-blue-400"></i> {{ $duration }}
                </span>
            @endif
            @if($level)
                <span class="flex items-center gap-1">
                    <i class="fas fa-signal text-blue-400"></i> {{ $level }}
                </span>
            @endif
        </div>

        {{-- Slot (extra content) --}}
        {{ $slot }}

        {{-- CTA --}}
        @if($showAction)
            <a href="{{ $actionUrl }}"
               class="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                      bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold
                      transition-colors shadow-sm hover:shadow">
                {{ $actionLabel }}
                <i class="fas fa-arrow-right text-[10px]"></i>
            </a>
        @endif
    </div>
</div>
