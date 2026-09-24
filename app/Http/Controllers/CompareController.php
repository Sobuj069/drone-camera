<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompareController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::with('category')->orderBy('order')->get();
        
        $selectedSlugs = explode(',', $request->query('items', 'aero-mavic-4-pro,aero-inspire-cinema-3,aero-neo-360'));
        $selectedProducts = Product::with('category')
            ->whereIn('slug', $selectedSlugs)
            ->get();

        return Inertia::render('Compare', [
            'allProducts' => $products,
            'selectedProducts' => $selectedProducts,
        ]);
    }
}
