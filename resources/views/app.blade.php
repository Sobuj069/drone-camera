<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'SM Shop — Premium Drones, Cameras & Tech Gadgets') }}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3">
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon.png?v=3">
        <link rel="shortcut icon" href="/favicon.ico?v=3">
        <link rel="apple-touch-icon" href="/favicon.png?v=3">

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="bg-white text-[#212121] text-[14px] leading-normal font-sans antialiased selection:bg-[#0070d5] selection:text-white min-h-screen flex flex-col overflow-x-hidden">
        @inertia
    </body>
</html>
