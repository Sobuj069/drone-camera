<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function show(string $orderNumber): Response
    {
        $order = Order::with(['items.product'])->where('order_number', $orderNumber)->firstOrFail();

        return Inertia::render('OrderConfirmation', [
            'order' => $order,
        ]);
    }
}
