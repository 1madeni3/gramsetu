import React, { useState } from 'react';
import {
  ShoppingBag, Heart, Store, Star, MapPin, User, Settings,
  CheckCircle2, Clock, Truck, ChevronRight, ArrowRight, Package
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';
import BuyerSidebar from '../../components/dashboard/BuyerSidebar';

const BuyerDashboardPage = ({ setActivePage, onTrackOrder }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { orders } = useMarketplace();

  const [currentTab, setCurrentTab] = useState('orders');

  const buyerOrders = orders; // Show available orders for easy tracking

  const wishlistSample = [
    {
      id: "prod-3",
      name: "Handmade Bamboo Storage Basket",
      price: 350,
      unit: "piece",
      village: "Ranti",
      district: "Madhubani",
      image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "prod-4",
      name: "Raw Sahyadri Wild Forest Honey",
      price: 280,
      unit: "bottle (500g)",
      village: "Tapola",
      district: "Satara",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAF5]">
      {/* Buyer Sidebar */}
      <BuyerSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setActivePage={setActivePage}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-stone-900">
              {currentTab === 'orders' && "My Orders & Deliveries"}
              {currentTab === 'wishlist' && "Saved Village Favorites"}
              {currentTab === 'saved-sellers' && "My Direct Producers"}
              {currentTab === 'reviews' && "My Reviews & Feedback"}
              {currentTab === 'addresses' && "Saved Delivery Addresses"}
              {currentTab === 'profile' && "Buyer Profile"}
              {currentTab === 'settings' && "Account Settings"}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Welcome back, <strong className="text-stone-800">{user?.name || "Aditya Shivale"}</strong>
            </p>
          </div>

          <button
            onClick={() => setActivePage('marketplace')}
            className="btn-primary text-xs self-start sm:self-auto"
          >
            Explore More Fresh Produce
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. ORDERS TAB (With 5-step status timeline: Order Placed → Accepted → Preparing → Out for Delivery → Delivered) */}
        {currentTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            {buyerOrders.map((ord) => {
              const statusSteps = [
                "Order Placed",
                "Seller Accepted",
                "Product Ready",
                "Out for Delivery",
                "Delivered"
              ];
              const currentStepIdx = statusSteps.indexOf(ord.status);

              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-extrabold text-base text-[#176B3A]">
                          #{ord.id}
                        </span>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#E8F5ED] text-[#176B3A]">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Ordered on {ord.createdAt?.slice(0, 10)} • Paid via {ord.paymentMethod}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-left sm:text-right">
                        <span className="text-xs text-stone-500 block">Total Amount:</span>
                        <span className="font-display font-extrabold text-lg text-stone-900">
                          ₹{ord.total}
                        </span>
                      </div>
                      <button
                        onClick={() => onTrackOrder(ord.id)}
                        className="btn-outline text-xs py-2 px-3 font-semibold"
                      >
                        Live Tracking
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 5-Step Order Status Timeline */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Order Progress
                    </span>
                    <div className="grid grid-cols-5 gap-2 relative">
                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center space-y-1.5">
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone
                                  ? 'bg-[#176B3A] text-white shadow-sm'
                                  : 'bg-stone-100 text-stone-400 border border-stone-200'
                              } ${isCurrent ? 'ring-4 ring-[#176B3A]/20' : ''}`}
                            >
                              {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span
                              className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${
                                isDone ? 'text-[#176B3A]' : 'text-stone-400'
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Products in this order */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      Purchased Items
                    </span>
                    <div className="divide-y divide-stone-100">
                      {ord.items?.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80"}
                              alt={item.name}
                              className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                            />
                            <div>
                              <h4 className="font-bold text-stone-800">{item.name}</h4>
                              <p className="text-[11px] text-stone-500">
                                Seller: {item.sellerName || "Nitin Imade Kisan Sahakari Group"}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-semibold text-stone-700">
                              {item.quantity} {item.unit || 'kg'} × ₹{item.price}
                            </span>
                            <span className="block font-bold text-[#176B3A]">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. WISHLIST TAB */}
        {currentTab === 'wishlist' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistSample.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex gap-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-xs text-stone-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">📍 {item.village}, {item.district}</p>
                    <span className="font-bold text-sm text-[#176B3A]">₹{item.price}</span>
                    <button
                      onClick={() => setActivePage('marketplace')}
                      className="block text-[11px] text-[#176B3A] font-semibold hover:underline"
                    >
                      View in Marketplace →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SAVED SELLERS */}
        {currentTab === 'saved-sellers' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1628272107134-c66c4b580952?auto=format&fit=crop&w=400&q=80"
                  alt="Nitin Imade"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#176B3A]"
                />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">Nitin Imade Kisan Sahakari Group</h4>
                  <p className="text-[11px] text-stone-500">Dindori, Nashik • Sharbati Wheat, Tomatoes</p>
                  <span className="text-[10px] font-bold text-[#176B3A]">✓ Verified Producer</span>
                </div>
              </div>
              <button
                onClick={() => setActivePage('marketplace')}
                className="btn-outline text-xs py-1.5 px-3"
              >
                Browse Farm
              </button>
            </div>
          </div>
        )}

        {/* 4. ADDRESSES & PROFILE */}
        {(currentTab === 'addresses' || currentTab === 'profile' || currentTab === 'settings' || currentTab === 'reviews') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-4 animate-fadeIn">
            <h3 className="font-display font-bold text-base text-stone-900">
              {currentTab === 'addresses' ? "Delivery Addresses" : "Account Information"}
            </h3>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
              <p className="font-bold text-stone-800">{user?.name || "Aditya Shivale"}</p>
              <p className="text-stone-600">{user?.phone || "+91 98200 12345"}</p>
              <p className="text-stone-600">{user?.address || "Flat 402, Green View Society, Gangapur Road, Nashik 422013"}</p>
              <p className="text-[11px] text-[#176B3A] font-semibold mt-1">Default Address for Rural Express</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyerDashboardPage;
