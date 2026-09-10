import React from 'react';
import {
  ShoppingBag, Heart, Store, Star, MapPin, User, Settings, ArrowLeft, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const BuyerSidebar = ({ currentTab, setCurrentTab, setActivePage }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'saved-sellers', label: 'Saved Sellers', icon: Store },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'profile', label: 'Account Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-stone-200 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* User Badge */}
        <div className="p-3.5 rounded-2xl bg-[#F8FAF5] border border-stone-200 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#176B3A] text-white flex items-center justify-center font-bold text-base shadow-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-xs text-stone-900 truncate">
              {user?.name || "Aditya Shivale"}
            </h4>
            <span className="inline-flex items-center gap-1 text-[10px] text-stone-500 font-medium">
              🛒 Registered Buyer
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#176B3A] text-white shadow-sm'
                    : 'text-stone-600 hover:bg-[#E8F5ED] hover:text-[#176B3A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span>{item.label}</span>
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
          Continue Shopping
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

export default BuyerSidebar;
