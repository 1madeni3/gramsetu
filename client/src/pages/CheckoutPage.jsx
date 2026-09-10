import React, { useState } from 'react';
import {
  ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, QrCode,
  CreditCard, Banknote, Building2, Smartphone, MapPin, Truck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';

const CheckoutPage = ({ setActivePage, onOrderPlaced }) => {
  const { cartItems, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useMarketplace();

  const [address, setAddress] = useState({
    name: user?.name || 'Aditya Shivale',
    phone: user?.phone || '+91 98200 12345',
    address: user?.address || 'Flat 402, Green View Society, Gangapur Road',
    village: user?.village || 'Gangapur',
    district: user?.district || 'Nashik',
    pincode: user?.pincode || '422013',
    state: user?.state || 'Maharashtra'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Cash on Delivery', 'Card', 'Net Banking'
  const [upiApp, setUpiApp] = useState('gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.address) {
      alert("Please enter delivery address details.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        buyerName: address.name,
        buyerPhone: address.phone,
        buyerEmail: user?.email || 'aditya.shivale@gramsetu.in',
        deliveryAddress: address,
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
        paymentMethod
      });

      clearCart();
      setIsProcessing(false);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      if (onOrderPlaced) {
        onOrderPlaced(newOrder.id);
      } else {
        setActivePage('order-tracking');
      }
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-stone-500">Your cart is empty. Please add products first.</p>
        <button onClick={() => setActivePage('marketplace')} className="btn-primary text-xs">
          Browse Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => setActivePage('cart')}
          className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
          Fast & Secure Checkout
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Direct purchase from verified village producers
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Delivery Address & Payment Method (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <MapPin className="w-4 h-4 text-[#176B3A]" />
              <h2 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
                1. Delivery Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={address.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aditya Shivale"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Phone Number (for Delivery OTP) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98200 12345"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-700 mb-1">Street Address / House / Landmark *</label>
                <input
                  type="text"
                  name="address"
                  value={address.address}
                  onChange={handleInputChange}
                  placeholder="Flat No, Building name, Street"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Village / Town / City *</label>
                <input
                  type="text"
                  name="village"
                  value={address.village}
                  onChange={handleInputChange}
                  placeholder="Gangapur"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">District *</label>
                <input
                  type="text"
                  name="district"
                  value={address.district}
                  onChange={handleInputChange}
                  placeholder="Nashik"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  value={address.pincode}
                  onChange={handleInputChange}
                  placeholder="422013"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  placeholder="Maharashtra"
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Options */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <CreditCard className="w-4 h-4 text-[#176B3A]" />
              <h2 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
                2. Select Payment Option
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'UPI', label: 'UPI / QR Code', icon: Smartphone, subtitle: 'GPay, PhonePe, Paytm' },
                { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote, subtitle: 'Pay when delivered' },
                { id: 'Card', label: 'Debit / Credit Card', icon: CreditCard, subtitle: 'Visa, RuPay, MC' },
                { id: 'Net Banking', label: 'Net Banking', icon: Building2, subtitle: 'All Indian Banks' }
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = paymentMethod === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-2 border-[#176B3A] bg-[#E8F5ED]/40 text-[#176B3A] shadow-sm'
                        : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#176B3A]' : 'text-stone-500'}`} />
                    <div>
                      <h4 className="font-bold text-xs">{opt.label}</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">{opt.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* UPI Simulated Details */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200 flex flex-col sm:flex-row items-center gap-4 text-xs">
                {/* Simulated QR */}
                <div className="w-28 h-28 bg-white p-2 rounded-xl border border-stone-300 flex flex-col items-center justify-center text-center shadow-inner">
                  <QrCode className="w-16 h-16 text-[#176B3A]" />
                  <span className="text-[9px] font-bold text-stone-500">Scan via Any App</span>
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className="font-bold text-stone-800 block">Instant Direct UPI to Producer</span>
                  <p className="text-stone-500 text-[11px]">
                    UPI ID: <strong className="text-[#176B3A]">gramsetu.farmer@upi</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                    {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map((app, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded text-[10px] font-semibold border border-stone-200 shadow-xs">
                        ✓ {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Cash on Delivery' && (
              <div className="p-4 rounded-2xl bg-[#FEF7E7] border border-[#F4B942] text-xs text-stone-800 space-y-1">
                <span className="font-bold block">💵 Cash on Delivery Selected</span>
                <p className="text-[11px] text-stone-600">
                  Please keep exact cash ready upon arrival. GramSetu courier van will verify OTP before handing over products.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-soft space-y-6 h-fit sticky top-24">
          <h2 className="font-display font-bold text-base text-stone-900 pb-3 border-b border-stone-100">
            Order Review ({cartItems.length} items)
          </h2>

          <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto text-xs pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-stone-800 truncate">{item.name}</p>
                  <p className="text-[10px] text-stone-500">{item.quantity} {item.unit || 'kg'} × ₹{item.price}</p>
                </div>
                <span className="font-bold text-[#176B3A] shrink-0">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-800">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee:</span>
              <span className="font-semibold text-stone-800">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Total:</span>
              <span className="font-display font-extrabold text-xl text-[#176B3A]">₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full btn-primary py-3.5 text-xs font-bold shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Place Order & Pay ₹{total}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#176B3A] shrink-0" />
            <span>Simulated checkout demo for GramSetu platform.</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
