<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('badge')->nullable(); // e.g. "Triple-Lens Flagship", "New", "Cinematic 8K"
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->longText('description')->nullable();
            $table->json('overview_features')->nullable(); // Key standout bullet points with stats
            $table->json('specs')->nullable(); // Detailed specifications (flight time, sensor, camera, range)
            $table->json('hotspots')->nullable(); // 3D coordinates + info for interactive viewer
            $table->json('colors')->nullable(); // Colorway variants
            $table->string('thumbnail_url')->nullable();
            $table->json('gallery')->nullable();
            $table->string('model_3d_type')->default('quadcopter_flagship');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_hero')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
