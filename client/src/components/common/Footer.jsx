import React from 'react';
import { Heart, Phone, Mail, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = ({ setActivePage }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#103D22] text-stone-200 pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌱</span>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                GramSetu
              </span>
            </div>
            <p className="text-[#F4B942] font-semibold text-sm">
              {t('tagline')}
            </p>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              A community-powered digital bridge connecting Indian farmers, village artisans, home producers, and rural micro-enterprises directly with buyers nationwide. No middlemen, full transparency, fair value for honest labor.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#facebook"
                aria-label="GramSetu on Facebook"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#F4B942] hover:text-[#1F2937] transition-all flex items-center justify-center text-sm font-bold"
              >
                f
              </a>
              <a
                href="#instagram"
                aria-label="GramSetu on Instagram"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#F4B942] hover:text-[#1F2937] transition-all flex items-center justify-center text-sm font-bold"
              >
                ig
              </a>
              <a
                href="#youtube"
                aria-label="GramSetu on YouTube"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#F4B942] hover:text-[#1F2937] transition-all flex items-center justify-center text-sm font-bold"
              >
                yt
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => setActivePage('marketplace')} className="hover:text-[#F4B942] transition-colors">
                  {t('marketplace')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('categories')} className="hover:text-[#F4B942] transition-colors">
                  {t('categories')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('near-you')} className="hover:text-[#F4B942] transition-colors">
                  📍 {t('nearYou')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('how-it-works')} className="hover:text-[#F4B942] transition-colors">
                  {t('howItWorks')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('order-tracking')} className="hover:text-[#F4B942] transition-colors">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Sellers & Artisans */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
              For Producers
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button onClick={() => setActivePage('become-seller')} className="hover:text-[#F4B942] transition-colors">
                  {t('sellOnGramSetu')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('seller-dashboard')} className="hover:text-[#F4B942] transition-colors">
                  Producer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('voice-listing')} className="hover:text-[#F4B942] transition-colors flex items-center gap-1">
                  <span>🎤 Voice Product Listing</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-[#F4B942] transition-colors">
                  Verified Producer Badge
                </button>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#F4B942] font-semibold bg-white/5 px-2 py-1 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  0% Commission Pilot
                </span>
              </li>
            </ul>
          </div>

          {/* Kisan Helpline & Support */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Gram Sahayata
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-stone-400">Toll-Free Kisan Kendra:</p>
                <a href="tel:18002334726" className="text-sm font-bold text-[#F4B942] hover:underline flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                  1800-233-4726
                </a>
                <p className="text-[10px] text-stone-400 mt-1">Available in Hindi, Marathi & English (7 AM - 9 PM)</p>
              </div>

              <p className="flex items-center gap-1.5 text-xs text-stone-300">
                <Mail className="w-3.5 h-3.5 text-[#F4B942]" />
                kisan.mitra@gramsetu.in
              </p>

              <p className="flex items-center gap-1.5 text-xs text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-[#F4B942]" />
                Rural Innovation Hub, Nashik & New Delhi
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 GramSetu. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button onClick={() => setActivePage('about')} className="hover:text-white transition-colors">
              About Us
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">
              Contact
            </button>
            <span>•</span>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Fair Trade
            </a>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>Built with dedication for Rural India</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
