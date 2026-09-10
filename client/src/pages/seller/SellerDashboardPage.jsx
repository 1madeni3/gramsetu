import React, { useState } from 'react';
import {
  TrendingUp, ShoppingBag, Package, Star, PlusCircle, Mic,
  CheckCircle2, Clock, AlertCircle, ArrowUpRight, Filter, Search,
  Edit, Trash2, Eye, Truck, UserCheck, ShieldCheck, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useLanguage } from '../../context/LanguageContext';
import SellerSidebar from '../../components/dashboard/SellerSidebar';
import VerifiedBadge from '../../components/common/VerifiedBadge';

const SellerDashboardPage = ({ setActivePage, openVoiceModal, defaultTab = 'overview' }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { products, orders, addNewProduct, updateProduct, deleteProduct, updateOrderStatus } = useMarketplace();

  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [productFilter, setProductFilter] = useState('all');

  // Filter products belonging to this seller (or fallback to sample seller products)
  const myProducts = products.filter(
    p => p.sellerId === (user?.sellerId || 'seller-1') || p.sellerName?.includes("Nitin")
  );

  // Seller orders
  const myOrders = orders;

  // Add Product Form State
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'agriculture',
    description: '',
    price: '',
    quantity: '',
    unit: 'kg',
    village: user?.village || 'Dindori',
    district: user?.district || 'Nashik',
    state: user?.state || 'Maharashtra',
    deliveryInfo: 'Dispatched directly from farm in ventilated packaging within 24 hours.',
    isOrganic: true,
    imageOption: 'wheat'
  });

  const [formSavedDraft, setFormSavedDraft] = useState(false);
  const [formPublished, setFormPublished] = useState(false);

  const handleAddProductSubmit = (isDraft = false) => {
    if (!newProductForm.name || !newProductForm.price) {
      alert("Please enter product name and price");
      return;
    }

    if (isDraft) {
      setFormSavedDraft(true);
      setTimeout(() => setFormSavedDraft(false), 3000);
      return;
    }

    const imageMap = {
      wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      craft: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
      honey: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'
    };

    addNewProduct({
      name: newProductForm.name,
      category: newProductForm.category,
      description: newProductForm.description || "Farm fresh rural produce harvested with care.",
      price: Number(newProductForm.price),
      quantity: Number(newProductForm.quantity || 20),
      stock: Number(newProductForm.quantity || 20),
      unit: newProductForm.unit,
      village: newProductForm.village,
      district: newProductForm.district,
      state: newProductForm.state,
      deliveryInfo: newProductForm.deliveryInfo,
      isOrganic: newProductForm.isOrganic,
      sellerId: user?.sellerId || 'seller-1',
      sellerName: user?.sellerProfile?.name || user?.name || 'Nitin Imade Kisan Sahakari Group',
      images: [imageMap[newProductForm.imageOption] || imageMap.wheat]
    });

    setFormPublished(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      setFormPublished(false);
      setCurrentTab('products');
    }, 1500);
  };

  // Weekly Sales Chart Data
  const weeklyData = [
    { day: "Mon", amount: 2400, orders: 4 },
    { day: "Tue", amount: 3800, orders: 7 },
    { day: "Wed", amount: 4200, orders: 8 },
    { day: "Thu", amount: 2900, orders: 5 },
    { day: "Fri", amount: 5400, orders: 11 },
    { day: "Sat", amount: 4800, orders: 9 },
    { day: "Sun", amount: 2100, orders: 4 }
  ];
  const maxWeekly = Math.max(...weeklyData.map(d => d.amount));

  // Monthly Revenue Data
  const monthlyData = [
    { month: "Apr", rev: 14200 },
    { month: "May", rev: 16800 },
    { month: "Jun", rev: 19500 },
    { month: "Jul", rev: 21000 },
    { month: "Aug", rev: 22800 },
    { month: "Sep", rev: 24500 }
  ];
  const maxMonthly = Math.max(...monthlyData.map(d => d.rev));

  return (
    <div className="flex min-h-screen bg-[#F8FAF5]">
      {/* Sidebar */}
      <SellerSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setActivePage={setActivePage}
        openVoiceModal={openVoiceModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl text-stone-900">
                {currentTab === 'overview' && "Producer Studio Dashboard"}
                {currentTab === 'products' && "My Listed Products"}
                {currentTab === 'add-product' && "Add New Rural Product"}
                {currentTab === 'orders' && "Manage Incoming Orders"}
                {currentTab === 'customers' && "Customer Network & Village Buyers"}
                {currentTab === 'earnings' && "Direct Bank & UPI Payouts"}
                {currentTab === 'reviews' && "Customer Reviews & Ratings"}
                {currentTab === 'profile' && "Producer Verification & Profile"}
                {currentTab === 'settings' && "Store & Notification Settings"}
              </h1>
              <VerifiedBadge size="sm" />
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Logged in as: <strong className="text-stone-800">{user?.sellerProfile?.name || user?.name || "Nitin Imade Kisan Sahakari"}</strong> • 📍 {user?.village || "Dindori"}, {user?.district || "Nashik"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openVoiceModal}
              className="btn-accent text-xs py-2 px-3.5 shadow-sm font-bold flex items-center gap-1.5"
            >
              <Mic className="w-3.5 h-3.5 text-[#176B3A]" />
              <span>🎤 Sell with Voice</span>
            </button>

            <button
              onClick={() => setCurrentTab('add-product')}
              className="btn-primary text-xs py-2 px-3.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* 1. OVERVIEW TAB */}
        {currentTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* 4 Key Metric Cards (Requirement: Total Sales ₹24,500, Orders 48, Products 12, Rating 4.8) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Total Sales */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500">Total Sales</span>
                  <div className="w-8 h-8 rounded-xl bg-[#E8F5ED] text-[#176B3A] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-extrabold text-2xl text-stone-900">
                    ₹24,500
                  </span>
                  <span className="text-[11px] font-bold text-[#176B3A] bg-[#E8F5ED] px-1.5 py-0.5 rounded">
                    +18% MoM
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">Direct to Bank A/C • 0% Cut</p>
              </div>

              {/* Card 2: Orders */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500">Total Orders</span>
                  <div className="w-8 h-8 rounded-xl bg-[#FEF7E7] text-[#E5A932] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-extrabold text-2xl text-stone-900">
                    48
                  </span>
                  <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">
                    3 In Progress
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">100% On-time rural delivery</p>
              </div>

              {/* Card 3: Products */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500">Active Products</span>
                  <div className="w-8 h-8 rounded-xl bg-[#F0F9ED] text-[#4F9D45] flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-extrabold text-2xl text-stone-900">
                    {myProducts.length > 0 ? myProducts.length : 12}
                  </span>
                  <span className="text-[11px] font-bold text-[#176B3A] bg-[#E8F5ED] px-1.5 py-0.5 rounded">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">Wheat, Tomatoes, Honey, Ghee</p>
              </div>

              {/* Card 4: Rating */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500">Seller Rating</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#F4B942] flex items-center justify-center">
                    <Star className="w-4 h-4 fill-[#F4B942]" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-extrabold text-2xl text-stone-900">
                    4.8 ⭐
                  </span>
                  <span className="text-[11px] font-bold text-stone-500">
                    124 Reviews
                  </span>
                </div>
                <p className="text-[11px] text-[#176B3A] font-semibold mt-1">Top Rated Rural Producer</p>
              </div>
            </div>

            {/* Visual Charts: Weekly Sales & Monthly Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Sales Chart */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-stone-900">Weekly Sales Performance</h3>
                    <p className="text-[11px] text-stone-500">Revenue per day (Current Week)</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#176B3A]">₹25,600 this week</span>
                </div>

                {/* SVG Bar Chart */}
                <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                  {weeklyData.map((d, idx) => {
                    const heightPct = Math.round((d.amount / maxWeekly) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <span className="text-[10px] font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{d.amount}
                        </span>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className="w-full bg-[#176B3A] hover:bg-[#F4B942] rounded-t-lg transition-all shadow-sm"
                          title={`${d.day}: ₹${d.amount} (${d.orders} orders)`}
                        ></div>
                        <span className="text-[10px] font-semibold text-stone-500">{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Revenue Chart */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-stone-900">Monthly Revenue Growth</h3>
                    <p className="text-[11px] text-stone-500">Direct village sales since launch</p>
                  </div>
                  <span className="text-xs font-bold text-[#4F9D45] bg-[#F0F9ED] px-2 py-0.5 rounded">
                    +72% Growth
                  </span>
                </div>

                {/* SVG Line / Bar Chart */}
                <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                  {monthlyData.map((m, idx) => {
                    const heightPct = Math.round((m.rev / maxMonthly) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <span className="text-[10px] font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{(m.rev / 1000).toFixed(1)}k
                        </span>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className="w-full bg-[#4F9D45] hover:bg-[#176B3A] rounded-t-lg transition-all shadow-sm"
                          title={`${m.month}: ₹${m.rev}`}
                        ></div>
                        <span className="text-[10px] font-semibold text-stone-500">{m.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Best Selling Products & Recent Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Best Selling Products (8 cols) */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-display font-bold text-sm text-stone-900">
                    Best-Selling Products
                  </h3>
                  <button
                    onClick={() => setCurrentTab('products')}
                    className="text-xs font-semibold text-[#176B3A] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-stone-400 font-semibold border-b border-stone-100">
                        <th className="pb-2">Product</th>
                        <th className="pb-2">Category</th>
                        <th className="pb-2">Price</th>
                        <th className="pb-2">Units Sold</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {myProducts.slice(0, 4).map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50/80">
                          <td className="py-2.5 flex items-center gap-2">
                            <img
                              src={p.images?.[0]}
                              alt={p.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                            <span className="font-semibold text-stone-800 line-clamp-1">{p.name}</span>
                          </td>
                          <td className="py-2.5 text-stone-500 uppercase text-[10px] font-bold">
                            {p.category}
                          </td>
                          <td className="py-2.5 font-bold text-[#176B3A]">
                            ₹{p.price} / {p.unit}
                          </td>
                          <td className="py-2.5 text-stone-700 font-semibold">
                            {p.stock > 100 ? 142 : 38} {p.unit}
                          </td>
                          <td className="py-2.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5ED] text-[#176B3A]">
                              In Stock
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions & Voice Listing Card (4 cols) */}
              <div className="lg:col-span-4 bg-[#FEF7E7] p-6 rounded-2xl border-2 border-[#F4B942] space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#176B3A] text-white flex items-center justify-center mb-3 shadow">
                    <Mic className="w-5 h-5 text-[#F4B942]" />
                  </div>
                  <h3 className="font-display font-bold text-base text-stone-900">
                    Voice Product Listing
                  </h3>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    Have new harvest ready? Just speak into your microphone in Hindi, Marathi, or English. We'll generate your product card automatically.
                  </p>
                </div>

                <button
                  onClick={openVoiceModal}
                  className="w-full btn-accent text-xs font-bold py-2.5 shadow-md flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4 text-[#176B3A]" />
                  Speak to Add Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. MY PRODUCTS TAB */}
        {currentTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-stone-500">Filter:</span>
                {['all', 'agriculture', 'produce', 'dairy', 'handicrafts'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProductFilter(cat)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition-colors ${
                      productFilter === cat
                        ? 'bg-[#176B3A] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-stone-500 font-medium">
                Total Products: <strong>{myProducts.length}</strong>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-soft">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Product Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {myProducts
                    .filter(p => productFilter === 'all' || p.category === productFilter)
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/60">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={p.images?.[0]}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                          />
                          <div>
                            <h4 className="font-bold text-stone-900 text-xs">{p.name}</h4>
                            <p className="text-[11px] text-stone-500">📍 {p.village}, {p.district}</p>
                          </div>
                        </td>
                        <td className="p-4 uppercase text-[10px] font-bold text-stone-600">
                          {p.category}
                        </td>
                        <td className="p-4 font-extrabold text-[#176B3A] text-sm">
                          ₹{p.price} / {p.unit}
                        </td>
                        <td className="p-4 font-semibold text-stone-700">
                          {p.stock} {p.unit}
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-stone-800">★ {p.rating}</span>
                          <span className="text-stone-400 text-[10px] ml-1">({p.reviewsCount})</span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              updateProduct(p.id, { isAvailable: !p.isAvailable });
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                              p.isAvailable
                                ? 'border-[#176B3A] text-[#176B3A] hover:bg-[#E8F5ED]'
                                : 'border-rose-300 text-rose-600 hover:bg-rose-50'
                            }`}
                          >
                            {p.isAvailable ? "Active" : "Paused"}
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ADD PRODUCT TAB */}
        {currentTab === 'add-product' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft max-w-3xl space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-display font-extrabold text-xl text-stone-900">
                List a New Rural Product
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Simple and seller-friendly. Fill details below or use our voice tool.
              </p>
            </div>

            {formSavedDraft && (
              <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold">
                ✓ Product saved to drafts!
              </div>
            )}

            {formPublished && (
              <div className="p-3 bg-[#E8F5ED] text-[#176B3A] border border-[#176B3A]/30 rounded-xl text-xs font-semibold">
                ✓ Product published live to GramSetu marketplace!
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Organic Sharbati Wheat or Fresh Tomatoes"
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  >
                    <option value="agriculture">🌾 Agriculture</option>
                    <option value="produce">🥬 Fresh Produce</option>
                    <option value="dairy">🥛 Dairy & Livestock</option>
                    <option value="handicrafts">🧺 Handicrafts & Art</option>
                    <option value="organic">🌱 Organic Products</option>
                    <option value="homemade">🍯 Homemade Delicacies</option>
                    <option value="clothing">👕 Handloom & Khadi</option>
                    <option value="services">🔧 Village Services</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="45"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Unit *</label>
                  <select
                    value={newProductForm.unit}
                    onChange={(e) => setNewProductForm({ ...newProductForm, unit: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal (100 kg)</option>
                    <option value="liter">liter</option>
                    <option value="piece">piece</option>
                    <option value="dozen">dozen</option>
                    <option value="bottle (500g)">bottle (500g)</option>
                    <option value="pack (500g)">pack (500g)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stock Quantity Available *</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={newProductForm.quantity}
                    onChange={(e) => setNewProductForm({ ...newProductForm, quantity: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Sample Photo Template</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: 'wheat', label: '🌾 Wheat / Grain' },
                    { id: 'tomato', label: '🥬 Tomato / Veg' },
                    { id: 'dairy', label: '🥛 Dairy' },
                    { id: 'craft', label: '🧺 Craft' },
                    { id: 'honey', label: '🍯 Honey' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNewProductForm({ ...newProductForm, imageOption: opt.id })}
                      className={`p-2 rounded-xl border text-center font-semibold text-[11px] transition-all ${
                        newProductForm.imageOption === opt.id
                          ? 'border-[#176B3A] bg-[#E8F5ED] text-[#176B3A]'
                          : 'border-stone-200 bg-stone-50 text-stone-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Describe your crop or craft, farming methods used, harvest date, freshness..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Village</label>
                  <input
                    type="text"
                    value={newProductForm.village}
                    onChange={(e) => setNewProductForm({ ...newProductForm, village: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">District</label>
                  <input
                    type="text"
                    value={newProductForm.district}
                    onChange={(e) => setNewProductForm({ ...newProductForm, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={newProductForm.state}
                    onChange={(e) => setNewProductForm({ ...newProductForm, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Delivery & Packaging Options</label>
                <input
                  type="text"
                  value={newProductForm.deliveryInfo}
                  onChange={(e) => setNewProductForm({ ...newProductForm, deliveryInfo: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                />
              </div>

              {/* Action Buttons (Save Draft & Publish Product) */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => handleAddProductSubmit(true)}
                  className="btn-outline text-xs"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleAddProductSubmit(false)}
                  className="btn-primary text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Publish Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. ORDERS TAB */}
        {currentTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-stone-900">
                Incoming Customer Orders ({myOrders.length})
              </h3>
              <span className="text-xs text-[#176B3A] font-semibold bg-[#E8F5ED] px-3 py-1 rounded-full">
                Auto-assigned to Rural Dispatch
              </span>
            </div>

            <div className="space-y-4">
              {myOrders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#176B3A]">#{ord.id}</span>
                      <span className="text-stone-400 text-xs ml-2">Ordered on {ord.createdAt?.slice(0, 10)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-stone-800">
                        Total: <strong className="text-[#176B3A] text-sm">₹{ord.total}</strong> ({ord.paymentMethod})
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5ED] text-[#176B3A]">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <h5 className="font-bold text-stone-700 mb-1">Products in Order:</h5>
                      {ord.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 py-1">
                          <span className="font-semibold text-stone-800">{item.name}</span>
                          <span className="text-stone-500">x {item.quantity} {item.unit || 'kg'}</span>
                          <span className="font-bold text-[#176B3A]">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-stone-50 p-3 rounded-xl">
                      <h5 className="font-bold text-stone-700 mb-1">Delivery Destination:</h5>
                      <p className="text-stone-600">{ord.deliveryAddress?.name} • {ord.deliveryAddress?.phone}</p>
                      <p className="text-stone-500">{ord.deliveryAddress?.address}, {ord.deliveryAddress?.village}, {ord.deliveryAddress?.district}</p>
                    </div>
                  </div>

                  {/* Status update controls */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs border-t border-stone-100">
                    <span className="font-semibold text-stone-600">Update Shipment Stage:</span>
                    <div className="flex gap-2">
                      {["Seller Accepted", "Product Ready", "Out for Delivery", "Delivered"].map((st) => (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(ord.id, st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                            ord.status === st
                              ? 'bg-[#176B3A] text-white'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. EARNINGS TAB */}
        {currentTab === 'earnings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">Direct Earnings & Payouts</h3>
                <p className="text-xs text-stone-500">100% of purchase value directly deposited to your bank account.</p>
              </div>
              <span className="text-xs font-extrabold text-[#176B3A] bg-[#E8F5ED] px-3 py-1 rounded-full">
                Verified Bank A/C Connected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200">
                <span className="text-xs text-stone-500">Settled to Bank (30 Days)</span>
                <p className="font-display font-extrabold text-2xl text-[#176B3A] mt-1">₹24,500</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200">
                <span className="text-xs text-stone-500">Pending Next Settlement</span>
                <p className="font-display font-extrabold text-2xl text-stone-800 mt-1">₹1,450</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200">
                <span className="text-xs text-stone-500">Middleman Commission Deducted</span>
                <p className="font-display font-extrabold text-2xl text-[#4F9D45] mt-1">₹0 (0%)</p>
              </div>
            </div>

            <div className="text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl space-y-1">
              <p className="font-bold text-stone-800">Linked Bank Account:</p>
              <p>State Bank of India (Dindori Branch) • A/C No: ••••••••4821</p>
              <p>UPI ID: <strong className="text-[#176B3A]">nitin.imade@sbi</strong></p>
            </div>
          </div>
        )}

        {/* 6. REVIEWS TAB */}
        {currentTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-stone-900">
              Community Reviews for Your Farm Products
            </h3>
            <div className="space-y-4 divide-y divide-stone-100">
              {[
                { name: "Amit Kulkarni", rating: 5, date: "04 Sep 2026", text: "Outstanding Sharbati wheat! Clean grains, puffed up softly, no stones." },
                { name: "Meena Joshi", rating: 5, date: "28 Aug 2026", text: "Fresh farm tomatoes were juicy and delicious. Prompt delivery to Nashik road." }
              ].map((rev, idx) => (
                <div key={idx} className="pt-4 first:pt-0 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">{rev.name}</span>
                    <span className="text-stone-400">{rev.date}</span>
                  </div>
                  <div className="text-[#F4B942]">{"★".repeat(rev.rating)}</div>
                  <p className="text-stone-700">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. PROFILE & SETTINGS TAB */}
        {(currentTab === 'profile' || currentTab === 'settings' || currentTab === 'customers') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-stone-900">
              {currentTab === 'profile' ? "Verified Producer Profile" : currentTab === 'customers' ? "Regular Village Customers" : "Store Settings"}
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#176B3A] text-white flex items-center justify-center font-bold text-xl">
                  {user?.name?.charAt(0) || 'R'}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{user?.sellerProfile?.name || user?.name}</h4>
                  <p className="text-stone-500">📍 {user?.village || 'Dindori'}, {user?.district || 'Nashik'}, {user?.state || 'Maharashtra'}</p>
                  <span className="inline-flex items-center gap-1 text-[#176B3A] font-bold text-[10px] mt-0.5">
                    ✓ Verified Producer Credential #GS-PROD-4091
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-stone-500 block">Phone for Order Alerts:</span>
                  <strong className="text-stone-800">{user?.phone || '+91 98221 45091'}</strong>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-stone-500 block">Kisan Registration:</span>
                  <strong className="text-stone-800">Verified Farmer ID</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboardPage;
