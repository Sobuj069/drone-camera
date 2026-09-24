import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem('sm_gadgets_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const [toast, setToast] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('sm_gadgets_cart', JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }, [items]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const addToCart = (product, quantity = 1, selectedColor = null) => {
        if (!product) return;

        const colorName = selectedColor?.name || selectedColor || product.colors?.[0]?.name || 'Standard Edition';
        const cartItemId = `${product.id}-${colorName.replace(/\s+/g, '-').toLowerCase()}`;
        const image = product.thumbnail_url || product.gallery?.[0] || product.image_url || '/images/cards/card-dji-flip-hd.jpg';

        setItems((prevItems) => {
            const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex].quantity += quantity;
                return updated;
            } else {
                return [
                    ...prevItems,
                    {
                        cartItemId,
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        tagline: product.tagline || '',
                        price: parseFloat(product.price) || 0,
                        original_price: parseFloat(product.original_price) || parseFloat(product.price) || 0,
                        thumbnail_url: image,
                        image_url: image,
                        color: colorName,
                        quantity: quantity,
                    },
                ];
            }
        });

        showToast(`Added "${product.name}" to your cart!`);
    };

    const removeFromCart = (cartItemId) => {
        setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
        showToast('Item removed from cart', 'info');
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                subtotal,
                totalItems,
                toast,
                setToast,
                showToast,
            }}
        >
            {children}
            {/* Global Animated Quick Toast */}
            {toast && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-950/95 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{toast.message}</span>
                    <a
                        href="/cart"
                        className="ml-2 bg-[#0070d5] hover:bg-[#005bb5] text-white px-3 py-1 rounded-full text-xs font-semibold transition"
                    >
                        View Cart &rarr;
                    </a>
                </div>
            )}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
