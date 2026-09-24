<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = Post::orderBy('published_at', 'desc')->get();
        return Inertia::render('News', [
            'posts' => $posts,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        $relatedPosts = Post::where('id', '!=', $post->id)->take(2)->get();

        return Inertia::render('News/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
