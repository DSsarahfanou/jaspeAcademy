@props(['items' => []])

{{-- Usage: <x-breadcrumb :items="[['label' => 'Dashboard', 'url' => route('...')], ['label' => 'Formations']]" /> --}}

@if(count($items) > 0)
<nav class="flex items-center gap-1 text-sm" aria-label="Fil d'ariane">
    @foreach($items as $index => $item)
        @if($index > 0)
            <i class="fas fa-chevron-right text-gray-300 text-xs"></i>
        @endif

        @if(isset($item['url']) && $index < count($items) - 1)
            <a href="{{ $item['url'] }}"
               class="text-gray-500 hover:text-blue-600 transition-colors font-medium truncate max-w-[140px]">
                {{ $item['label'] }}
            </a>
        @else
            <span class="text-gray-800 font-semibold truncate max-w-[180px]">
                {{ $item['label'] }}
            </span>
        @endif
    @endforeach
</nav>
@endif
