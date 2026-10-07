<x-filament-panels::page.simple>
    <link rel="stylesheet" href="{{ asset('css/admin-login.css') }}?v=2">
    <script>
        // Keep this page light (blue theme) even if the OS/browser prefers dark mode.
        (function () {
            const root = document.documentElement;
            const force = () => root.classList.contains('dark') && root.classList.remove('dark');
            force();
            new MutationObserver(force).observe(root, { attributes: true, attributeFilter: ['class'] });
        })();
    </script>

    <aside class="aero-hero" style="background-image: url('{{ asset('images/admin-login-drone.jpg') }}')">
        <div class="aero-hero__overlay"></div>
        <div class="aero-hero__content">
            <span class="aero-hero__badge">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Aerial Imaging Platform
            </span>
            <h2>See the world<br>from above.</h2>
            <p>Manage your drones, cameras and orders in one place.</p>
            <ul class="aero-hero__stats">
                <li><strong>4K</strong><span>Live feed</span></li>
                <li><strong>30 min</strong><span>Flight time</span></li>
                <li><strong>24/7</strong><span>Support</span></li>
            </ul>
        </div>
    </aside>

    @if (filament()->hasRegistration())
        <x-slot name="subheading">
            {{ __('filament-panels::pages/auth/login.actions.register.before') }}

            {{ $this->registerAction }}
        </x-slot>
    @endif

    {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::AUTH_LOGIN_FORM_BEFORE, scopes: $this->getRenderHookScopes()) }}

    <x-filament-panels::form id="form" wire:submit="authenticate">
        {{ $this->form }}

        <x-filament-panels::form.actions
            :actions="$this->getCachedFormActions()"
            :full-width="$this->hasFullWidthFormActions()"
        />
    </x-filament-panels::form>

    {{ \Filament\Support\Facades\FilamentView::renderHook(\Filament\View\PanelsRenderHook::AUTH_LOGIN_FORM_AFTER, scopes: $this->getRenderHookScopes()) }}
</x-filament-panels::page.simple>
