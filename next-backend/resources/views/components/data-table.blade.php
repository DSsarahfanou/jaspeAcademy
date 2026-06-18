@props([
    'headers'    => [],
    'rows'       => [],
    'emptyLabel' => 'Aucun résultat trouvé.',
    'searchable' => true,
    'id'         => 'table',
])

<div x-data="{
    search: '',
    rows: {{ Js::from($rows) }},
    get filtered() {
        if (!this.search) return this.rows;
        const q = this.search.toLowerCase();
        return this.rows.filter(row =>
            Object.values(row).some(v => String(v).toLowerCase().includes(q))
        );
    }
}" class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

    {{-- Toolbar --}}
    @if($searchable)
    <div class="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
        <div class="relative flex-1 max-w-xs">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
            <input x-model="search"
                   type="text"
                   placeholder="Rechercher..."
                   class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none
                          focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all">
        </div>
        <span class="text-xs text-gray-400 whitespace-nowrap">
            <span x-text="filtered.length"></span> résultat(s)
        </span>
    </div>
    @endif

    {{-- Table --}}
    <div class="overflow-x-auto">
        <table class="w-full text-sm">
            <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                    @foreach($headers as $header)
                        <th class="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            {{ is_array($header) ? $header['label'] : $header }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                {{-- Static rows (non-searchable mode) --}}
                @if(!$searchable && count($rows) === 0)
                    <tr>
                        <td colspan="{{ count($headers) }}" class="px-5 py-12 text-center text-gray-400">
                            <div class="flex flex-col items-center gap-2">
                                <i class="fas fa-inbox text-3xl text-gray-200"></i>
                                <span class="text-sm">{{ $emptyLabel }}</span>
                            </div>
                        </td>
                    </tr>
                @else
                    {{ $slot }}
                @endif

                {{-- Alpine-driven empty state (searchable mode) --}}
                @if($searchable)
                    <template x-if="filtered.length === 0">
                        <tr>
                            <td colspan="{{ count($headers) }}" class="px-5 py-12 text-center text-gray-400">
                                <div class="flex flex-col items-center gap-2">
                                    <i class="fas fa-search text-3xl text-gray-200"></i>
                                    <span class="text-sm">{{ $emptyLabel }}</span>
                                </div>
                            </td>
                        </tr>
                    </template>
                @endif
            </tbody>
        </table>
    </div>
</div>
