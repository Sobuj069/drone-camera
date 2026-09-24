<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Checkout');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:50',
            'shipping_address' => 'required|string|max:1000',
            'shipping_city' => 'required|string|max:100',
            'shipping_division' => 'nullable|string|max:100',
            'shipping_zip' => 'nullable|string|max:20',
            'delivery_notes' => 'nullable|string|max:1000',
            'delivery_method' => 'required|string',
            'payment_method' => 'required|string',
            'transaction_id' => 'nullable|string|max:100',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'subtotal' => 'required|numeric|min:0',
            'shipping_cost' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
        ]);

        $orderNumber = 'SM-' . strtoupper(Str::random(2)) . rand(10000, 99999);

        $order = Order::create([
            'order_number' => $orderNumber,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'shipping_address' => $validated['shipping_address'],
            'shipping_city' => $validated['shipping_city'],
            'shipping_division' => $validated['shipping_division'] ?? null,
            'shipping_zip' => $validated['shipping_zip'] ?? null,
            'delivery_notes' => $validated['delivery_notes'] ?? null,
            'delivery_method' => $validated['delivery_method'],
            'payment_method' => $validated['payment_method'],
            'transaction_id' => $validated['transaction_id'] ?? null,
            'subtotal' => $validated['subtotal'],
            'shipping_cost' => $validated['shipping_cost'] ?? 0,
            'discount' => $validated['discount'] ?? 0,
            'total' => $validated['total'],
            'status' => 'pending',
            'payment_status' => in_array($validated['payment_method'], ['bkash', 'nagad', 'rocket', 'card']) ? 'paid' : 'pending',
            'items_json' => $validated['items'],
        ]);

        foreach ($validated['items'] as $item) {
            $productId = is_numeric($item['id']) ? $item['id'] : null;
            if (!$productId && isset($item['slug'])) {
                $product = Product::where('slug', $item['slug'])->first();
                $productId = $product?->id;
            }

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $productId,
                'product_name' => $item['name'],
                'product_slug' => $item['slug'] ?? null,
                'thumbnail_url' => $item['thumbnail_url'] ?? $item['image_url'] ?? null,
                'color' => $item['color'] ?? null,
                'unit_price' => $item['price'],
                'quantity' => $item['quantity'],
                'total_price' => $item['price'] * $item['quantity'],
            ]);
        }

        return redirect()->route('order.confirmation', ['orderNumber' => $order->order_number])
            ->with('success', 'Your order has been placed successfully!');
    }
}
