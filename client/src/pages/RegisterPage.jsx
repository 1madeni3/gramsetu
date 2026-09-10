import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const RegisterPage = ({ setActivePage }) => {
  const { registerBuyer } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    village: 'Gangapur',
    district: 'Nashik',
    state: 'Maharashtra'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    registerBuyer(formData);
    setActivePage('buyer-dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <button
        onClick={() => setActivePage('home')}
        className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="text-center space-y-1">
          <span className="text-2xl">🛒</span>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">
            Create Buyer Account
          </h1>
          <p className="text-xs text-stone-500">
            Buy fresh authentic products directly from Indian villages
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Aditya Shivale"
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="aditya.shivale@gramsetu.in"
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Mobile Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98200 00000"
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a password"
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Town / City</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-xs py-3 font-bold shadow-md"
          >
            Create Account & Shop
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-500 border-t border-stone-100">
          Already have an account?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-[#176B3A] font-bold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
