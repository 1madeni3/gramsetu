import React from 'react';
import {
  ArrowRight, Mic, ShieldCheck, Sparkles, Truck, Users,
  CheckCircle2, Star, ShoppingBag, MapPin, HeartHandshake, PhoneCall
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
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F5ED]/70 via-[#F8FAF5] to-[#F8FAF5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#176B3A]/10 text-[#176B3A] border border-[#176B3A]/20 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#176B3A] animate-ping"></span>
                <span>🌾 Zero-Middlemen Rural Digital Marketplace</span>
              </div>

              {/* Large Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.15]">
                {t('tagline')}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-normal">
                {t('heroSub')}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActivePage('marketplace')}
                  className="btn-primary text-sm px-6 py-3 shadow-md hover:shadow-lg font-semibold"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('exploreMarketplace')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('become-seller')}
                  className="btn-outline text-sm px-6 py-3 font-semibold bg-white/80"
                >
                  <span>{t('startSelling')}</span>
                </button>

                {/* Voice Listing CTA Chip */}
                <button
                  onClick={openVoiceModal}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FEF7E7] hover:bg-[#F4B942] text-[#1F2937] border border-[#F4B942] font-semibold text-xs transition-all shadow-sm active:scale-95"
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
                  <ShieldCheck className="w-4 h-4 text-[#176B3A]" />
                  <span>Verified Panchayat Producers</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#176B3A]" />
                  <span>Fair Pricing Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#176B3A]" />
                  <span>Rural Express Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Visual Representation (Farmer, Artisan, Fresh Products, Tech Connection) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Mosaic Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80"
                    alt="Organic Farm Field GramSetu marketplace"
                    className="w-full h-96 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

                  {/* Overlay Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80"
                        alt="Wheat"
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-bold text-xs text-stone-900">Nitin Imade Kisan Sahakari</h4>
                          <VerifiedBadge size="sm" />
                        </div>
                        <p className="text-[11px] text-stone-500">Nashik, Maharashtra • Organic Wheat</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#176B3A]">₹45/kg</span>
                      <span className="block text-[10px] text-[#4F9D45] font-semibold">Direct Farm Sale</span>
                    </div>
                  </div>
                </div>

                {/* Floating Artisan Card Top Right */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF7E7] flex items-center justify-center text-xl">
                    🧺
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-stone-900">Siddhesh Kumbhar Kendra</p>
                    <p className="text-[10px] text-stone-500">Handmade Bamboo Crafts</p>
                    <div className="flex items-center text-[#F4B942] text-[10px] font-bold mt-0.5">
                      ★ 4.9 (89 verified buyers)
                    </div>
                  </div>
                </div>

                {/* Floating "Sell with Voice" Live Simulation Pill */}
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

      {/* 2. IMPACT STATS STRIP */}
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
                8,500+
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                Rural Farmers & Artisans
              </p>
            </div>
            <div className="p-3">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#F4B942] block">
                450+
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                Villages & Panchayats
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

      {/* 3. CATEGORIES SECTION */}
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

      {/* 4. FEATURED PRODUCTS SECTION */}
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

      {/* 5. "SELL WITH VOICE" HERO BANNER */}
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

      {/* 6. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
            Simple 3-Step Process
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
            How GramSetu Bridges Villages to Markets
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Designed for extreme simplicity, complete transparency, and mutual community trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="card-rural p-6 text-center space-y-4 relative border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5ED] text-[#176B3A] flex items-center justify-center font-display font-extrabold text-2xl mx-auto shadow-sm">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Rural Producer Lists Produce
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Farmers and artisans list their harvest or crafts easily using their smartphone or by simply speaking into the microphone via <strong>Sell with Voice</strong>.
            </p>
            <div className="text-[11px] font-semibold text-[#176B3A] bg-[#E8F5ED] py-1 px-3 rounded-full inline-block">
              Zero Tech Barriers
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-rural p-6 text-center space-y-4 relative border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF7E7] text-[#E5A932] flex items-center justify-center font-display font-extrabold text-2xl mx-auto shadow-sm">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Buyer Connects Directly
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Households, local retailers, and restaurants discover authentic village produce, filter by local distance, and place orders directly with verified sellers.
            </p>
            <div className="text-[11px] font-semibold text-stone-800 bg-[#FEF7E7] py-1 px-3 rounded-full inline-block">
              100% Price Transparency
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-rural p-6 text-center space-y-4 relative border-stone-200">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5ED] text-[#4F9D45] flex items-center justify-center font-display font-extrabold text-2xl mx-auto shadow-sm">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Fresh Dispatch & Direct Pay
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Products are harvested or packaged fresh, dispatched via GramSetu Rural Express, and payment reaches the producer's bank/UPI account instantly.
            </p>
            <div className="text-[11px] font-semibold text-[#4F9D45] bg-[#F0F9ED] py-1 px-3 rounded-full inline-block">
              Fair Earnings Delivered
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY GRAMSETU - 3 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F8FAF5] border border-stone-200 p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
              Our Guiding Values
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
              Why GramSetu is Different
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Unlike commercial corporate e-commerce, GramSetu is built as a social technology cooperative focused on rural dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-soft space-y-3">
              <span className="text-3xl">🌾</span>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Empower Local Producers
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                By removing exploitative middlemen, producers capture 30% to 50% more revenue per harvest or handicraft sold, keeping prosperity within the village economy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-soft space-y-3">
              <span className="text-3xl">🤝</span>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Build Direct Connections
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Buyers know exactly who grew their wheat, who pressed their mustard oil, and which artisan woven their basket, fostering lifelong relationships of trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-soft space-y-3">
              <span className="text-3xl">🚀</span>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Create Rural Opportunities
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Empowering village youth and women self-help groups with digital tools, local packing hubs, and delivery logistics, reversing rural brain drain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED PRODUCERS TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
            Voices from the Village
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
            Real Stories, Real Transformation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-rural p-6 border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                alt="Nitin Imade"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#176B3A]"
              />
              <div>
                <h4 className="font-bold text-sm text-stone-900">Nitin Imade</h4>
                <p className="text-xs text-stone-500">Wheat & Vegetable Farmer • Dindori, Nashik</p>
              </div>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Earlier at the mandi, brokers would take 15% commission and delay payments for weeks. On GramSetu, I list our Sharbati wheat simply by speaking into my phone. We receive orders from city apartments and restaurants with direct UPI payment."
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="text-[#176B3A] font-semibold">₹1,85,000 extra income earned</span>
              <VerifiedBadge size="sm" />
            </div>
          </div>

          <div className="card-rural p-6 border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
                alt="Unnati Pawar"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#176B3A]"
              />
              <div>
                <h4 className="font-bold text-sm text-stone-900">Unnati Pawar</h4>
                <p className="text-xs text-stone-500">Gramin Dairy Producer • Mogri, Anand</p>
              </div>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Our 60-family dairy group now sells pure A2 Gir cow ghee and raw milk directly to health-conscious families. With GramSetu, payment arrives on time and every dairy farmer receives full fair market value."
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="text-[#176B3A] font-semibold">60 Dairy Families Supported</span>
              <VerifiedBadge size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FEF7E7] border-2 border-[#F4B942] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
              Join the Movement
            </span>
            <h3 className="font-display font-extrabold text-2xl text-stone-900">
              Are you a farmer, artisan, or village producer?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Register in under 2 minutes. Get verified, list your products for free, and connect directly with thousands of buyers across the country.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActivePage('become-seller')}
              className="btn-primary text-xs px-6 py-3 font-semibold shadow-md"
            >
              Become a Verified Seller
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
