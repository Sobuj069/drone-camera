<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'shipping_address',
        'shipping_city',
        'shipping_division',
        'shipping_zip',
        'delivery_notes',
        'delivery_method',
        'payment_method',
        'transaction_id',
        'subtotal',
        'shipping_cost',
        'discount',
        'total',
        'status',
        'payment_status',
        'items_json',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'items_json' => 'array',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
