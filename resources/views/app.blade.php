<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'DJI - The World Leader in Camera Drones and Aerial Photography') }}</title>

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="bg-white text-[#212121] text-[14px] leading-normal font-sans antialiased selection:bg-[#0070d5] selection:text-white min-h-screen flex flex-col overflow-x-hidden">
        @inertia
    </body>
</html>
