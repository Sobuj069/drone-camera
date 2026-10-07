<?php

namespace App\Filament\Auth;

use Filament\Pages\Auth\Login as BaseLogin;
use Illuminate\Contracts\Support\Htmlable;

class Login extends BaseLogin
{
    protected static string $view = 'filament.auth.login';

    public function getHeading(): string|Htmlable
    {
        return 'Welcome back';
    }

    public function getSubHeading(): string|Htmlable|null
    {
        return 'Sign in to manage your drones and cameras';
    }
}
