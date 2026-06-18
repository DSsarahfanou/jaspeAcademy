@props([
    'id'    => 'modal',
    'title' => 'Confirmation',
    'size'  => 'md',
])

@php
    $sizeMap = [
        'sm' => 'max-w-sm',
        'md' => 'max-w-lg',
        'lg' => 'max-w-2xl',
        'xl' => 'max-w-4xl',
    ];
    $maxW = $sizeMap[$size] ?? $sizeMap['md'];
@endphp

<div x-data="{ open: false }"
     x-show="open"
     x-on:open-modal-{{ $id }}.window="open = true"
     x-on:close-modal-{{ $id }}.window="open = false"
     x-cloak
     class="fixed inset-0 z-50 flex items-center justify-center p-4"
     role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title-{{ $id }}">

    {{-- Backdrop --}}
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
         @click="open = false">
    </div>

    {{-- Panel --}}
    <div class="relative w-full {{ $maxW }} bg-white rounded-2xl shadow-2xl overflow-hidden"
         x-transition:enter="transition ease-out duration-250"
         x-transition:enter-start="opacity-0 scale-95 translate-y-4"
         x-transition:enter-end="opacity-100 scale-100 translate-y-0"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100 scale-100 translate-y-0"
         x-transition:leave-end="opacity-0 scale-95 translate-y-2"
         @click.stop>

        {{-- Header --}}
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 id="modal-title-{{ $id }}" class="text-base font-semibold text-gray-800">
                {{ $title }}
            </h3>
            <button @click="open = false"
                    class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400
                           hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <i class="fas fa-times text-sm"></i>
            </button>
        </div>

        {{-- Body --}}
        <div class="px-6 py-5">
            {{ $slot }}
        </div>

        {{-- Footer (si fourni) --}}
        @isset($footer)
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            {{ $footer }}
        </div>
        @endisset
    </div>
</div>
