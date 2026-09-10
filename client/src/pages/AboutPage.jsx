import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Users, Award, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = ({ setActivePage }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Hero / Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5ED] text-[#176B3A] text-xs font-bold border border-[#176B3A]/20">
          🌱 Social Technology for Rural India
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
          Bridging Villages to Markets
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
          “GramSetu aims to connect rural communities with wider markets through simple and accessible digital technology.”
        </p>
      </div>

      {/* 2. Visual Story Mosaic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft">
        <div className="space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-stone-900">
            The Vision Behind GramSetu
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            For generations, rural producers—whether smallholder farmers growing heritage grains, master weavers on hand charkhas, or women crafting bamboo baskets—have been isolated from end consumers. Layer upon layer of mandi middlemen, brokers, and logistics intermediaries have squeezed producer income to the bare minimum while buyers pay inflated prices.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            GramSetu was conceived to break down this digital divide. By introducing zero-friction voice-based listing, regional Indian language support, and verified village credentials, any farmer or artisan can list their produce in seconds and transact transparently with zero commission.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('become-seller')}
              className="btn-primary text-xs"
            >
              Join as a Rural Producer
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
          <img
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80"
            alt="Rural Producer"
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl text-xs flex items-center justify-between shadow">
            <div>
              <p className="font-bold text-stone-900">100% Direct Village Trade</p>
              <p className="text-[11px] text-[#176B3A] font-semibold">Over 450+ Panchayats connected</p>
            </div>
            <span className="text-xl">🌾</span>
          </div>
        </div>
      </div>

      {/* 3. Three Core Values (Requirement: Empower Local Producers, Build Direct Connections, Create Rural Opportunities) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] block mb-1">
            Our Core Values
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
            Built on Three Enduring Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Value 1 */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-soft space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5ED] text-2xl flex items-center justify-center shadow-inner">
              🌾
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Empower Local Producers
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We return dignity and fair financial returns to primary agricultural growers and craft artisans. By removing commission vultures, families reinvest their earnings back into soil regeneration, sustainable seeds, and youth education.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-soft space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF7E7] text-2xl flex items-center justify-center shadow-inner">
              🤝
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Build Direct Connections
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We bridge the cultural and physical distance between city households and rural hamlets. Consumers know the story of their food, while farmers receive direct appreciation and feedback from those who consume their harvest.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-soft space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F9ED] text-2xl flex items-center justify-center shadow-inner">
              🚀
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              Create Rural Opportunities
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Rural India is not just a food basket; it is an incubator of entrepreneurship. GramSetu builds digital packaging centers, localized logistics routes, and micro-fulfillment micro-enterprises right in the villages.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Trust & Safety Section */}
      <div className="bg-[#176B3A] text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F4B942] block">
            Quality & Verification
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl">
            Buy Directly from Verified Local Sellers
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            Every seller displaying the <strong>“✓ Verified Seller”</strong> badge undergoes community verification, farm location validation, and quality auditing. Buyers can report concerns directly to our Gram Sahayata desk.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F4B942]" />
              Panchayat Verified
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#F4B942]" />
              Zero Middlemen
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3 text-xs text-stone-200">
          <h4 className="font-bold text-white text-sm">Need help or want to partner?</h4>
          <p>
            Whether you are a Farmer Producer Company (FPO), Women Self-Help Group (SHG), or an institutional buyer (hotel, organic store, school), connect with our rural outreach team.
          </p>
          <button
            onClick={() => setActivePage('contact')}
            className="btn-accent text-xs mt-2"
          >
            Contact Rural Desk
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
