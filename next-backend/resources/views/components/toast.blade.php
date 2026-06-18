@if(session('success') || session('error') || session('info') || session('warning'))
<div x-data="{
        show: true,
        type: '{{ session('success') ? 'success' : (session('error') ? 'error' : (session('warning') ? 'warning' : 'info')) }}',
        message: '{{ addslashes(session('success') ?? session('error') ?? session('warning') ?? session('info')) }}'
     }"
     x-show="show"
     x-init="setTimeout(() => show = false, 5000)"
     x-transition:enter="transition ease-out duration-300"
     x-transition:enter-start="opacity-0 translate-y-4 scale-95"
     x-transition:enter-end="opacity-100 translate-y-0 scale-100"
     x-transition:leave="transition ease-in duration-200"
     x-transition:leave-start="opacity-100 translate-y-0 scale-100"
     x-transition:leave-end="opacity-0 translate-y-2 scale-95"
     x-cloak
     class="fixed bottom-5 right-5 z-[9999] max-w-sm w-full">

    <div class="flex items-start gap-3 bg-white rounded-xl shadow-xl border p-4"
         :class="{
             'border-green-200': type === 'success',
             'border-red-200':   type === 'error',
             'border-yellow-200':type === 'warning',
             'border-blue-200':  type === 'info'
         }">

        {{-- Icon --}}
        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
             :class="{
                 'bg-green-100 text-green-600':  type === 'success',
                 'bg-red-100 text-red-600':      type === 'error',
                 'bg-yellow-100 text-yellow-600':type === 'warning',
                 'bg-blue-100 text-blue-600':    type === 'info'
             }">
            <i class="fas text-sm"
               :class="{
                   'fa-check':          type === 'success',
                   'fa-times':          type === 'error',
                   'fa-exclamation':    type === 'warning',
                   'fa-info':           type === 'info'
               }"></i>
        </div>

        {{-- Text --}}
        <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800"
               :class="{
                   'text-green-800':  type === 'success',
                   'text-red-800':    type === 'error',
                   'text-yellow-800': type === 'warning',
                   'text-blue-800':   type === 'info'
               }">
                <span x-show="type === 'success'">Succès</span>
                <span x-show="type === 'error'">Erreur</span>
                <span x-show="type === 'warning'">Attention</span>
                <span x-show="type === 'info'">Information</span>
            </p>
            <p class="text-sm text-gray-600 mt-0.5 leading-snug" x-text="message"></p>
        </div>

        {{-- Progress bar + close --}}
        <button @click="show = false"
                class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
            <i class="fas fa-times text-xs"></i>
        </button>
    </div>

    {{-- Progress bar --}}
    <div class="mt-1 h-0.5 rounded-full overflow-hidden bg-gray-100">
        <div class="h-full rounded-full transition-all"
             :class="{
                 'bg-green-500':  type === 'success',
                 'bg-red-500':    type === 'error',
                 'bg-yellow-500': type === 'warning',
                 'bg-blue-500':   type === 'info'
             }"
             style="width: 100%; animation: shrink 5s linear forwards;"
             x-show="show">
        </div>
    </div>
</div>

<style>
    @keyframes shrink { from { width: 100% } to { width: 0% } }
</style>
@endif
