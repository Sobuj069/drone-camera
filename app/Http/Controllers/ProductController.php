<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $selectedCategory = $request->query('category');
        $search = $request->query('search');
        $sort = $request->query('sort', 'featured');

        $query = Product::with('category');

        if ($selectedCategory && $selectedCategory !== 'all') {
            $query->whereHas('category', function ($q) use ($selectedCategory) {
                $q->where('slug', $selectedCategory);
            });
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('tagline', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'featured':
            default:
                $query->orderBy('is_featured', 'desc')->orderBy('order');
                break;
        }

        $products = $query->get();
        $categories = Category::where('is_active', true)->withCount('products')->orderBy('order')->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'category' => $selectedCategory ?? 'all',
                'search' => $search ?? '',
                'sort' => $sort,
            ],
        ]);
    }

    public function show(string $slug): Response|\Illuminate\Http\RedirectResponse
    {
        $product = Product::with('category')->where('slug', $slug)->first();
        
        if (!$product) {
            // Try finding by id or partial slug match
            $product = Product::with('category')
                ->where('id', is_numeric($slug) ? (int)$slug : 0)
                ->orWhere('name', 'like', "%" . str_replace('-', ' ', $slug) . "%")
                ->first();
        }

        if (!$product) {
            // Fallback to the first featured product or redirect to catalog
            $product = Product::with('category')->where('is_featured', true)->first() ?: Product::with('category')->first();
        }

        if (!$product) {
            return redirect()->route('products.index');
        }
        
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(3)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
