import React, { useState } from 'react';
import {
  Menu, X, Search, ShoppingBag, Mic, User, LogOut, LayoutDashboard,
  Store, Globe, ChevronDown, MapPin, Sparkles, PlusCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useMarketplace } from '../../context/MarketplaceContext';

const Navbar = ({ activePage, setActivePage, openVoiceModal }) => {
  const { lang, setLang, t } = useLanguage();
  const { user, logout, isSeller } = useAuth();
  const { itemCount } = useCart();
  const { setSearchQuery } = useMarketplace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setSearchQuery(navSearch.trim());
      setActivePage('marketplace');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'marketplace', label: t('marketplace') },
    { id: 'categories', label: t('categories') },
    { id: 'near-you', label: t('nearYou') },
    { id: 'how-it-works', label: t('howItWorks') },
    { id: 'about', label: t('about') },
    { id: 'contact', label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
      {/* Top Banner: GramSetu Mission & Trust Announcement */}
      <div className="bg-[#176B3A] text-white text-[11px] font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#F4B942] text-[#1F2937] font-bold text-[9px] uppercase px-1.5 py-0.5 rounded">
              Direct Rural Trade
            </span>
            <span className="hidden sm:inline">🌾 {t('zeroMiddlemen')}</span>
            <span className="sm:hidden">🌾 Direct from Rural Villages</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-stone-200">
              📞 Kisan Helpline: 1800-233-4726
            </span>
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5 px-1.5 border border-white/20">
              <Globe className="w-3 h-3 text-[#F4B942]" />
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  lang === 'en' ? 'bg-[#F4B942] text-[#1F2937] font-bold' : 'text-white hover:text-[#F4B942]'
                }`}
              >
                EN
              </button>
              <span className="text-white/40 text-[9px]">|</span>
              <button
                onClick={() => setLang('hi')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  lang === 'hi' ? 'bg-[#F4B942] text-[#1F2937] font-bold' : 'text-white hover:text-[#F4B942]'
                }`}
              >
                हिंदी
              </button>
              <span className="text-white/40 text-[9px]">|</span>
              <button
                onClick={() => setLang('mr')}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  lang === 'mr' ? 'bg-[#F4B942] text-[#1F2937] font-bold' : 'text-white hover:text-[#F4B942]'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#E8F5ED] border border-[#176B3A]/20 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-inner">
                🌱
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-2xl tracking-tight text-[#176B3A]">
                    GramSetu
                  </span>
                  <span className="text-xs font-devanagari text-[#4F9D45] font-semibold">
                    ग्रामसेतु
                  </span>
                </div>
                <p className="text-[10px] font-medium text-stone-500 tracking-wide -mt-1 hidden sm:block">
                  {t('tagline')}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full pl-10 pr-24 py-2 bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-xs text-stone-800 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#176B3A] focus:border-transparent transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={openVoiceModal}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#FEF7E7] text-[#176B3A] hover:bg-[#F4B942] hover:text-[#1F2937] text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#F4B942]/50 transition-colors"
                title="Sell with Voice"
              >
                <Mic className="w-3.5 h-3.5 text-[#E5A932]" />
                <span>Voice</span>
              </button>
            </form>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sell With Voice Button */}
            <button
              onClick={openVoiceModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FEF7E7] hover:bg-[#F4B942] text-[#1F2937] border border-[#F4B942]/60 font-semibold text-xs shadow-sm transition-all active:scale-95"
            >
              <Mic className="w-4 h-4 text-[#176B3A] animate-pulse" />
              <span>{t('sellWithVoice')}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => { setActivePage('cart'); setMobileMenuOpen(false); }}
              className="relative p-2 rounded-xl text-stone-700 hover:bg-[#E8F5ED] hover:text-[#176B3A] transition-colors"
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F4B942] text-[#1F2937] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth Dropdown / Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-stone-200 hover:border-[#176B3A] hover:bg-[#F8FAF5] transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#176B3A] text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left hidden md:block">
                    <span className="block text-xs font-semibold text-stone-800 leading-tight truncate max-w-[90px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-medium text-[#176B3A] uppercase tracking-wider block">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-800">{user.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#E8F5ED] text-[#176B3A]">
                        {user.role === 'seller' ? '🌾 Verified Seller' : '🛒 Verified Buyer'}
                      </span>
                    </div>

                    <button
                      onClick={() => setActivePage(isSeller ? 'seller-dashboard' : 'buyer-dashboard')}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-stone-700 hover:bg-[#E8F5ED] hover:text-[#176B3A] flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      {isSeller ? t('sellerDashboard') : t('buyerDashboard')}
                    </button>

                    {isSeller ? (
                      <button
                        onClick={() => setActivePage('add-product')}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-stone-700 hover:bg-[#E8F5ED] hover:text-[#176B3A] flex items-center gap-2"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        {t('addProduct')}
                      </button>
                    ) : (
                      <button
                        onClick={() => setActivePage('buyer-orders')}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-stone-700 hover:bg-[#E8F5ED] hover:text-[#176B3A] flex items-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {t('myOrders')}
                      </button>
                    )}

                    <button
                      onClick={() => setActivePage('profile')}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-stone-700 hover:bg-[#E8F5ED] hover:text-[#176B3A] flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5" />
                      Profile & Address
                    </button>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage('login')}
                  className="text-xs font-semibold text-stone-700 hover:text-[#176B3A] px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => setActivePage('become-seller')}
                  className="btn-primary text-xs"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('sellOnGramSetu')}</span>
                  <span className="sm:hidden">Sell</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 border-t border-stone-100 py-1.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activePage === link.id
                  ? 'bg-[#176B3A] text-white shadow-sm'
                  : 'text-stone-700 hover:text-[#176B3A] hover:bg-[#E8F5ED]'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Quick link to Become a Seller if buyer/guest */}
          {!isSeller && (
            <button
              onClick={() => setActivePage('become-seller')}
              className="ml-auto text-xs font-bold text-[#176B3A] hover:text-[#12542D] flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E8F5ED] border border-[#176B3A]/20"
            >
              <Store className="w-3.5 h-3.5" />
              {t('sellOnGramSetu')}
            </button>
          )}

          {isSeller && (
            <button
              onClick={() => setActivePage('seller-dashboard')}
              className="ml-auto text-xs font-bold text-[#176B3A] hover:text-[#12542D] flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E8F5ED] border border-[#176B3A]/20"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Seller Studio
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Hamburger Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-100 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Mobile Voice Listing Button */}
          <button
            onClick={() => { openVoiceModal(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FEF7E7] text-[#1F2937] border border-[#F4B942] font-semibold text-xs"
          >
            <Mic className="w-4 h-4 text-[#176B3A]" />
            <span>{t('sellWithVoice')}</span>
          </button>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activePage === link.id
                    ? 'bg-[#176B3A] text-white'
                    : 'bg-stone-50 text-stone-800 hover:bg-[#E8F5ED]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-2 border-t border-stone-200 space-y-2">
            <button
              onClick={() => { setActivePage(isSeller ? 'seller-dashboard' : 'buyer-dashboard'); setMobileMenuOpen(false); }}
              className="w-full btn-outline text-xs"
            >
              <LayoutDashboard className="w-4 h-4" />
              {isSeller ? t('sellerDashboard') : t('buyerDashboard')}
            </button>

            {!isSeller && (
              <button
                onClick={() => { setActivePage('become-seller'); setMobileMenuOpen(false); }}
                className="w-full btn-primary text-xs"
              >
                <Store className="w-4 h-4" />
                {t('sellOnGramSetu')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
