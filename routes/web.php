<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CompareController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupportController;
use Illuminate\Support\Facades\Route;

// Public Showcase Routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Products & 3D Interactive Showcase
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Compare Specs
Route::get('/compare', [CompareController::class, 'index'])->name('compare');

// News & Innovation Stories
Route::get('/news', [PostController::class, 'index'])->name('news.index');
Route::get('/news/{slug}', [PostController::class, 'show'])->name('news.show');

// Company & Support
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/support', [SupportController::class, 'index'])->name('support');

// Contact & Lead Submissions
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Newsletter Subscription
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');
