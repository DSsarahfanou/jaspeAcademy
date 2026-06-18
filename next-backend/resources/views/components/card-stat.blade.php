@props([
    'title'  => 'Statistique',
    'value'  => '0',
    'icon'   => 'fas fa-chart-bar',
    'change' => null,
    'color'  => 'blue',
    'suffix' => '',
    'link'   => null,
])

@php
    $colorMap = [
        'blue'   => ['bg' => 'bg-blue-50',   'icon' => 'bg-blue-100 text-blue-600',   'text' => 'text-blue-600',   'border' => 'border-blue-100'],
        'green'  => ['bg' => 'bg-green-50',  'icon' => 'bg-green-100 text-green-600',  'text' => 'text-green-600',  'border' => 'border-green-100'],
        'purple' => ['bg' => 'bg-purple-50', 'icon' => 'bg-purple-100 text-purple-600','text' => 'text-purple-600', 'border' => 'border-purple-100'],
        'orange' => ['bg' => 'bg-orange-50', 'icon' => 'bg-orange-100 text-orange-600','text' => 'text-orange-600', 'border' => 'border-orange-100'],
        'red'    => ['bg' => 'bg-red-50',    'icon' => 'bg-red-100 text-red-600',      'text' => 'text-red-600',    'border' => 'border-red-100'],
        'indigo' => ['bg' => 'bg-indigo-50', 'icon' => 'bg-indigo-100 text-indigo-600','text' => 'text-indigo-600', 'border' => 'border-indigo-100'],
    ];
    $c = $colorMap[$color] ?? $colorMap['blue'];
@endphp

<div class="bg-white rounded-xl border {{ $c['border'] }} shadow-sm hover:shadow-md transition-all duration-200 p-5 group {{ $link ? 'cursor-pointer' : '' }}"
     @if($link) onclick="window.location='{{ $link }}'" @endif>

    <div class="flex items-start justify-between">
        <div class="flex-1">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{{ $title }}</p>
            <p class="text-2xl font-bold text-gray-800 tracking-tight">
                {{ $value }}<span class="text-base font-medium text-gray-500 ml-0.5">{{ $suffix }}</span>
            </p>
            @if($change !== null)
                <div class="flex items-center gap-1 mt-1.5">
                    @php $isPositive = str_starts_with((string)$change, '+') || (is_numeric($change) && $change > 0); @endphp
                    <span class="flex items-center gap-0.5 text-xs font-semibold {{ $isPositive ? 'text-green-600' : 'text-red-500' }}">
                        <i class="fas {{ $isPositive ? 'fa-arrow-up' : 'fa-arrow-down' }} text-[10px]"></i>
                        {{ ltrim((string)$change, '+') }}
                    </span>
                    <span class="text-xs text-gray-400">vs mois précédent</span>
                </div>
            @endif
        </div>

        <div class="w-11 h-11 rounded-xl {{ $c['icon'] }} flex items-center justify-center flex-shrink-0
                    group-hover:scale-110 transition-transform duration-200">
            <i class="{{ $icon }} text-lg"></i>
        </div>
    </div>

    {{ $slot }}
</div>
