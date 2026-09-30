import React from 'react';
import {
  ArrowRight, Mic, ShieldCheck, Sparkles, Truck, Users,
  CheckCircle2, Star, ShoppingBag, MapPin, HeartHandshake,
  Leaf, BadgePercent, QrCode, Store, Utensils
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import ProductCard from '../components/cards/ProductCard';
import CategoryCard from '../components/cards/CategoryCard';
import VerifiedBadge from '../components/common/VerifiedBadge';

const HomePage = ({ setActivePage, onViewDetails, openVoiceModal }) => {
  const { t } = useLanguage();
  const { products, categories, setSelectedCategory } = useMarketplace();

  const featuredProducts = products.slice(0, 4);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActivePage('marketplace');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION - BALANCED 50-50 FOR BUYERS & SELLERS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F5ED]/70 via-[#F8FAF5] to-[#F8FAF5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Dual Buyer + Seller Tag Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B3A]/10 text-[#176B3A] border border-[#176B3A]/20 text-xs font-bold">
                  <span>🛒 For Conscious Buyers</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF7E7] text-[#B87A00] border border-[#F4B942]/40 text-xs font-bold">
                  <span>🌾 For Rural Producers</span>
                </span>
              </div>

              {/* Large Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.15]">
                {t('tagline')}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-normal">
                GramSetu unites conscious households and rural producers on one trusted platform. Buyers receive 100% pure, farm-fresh harvest at honest prices, while farmers and artisans earn full value with zero middlemen commissions.
              </p>

              {/* Dual 50-50 Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActivePage('marketplace')}
                  className="btn-primary text-sm px-6 py-3.5 shadow-md hover:shadow-lg font-semibold flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Pure & Fresh Harvest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('become-seller')}
                  className="btn-outline text-sm px-6 py-3.5 font-semibold bg-white shadow-sm flex items-center gap-2"
                >
                  <Store className="w-4 h-4 text-[#176B3A]" />
                  <span>Sell with 0% Commission</span>
                </button>

                {/* Voice Listing CTA Chip */}
                <button
                  onClick={openVoiceModal}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FEF7E7] hover:bg-[#F4B942] text-[#1F2937] border border-[#F4B942] font-semibold text-xs transition-all shadow-sm active:scale-95"
                  title="Try Voice Listing"
                >
                  <div className="w-6 h-6 rounded-full bg-[#176B3A] text-white flex items-center justify-center">
                    <Mic className="w-3.5 h-3.5 text-[#F4B942]" />
                  </div>
                  <span>🎤 {t('sellWithVoice')}</span>
                </button>
              </div>

              {/* Quick Trust Credentials */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#176B3A]" />
                  <span>100% Direct Farm Traceability</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgePercent className="w-4 h-4 text-[#176B3A]" />
                  <span>Zero Middlemen Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#176B3A]" />
                  <span>Direct Panchayat Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Visual Representation - Dual Buyer & Seller Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80"
                    alt="Organic Farm Field GramSetu marketplace"
                    className="w-full h-96 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent"></div>

                  {/* Overlay Tag: Direct Farm Traceability for Buyers */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=150&q=80"
                        alt="Organic Wheat Grains"
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-bold text-xs text-stone-900">Sahyadri Jaivik Kisan FPC</h4>
                          <VerifiedBadge size="sm" />
                        </div>
                        <p className="text-[11px] text-stone-500">Nashik • Sharbati Wheat (Chemical Free)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#176B3A]">₹45/kg</span>
                      <span className="block text-[10px] text-[#4F9D45] font-semibold">Direct Farmgate Price</span>
                    </div>
                  </div>
                </div>

                {/* Floating Buyer Card Top Right */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5ED] flex items-center justify-center text-xl">
                    🥗
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-stone-900">100% Chemical-Free Harvest</p>
                    <p className="text-[10px] text-stone-500">Harvested fresh upon order</p>
                    <div className="flex items-center text-[#176B3A] text-[10px] font-bold mt-0.5">
                      ✓ Direct Farm-to-Kitchen
                    </div>
                  </div>
                </div>

                {/* Floating Seller Card Bottom Left */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#176B3A] text-white flex items-center justify-center shadow-md">
                    <Mic className="w-5 h-5 text-[#F4B942] animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase text-[#176B3A] tracking-wider block">
                      🎤 Voice-to-Listing
                    </span>
                    <p className="text-xs font-bold text-stone-800">
                      "I have 50 kg of onions for ₹25/kg"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 50-50 SPACE: EQUAL BENEFITS FOR BUYERS & SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
            Fair & Transparent Ecosystem
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
            A Dual Platform Built Equally for Buyers & Sellers
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            No corporate middlemen, no inflated markups. Direct value exchange between rural producers and conscious urban consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* BUYER COLUMN (50% SPACE) */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-white rounded-3xl p-8 border-2 border-[#176B3A]/20 shadow-soft space-y-6">
            <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#176B3A] text-white flex items-center justify-center font-bold text-xl shadow-md">
                🛒
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A]">For Households & Buyers</span>
                <h3 className="font-display font-extrabold text-xl text-stone-900">Farm-Fresh & Pure Produce</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#176B3A] flex items-center justify-center shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">100% Unadulterated & Chemical-Free</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Source unpolished grains, pure A2 bilona ghee, raw wild honey, and natural turmeric directly from certified organic farmers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#176B3A] flex items-center justify-center shrink-0 mt-0.5">
                  <BadgePercent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Fair Farmgate Prices (Save 20-30%)</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Eliminate 4 to 5 layers of wholesale brokers and mandi markups, giving you premium organic quality at genuine farm rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#176B3A] flex items-center justify-center shrink-0 mt-0.5">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Full Farmer & Village Traceability</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Know exact origin details, farmer names, harvesting dates, and soil practices behind every item delivered to your door.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#176B3A] flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Direct Express Delivery</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Items are carefully packed at village collection centers and delivered swiftly to urban kitchens with full tracking.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('marketplace')}
                className="w-full btn-primary text-xs py-3 justify-center shadow-md font-bold"
              >
                <span>Browse Fresh Produce Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SELLER COLUMN (50% SPACE) */}
          <div className="bg-gradient-to-br from-amber-50/70 via-white to-white rounded-3xl p-8 border-2 border-[#F4B942]/40 shadow-soft space-y-6">
            <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F4B942] text-[#1F2937] flex items-center justify-center font-bold text-xl shadow-md">
                🌾
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B87A00]">For Farmers & Artisans</span>
                <h3 className="font-display font-extrabold text-xl text-stone-900">Dignity & Fair Producer Income</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#B87A00] flex items-center justify-center shrink-0 mt-0.5">
                  <BadgePercent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">0% Commission, 100% Your Earnings</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Never pay commission to mandi brokers. Set your own prices and receive 100% of the sale value directly to your UPI/Bank.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#B87A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">List Products by Voice in 30 Seconds</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    No typing needed. Speak naturally in Hindi, Marathi, or English, and our smart AI extracts crop, weight, and price automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#B87A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Direct Access to Thousands of Buyers</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Connect directly with urban families, organic food clubs, restaurants, and wholesale cooperative buyers across India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#B87A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Panchayat Hub Pickup Logistics</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Drop your packaged produce at your nearest village Gram Panchayat center; we handle inter-city transport and delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setActivePage('become-seller')}
                className="flex-1 btn-outline text-xs py-3 justify-center font-bold bg-white"
              >
                <span>Register as Producer</span>
              </button>
              <button
                onClick={openVoiceModal}
                className="btn-accent text-xs py-3 px-4 justify-center font-bold flex items-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice List</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#176B3A] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-3">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#F4B942] block">
                ₹2.4 Cr+
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                Direct Producer Earnings
              </p>
            </div>
            <div className="p-3">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#F4B942] block">
                12,000+
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                Conscious Happy Buyers
              </p>
            </div>
            <div className="p-3">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#F4B942] block">
                8,500+
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                Rural Farmers & Artisans
              </p>
            </div>
            <div className="p-3">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#F4B942] block">
                0%
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                Middlemen Commissions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
              Browse by Rural Sector
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
              Explore Authentic Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              From fresh harvest to ancestral handcrafts, browse genuine products made in Indian villages.
            </p>
          </div>
          <button
            onClick={() => setActivePage('categories')}
            className="text-xs font-bold text-[#176B3A] hover:text-[#12542D] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelectCategory={handleCategoryClick}
            />
          ))}
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
              Direct from the Field
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
              Featured Village Products
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Hand-picked verified items with 100% transparent pricing directly supporting local families.
            </p>
          </div>
          <button
            onClick={() => setActivePage('marketplace')}
            className="btn-outline text-xs"
          >
            <span>View All Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* 6. "SELL WITH VOICE" INNOVATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#176B3A] via-[#1E7743] to-[#2E8B57] text-white p-8 sm:p-12 shadow-xl overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#F4B942] text-[#1F2937] text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Flagship Accessibility Innovation
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
                Not comfortable typing? <br />
                <span className="text-[#F4B942]">Just speak, and GramSetu will list your product.</span>
              </h2>

              <p className="text-stone-200 text-sm sm:text-base max-w-xl">
                Built specifically for farmers and artisans with limited digital literacy. Speak in Hindi, Marathi, or English, and our smart voice AI fills your price, quantity, and product details instantly.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={openVoiceModal}
                  className="btn-accent text-sm px-6 py-3 shadow-lg font-bold flex items-center gap-2.5 hover:scale-105 transition-transform"
                >
                  <Mic className="w-5 h-5 text-[#176B3A]" />
                  <span>Try "Sell with Voice" Now</span>
                </button>

                <span className="text-xs text-stone-200">
                  ⚡ Takes under 30 seconds • No complicated forms
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center backdrop-blur-md shadow-2xl mic-active cursor-pointer" onClick={openVoiceModal}>
                  <Mic className="w-16 h-16 sm:w-20 sm:h-20 text-[#F4B942]" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white text-[#176B3A] text-xs font-bold px-3 py-1 rounded-full shadow">
                  Tap to Speak 🎤
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BALANCED TESTIMONIALS: 1 FARMER & 1 BUYER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
            Community Stories
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
            Real Impact for Both Sellers & Buyers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller Testimonial */}
          <div className="card-rural p-6 border-stone-200 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#176B3A] bg-[#E8F5ED] px-2.5 py-1 rounded-full">
                🌾 Village Producer Story
              </span>
              <div className="flex text-[#F4B942]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                alt="Ramrao Patil"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#176B3A]"
              />
              <div>
                <h4 className="font-bold text-sm text-stone-900">Ramrao Patil</h4>
                <p className="text-xs text-stone-500">Wheat & Vegetable Farmer • Dindori, Nashik</p>
              </div>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Earlier at the mandi, brokers took 15% commission and delayed payments for weeks. On GramSetu, I list our Sharbati wheat simply by speaking into my phone. We receive orders from city apartments with direct UPI payment."
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="text-[#176B3A] font-semibold">₹1,85,000 extra income earned</span>
              <VerifiedBadge size="sm" />
            </div>
          </div>

          {/* Buyer Testimonial */}
          <div className="card-rural p-6 border-stone-200 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                🛒 Conscious Buyer Story
              </span>
              <div className="flex text-[#F4B942]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Pooja Deshmukh"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#F4B942]"
              />
              <div>
                <h4 className="font-bold text-sm text-stone-900">Pooja Deshmukh</h4>
                <p className="text-xs text-stone-500">Parent & Health Enthusiast • Kothrud, Pune</p>
              </div>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Finding pure A2 Bilona ghee, wood-pressed mustard oil, and unpolished millets with 100% farmer traceability has transformed my kitchen. It feels great knowing my payment directly supports farming families."
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="text-[#176B3A] font-semibold">100% Pure Chemical-Free Delivery</span>
              <span className="text-xs text-stone-400 font-medium">Verified Buyer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 50-50 BOTTOM CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buyer CTA Card */}
          <div className="bg-[#E8F5ED] border-2 border-[#176B3A]/30 rounded-3xl p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
                For Consumers & Families
              </span>
              <h3 className="font-display font-extrabold text-xl text-stone-900">
                Ready for Pure, Chemical-Free Farm Produce?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Explore hundreds of verified organic staples, cold-pressed oils, hand-harvested spices, and village crafts.
              </p>
            </div>
            <div>
              <button
                onClick={() => setActivePage('marketplace')}
                className="btn-primary text-xs px-6 py-3 font-semibold shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Full Marketplace</span>
              </button>
            </div>
          </div>

          {/* Seller CTA Card */}
          <div className="bg-[#FEF7E7] border-2 border-[#F4B942] rounded-3xl p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B87A00] block mb-1">
                For Farmers, Artisans & SHGs
              </span>
              <h3 className="font-display font-extrabold text-xl text-stone-900">
                Sell Directly with 0% Middlemen Fees
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Register in 2 minutes or use voice listing. Start reaching thousands of conscious buyers across cities today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePage('become-seller')}
                className="btn-outline bg-white text-xs px-5 py-3 font-semibold shadow-sm"
              >
                Become a Seller
              </button>
              <button
                onClick={openVoiceModal}
                className="btn-accent text-xs px-4 py-3 font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice List</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
