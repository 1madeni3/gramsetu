import React, { useState } from 'react';
import { ArrowLeft, Globe, Bell, Shield, Smartphone, Save, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const SettingsPage = ({ setActivePage }) => {
  const { lang, setLang, t } = useLanguage();
  const { user } = useAuth();

  const [notifications, setNotifications] = useState({
    smsAlerts: true,
    whatsappAlerts: true,
    orderUpdates: true,
    voiceGuidance: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <button
          onClick={() => setActivePage('home')}
          className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
          Preferences & Settings
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Configure language, SMS order alerts, and rural accessibility options
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Language Selection */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Globe className="w-4 h-4 text-[#176B3A]" />
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              Preferred Language (भाषा / बोली)
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'en', label: 'English', sub: 'Default' },
              { id: 'hi', label: 'हिंदी (Hindi)', sub: 'भारतीय' },
              { id: 'mr', label: 'मराठी (Marathi)', sub: 'महाराष्ट्र' }
            ].map(l => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  lang === l.id
                    ? 'border-2 border-[#176B3A] bg-[#E8F5ED]/40 text-[#176B3A]'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-white'
                }`}
              >
                <span className="font-bold text-sm block">{l.label}</span>
                <span className="text-[11px] text-stone-500">{l.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Bell className="w-4 h-4 text-[#176B3A]" />
            <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
              Rural Notifications & Alerts
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-stone-100">
            <label className="flex items-center justify-between pt-2 cursor-pointer">
              <div>
                <p className="font-bold text-stone-800">SMS Order Updates</p>
                <p className="text-stone-500 text-[11px]">Receive order confirmations and delivery OTPs via normal mobile SMS (Works without 4G internet)</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.smsAlerts}
                onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                className="w-4 h-4 accent-[#176B3A]"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <p className="font-bold text-stone-800">WhatsApp Order Alerts</p>
                <p className="text-stone-500 text-[11px]">Receive direct buyer messages and invoice copies on WhatsApp</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.whatsappAlerts}
                onChange={(e) => setNotifications({ ...notifications, whatsappAlerts: e.target.checked })}
                className="w-4 h-4 accent-[#176B3A]"
              />
            </label>

            <label className="flex items-center justify-between pt-3 cursor-pointer">
              <div>
                <p className="font-bold text-stone-800">Voice Guidance Prompts</p>
                <p className="text-stone-500 text-[11px]">Audio assistance for farmers when navigating marketplace</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.voiceGuidance}
                onChange={(e) => setNotifications({ ...notifications, voiceGuidance: e.target.checked })}
                className="w-4 h-4 accent-[#176B3A]"
              />
            </label>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-[#E8F5ED] text-[#176B3A] border border-[#176B3A]/30 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Preferences saved successfully!
          </div>
        )}

        <button
          type="submit"
          className="btn-primary text-xs py-3 px-6 font-bold shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
