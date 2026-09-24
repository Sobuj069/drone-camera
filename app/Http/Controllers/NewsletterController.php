<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255|unique:newsletter_subscribers,email',
        ], [
            'email.unique' => 'You are already subscribed to the AERO newsletter!',
        ]);

        NewsletterSubscriber::create([
            'email' => $validated['email'],
            'ip_address' => $request->ip(),
            'subscribed_at' => now(),
        ]);

        return back()->with('success', 'Thank you for subscribing! You will receive the latest product announcements and firmware updates.');
    }
}
