import React, { useState } from 'react';
import {
  ArrowLeft, CheckCircle2, Clock, Truck, MapPin, Phone,
  ShieldCheck, Package, Store, Navigation, Search, AlertCircle
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import VerifiedBadge from '../components/common/VerifiedBadge';

const OrderTrackingPage = ({ orderId, setActivePage }) => {
  const { orders } = useMarketplace();
  const { t } = useLanguage();

  const [searchId, setSearchId] = useState(orderId || 'GS10245');

  const currentOrder = orders.find(
    o => o.id.toLowerCase() === searchId.toLowerCase().trim()
  ) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const steps = [
    { label: "Order Placed", desc: "Order confirmed by buyer with verified producer" },
    { label: "Seller Accepted", desc: "Farmer confirmed harvest & packing capacity" },
    { label: "Product Ready", desc: "Harvest cleaned, bagged, and labeled" },
    { label: "Out for Delivery", desc: "Assigned to GramSetu Rural Express Logistics" },
    { label: "Delivered", desc: "Delivered at doorstep with OTP verification" }
  ];

  const currentStatusIdx = steps.findIndex(s => s.label === currentOrder?.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => setActivePage('marketplace')}
          className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
          Live Order Tracking
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Follow your rural produce from village harvest to your doorstep
        </p>
      </div>

      {/* Order Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Order ID (e.g. GS10245 or GS10244)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <button type="submit" className="btn-primary text-xs px-4">
          Track
        </button>
      </form>

      {/* Main Tracking Card */}
      {currentOrder ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-8 animate-fadeIn">
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#F8FAF5] border border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-lg text-[#176B3A]">
                  #{currentOrder.id}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E8F5ED] text-[#176B3A] border border-[#176B3A]/20">
                  {currentOrder.status}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Estimated Delivery: <strong className="text-stone-800">{currentOrder.trackingDetails?.estimatedDelivery || "Today, 5:00 PM"}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-500 block">Total Amount Paid</span>
              <span className="font-display font-extrabold text-xl text-stone-900">
                ₹{currentOrder.total}
              </span>
              <span className="block text-[10px] text-stone-400">via {currentOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Timeline Visual (Order Placed -> Seller Accepted -> Product Ready -> Out for Delivery -> Delivered) */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              Shipment Journey
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-stone-200 ml-4 my-4">
              {currentOrder.timeline?.map((step, idx) => {
                const isCompleted = step.completed;
                const isCurrent = currentOrder.status === step.status;

                return (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-[#176B3A] text-white shadow-sm'
                          : 'bg-white border-2 border-stone-300 text-stone-400'
                      } ${isCurrent ? 'ring-4 ring-[#176B3A]/20 scale-110' : ''}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    {/* Step Info */}
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4
                          className={`font-bold text-xs sm:text-sm ${
                            isCompleted ? 'text-stone-900' : 'text-stone-400'
                          }`}
                        >
                          {step.status}
                        </h4>
                        <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics & Seller Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100 text-xs">
            {/* Courier info */}
            <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-800">
                <Truck className="w-4 h-4 text-[#176B3A]" />
                <span>Logistics Delivery Partner</span>
              </div>
              <p className="text-stone-700 font-semibold">{currentOrder.trackingDetails?.courier}</p>
              <p className="text-stone-500">
                Driver: <strong>{currentOrder.trackingDetails?.driverName}</strong> ({currentOrder.trackingDetails?.driverPhone})
              </p>
              <a
                href={`tel:${currentOrder.trackingDetails?.driverPhone}`}
                className="inline-flex items-center gap-1.5 text-[#176B3A] font-bold mt-1 hover:underline"
              >
                <Phone className="w-3 h-3" /> Call Delivery Driver
              </a>
            </div>

            {/* Destination info */}
            <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-800">
                <MapPin className="w-4 h-4 text-[#176B3A]" />
                <span>Delivery Address</span>
              </div>
              <p className="text-stone-700 font-semibold">{currentOrder.deliveryAddress?.name} ({currentOrder.deliveryAddress?.phone})</p>
              <p className="text-stone-500">
                {currentOrder.deliveryAddress?.address}, {currentOrder.deliveryAddress?.village}, {currentOrder.deliveryAddress?.district}, {currentOrder.deliveryAddress?.pincode}
              </p>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700">
              Items in this Shipment
            </h4>
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
              {currentOrder.items?.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80"}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-bold text-stone-800">{item.name}</p>
                      <p className="text-[11px] text-stone-500">Seller: {item.sellerName || "Nitin Imade Kisan Sahakari"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-stone-800">
                      {item.quantity} {item.unit || 'kg'} × ₹{item.price}
                    </span>
                    <span className="block font-extrabold text-[#176B3A]">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="font-bold text-base text-stone-800">Order Not Found</h3>
          <p className="text-xs text-stone-500">Please verify your order number (e.g. GS10245).</p>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
