import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Store, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const LoginPage = ({ setActivePage }) => {
  const { login, loginDemoBuyer, loginDemoSeller } = useAuth();
  const { t } = useLanguage();

  const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'
  const [email, setEmail] = useState('buyer@gramsetu.in');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    if (newRole === 'seller') {
      setEmail('seller@gramsetu.in');
    } else {
      setEmail('buyer@gramsetu.in');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedIn = await login(email, password);
      if (loggedIn.role === 'seller') {
        setActivePage('seller-dashboard');
      } else {
        setActivePage('buyer-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleQuickBuyer = () => {
    loginDemoBuyer();
    setActivePage('buyer-dashboard');
  };

  const handleQuickSeller = () => {
    loginDemoSeller();
    setActivePage('seller-dashboard');
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
          <span className="text-2xl">🌱</span>
          <h1 className="font-display font-extrabold text-2xl text-stone-900">
            Sign In to GramSetu
          </h1>
          <p className="text-xs text-stone-500">
            Bridging Villages to Markets
          </p>
        </div>

        {/* 1-Click Quick Demo Access Banner */}
        <div className="p-3.5 rounded-2xl bg-[#FEF7E7] border border-[#F4B942] space-y-2">
          <p className="text-[11px] font-bold text-stone-800 text-center">
            ⚡ Instant 1-Click Demo Evaluation:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickSeller}
              className="p-2 rounded-xl bg-[#176B3A] text-white text-[11px] font-bold hover:bg-[#12542D] transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>🌾 Producer (Nitin Imade)</span>
            </button>
            <button
              type="button"
              onClick={handleQuickBuyer}
              className="p-2 rounded-xl bg-[#F4B942] text-[#1F2937] text-[11px] font-bold hover:bg-[#E5A932] transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>🛒 Buyer (Aditya Shivale)</span>
            </button>
          </div>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleSwitch('buyer')}
            className={`py-2 rounded-lg transition-all ${
              role === 'buyer' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
            }`}
          >
            Buyer Login
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('seller')}
            className={`py-2 rounded-lg transition-all ${
              role === 'seller' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
            }`}
          >
            Seller / Producer Login
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                required
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                required
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-xs py-3 font-bold shadow-md"
          >
            Sign In as {role === 'seller' ? 'Producer' : 'Buyer'}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-500 space-y-2 border-t border-stone-100">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => setActivePage(role === 'seller' ? 'become-seller' : 'register')}
              className="text-[#176B3A] font-bold hover:underline"
            >
              {role === 'seller' ? 'Register as Seller' : 'Sign Up as Buyer'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
