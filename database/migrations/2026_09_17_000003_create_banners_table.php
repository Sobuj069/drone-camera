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
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('badge')->nullable(); // e.g. "TRIPLE-LENS CAMERA DRONE"
            $table->string('title'); // e.g. "AERO MAVIC 4 PRO"
            $table->string('subtitle')->nullable(); // e.g. "Inspiration in Focus"
            $table->string('cta_text')->default('Learn More');
            $table->string('cta_link')->default('/products');
            $table->string('cta_secondary_text')->nullable()->default('Buy Now');
            $table->string('cta_secondary_link')->nullable();
            $table->string('image_url');
            $table->string('bg_video_url')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
