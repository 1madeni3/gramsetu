import React from 'react';
import {
  LayoutDashboard, Package, PlusCircle, ShoppingBag, Users,
  TrendingUp, Star, User, Settings, Mic, ArrowLeft, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const SellerSidebar = ({ currentTab, setCurrentTab, setActivePage, openVoiceModal }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'My Products', icon: Package },
    { id: 'add-product', label: 'Add Product', icon: PlusCircle },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '3' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'earnings', label: 'Earnings', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Seller Info Badge */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAF5] border border-stone-200 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#176B3A] text-white flex items-center justify-center font-bold text-base shadow-sm">
            {user?.name?.charAt(0) || 'N'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs text-stone-900 truncate">
              {user?.sellerProfile?.name || user?.name || "Nitin Imade Kisan Sahakari"}
            </h4>
            <span className="inline-flex items-center gap-1 text-[10px] text-[#176B3A] font-semibold">
              ✓ Verified Producer
            </span>
          </div>
        </div>

        {/* Sell With Voice Button */}
        <button
          type="button"
          onClick={openVoiceModal}
          className="w-full py-2.5 px-3 rounded-xl bg-[#FEF7E7] hover:bg-[#F4B942] text-[#1F2937] border border-[#F4B942] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Mic className="w-4 h-4 text-[#176B3A] animate-pulse" />
          <span>🎤 {t('sellWithVoice')}</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#176B3A] text-white shadow-sm'
                    : 'text-stone-600 hover:bg-[#E8F5ED] hover:text-[#176B3A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#F4B942] text-[#1F2937]' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 border-t border-stone-200 space-y-1">
        <button
          onClick={() => setActivePage('marketplace')}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-600 hover:text-[#176B3A] hover:bg-stone-50 rounded-xl"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Marketplace
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl"
        >
          <LogOut className="w-3.5 h-3.5" />
          {t('logout')}
        </button>
      </div>
    </aside>
  );
};

export default SellerSidebar;
