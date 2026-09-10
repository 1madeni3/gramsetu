import React from 'react';
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft,
  ShieldCheck, Truck, Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartPage = ({ setActivePage, onViewDetails }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, deliveryFee, total } = useCart();
  const { t } = useLanguage();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#E8F5ED] text-[#176B3A] rounded-full flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-2xl text-stone-900">
            Your Rural Produce Basket is Empty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Discover fresh organic crops, traditional village handicrafts, and pure dairy directly from local producers.
          </p>
        </div>
        <button
          onClick={() => setActivePage('marketplace')}
          className="btn-primary text-xs px-6 py-3 font-semibold"
        >
          Explore Marketplace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <button
            onClick={() => setActivePage('marketplace')}
            className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
            Shopping Cart ({cartItems.length} items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-stone-500 hover:text-rose-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 divide-y divide-stone-100 shadow-soft overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-center gap-4">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-200 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
                  <h3 className="font-display font-bold text-sm text-stone-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center justify-center sm:justify-start gap-1">
                    <Store className="w-3 h-3 text-[#176B3A]" />
                    <span>{item.sellerName || "Nitin Imade Kisan Sahakari"}</span>
                  </p>
                  <p className="text-[11px] text-stone-400">
                    📍 {item.village}, {item.district}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-[#F8FAF5] overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-stone-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-stone-600 hover:bg-stone-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Unit Price & Subtotal */}
                <div className="text-center sm:text-right min-w-[90px]">
                  <span className="text-[11px] text-stone-400 block">
                    ₹{item.price}/{item.unit || 'kg'}
                  </span>
                  <span className="font-display font-extrabold text-base text-[#176B3A]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Direct Producer Guarantee */}
          <div className="p-4 rounded-2xl bg-[#E8F5ED] border border-[#176B3A]/20 flex items-center gap-3 text-xs text-stone-700">
            <ShieldCheck className="w-5 h-5 text-[#176B3A] shrink-0" />
            <span>
              <strong>Zero Middlemen:</strong> 100% of the produce value is transferred directly to the village farmers and artisans upon delivery.
            </span>
          </div>
        </div>

        {/* Order Summary & Checkout CTA (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-soft space-y-6">
          <h2 className="font-display font-bold text-base text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-stone-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#176B3A]" />
                Rural Express Logistics:
              </span>
              <span className="font-semibold text-stone-900">
                {deliveryFee === 0 ? (
                  <span className="text-[#176B3A] font-bold">FREE (Orders above ₹1000)</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-stone-900 text-sm">Total Payable:</span>
              <span className="font-display font-extrabold text-2xl text-[#176B3A]">
                ₹{total}
              </span>
            </div>
          </div>

          <button
            onClick={() => setActivePage('checkout')}
            className="w-full btn-primary text-xs py-3.5 font-bold shadow-md flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-center text-stone-400">
            Secure 256-Bit SSL • Direct Producer UPI / COD Available
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
