<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'tagline',
        'subtitle',
        'badge',
        'price',
        'original_price',
        'description',
        'overview_features',
        'specs',
        'hotspots',
        'colors',
        'thumbnail_url',
        'gallery',
        'model_3d_type',
        'is_featured',
        'is_hero',
        'order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'overview_features' => 'array',
        'specs' => 'array',
        'hotspots' => 'array',
        'colors' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'is_hero' => 'boolean',
        'order' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
