<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $recommendedProducts = Product::with('category')
            ->where('is_featured', true)
            ->take(4)
            ->get();

        return Inertia::render('Cart', [
            'recommendedProducts' => $recommendedProducts,
        ]);
    }
}
