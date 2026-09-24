<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Post;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $banners = Banner::where('is_active', true)
            ->orderBy('order')
            ->get();

        $featuredProducts = Product::with('category')
            ->orderBy('order')
            ->take(8)
            ->get();

        $showcaseProducts = Product::with('category')
            ->orderBy('order')
            ->take(4)
            ->get();

        $innovationPosts = Post::where('is_featured', true)
            ->orderBy('published_at', 'desc')
            ->take(2)
            ->get();

        $fieldCategories = Category::where('is_active', true)
            ->whereIn('slug', ['camera-drones', 'enterprise', 'agriculture'])
            ->orderBy('order')
            ->get();

        $flagship3dProduct = Product::where('slug', 'aero-mavic-4-pro')
            ->first() ?? Product::first();

        return Inertia::render('Home', [
            'banners' => $banners,
            'featuredProducts' => $featuredProducts,
            'showcaseProducts' => $showcaseProducts,
            'innovationPosts' => $innovationPosts,
            'fieldCategories' => $fieldCategories,
            'flagship3dProduct' => $flagship3dProduct,
        ]);
    }
}
