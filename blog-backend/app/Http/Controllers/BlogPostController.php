<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('user')->latest()->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        // dd($request);
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);

        $post = auth()->user()->blogPosts()->create($validatedData);
        return response()->json($post, 201);
    }

    public function show(BlogPost $blogPost)
    {
        return response()->json($blogPost);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
        ]);

        $blogPost->update($validatedData);
        return response()->json($blogPost);
    }

    public function destroy(BlogPost $blogPost)
    {
        // dd($blogPost);
        $blogPost->delete();
        return response()->json(null, 204);
    }
}
