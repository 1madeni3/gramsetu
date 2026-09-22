import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Store, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const LoginPage = ({ setActivePage, adminRedirectReason }) => {
  const { login, loginDemoBuyer, loginDemoSeller } = useAuth();
  const { t } = useLanguage();

  const [role, setRole] = useState(adminRedirectReason ? 'admin' : 'buyer');
  const [email, setEmail] = useState(adminRedirectReason ? 'nitinimade@gmail.com' : 'buyer@gramsetu.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'admin') {
      setEmail('nitinimade@gmail.com');
      setPassword('');
    } else if (newRole === 'seller') {
      setEmail('seller@gramsetu.in');
      setPassword('password123');
    } else {
      setEmail('buyer@gramsetu.in');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Strict validation for admin
    if (role === 'admin' || email.toLowerCase().trim() === 'nitinimade@gmail.com') {
      if (email.toLowerCase().trim() !== 'nitinimade@gmail.com') {
        setError('Access Denied: Only Nitin Imade (nitinimade@gmail.com) is authorized to access the Admin Portal.');
        return;
      }
      if (password !== 'nitin@123456') {
        setError('Incorrect Admin password. Access is restricted exclusively to Nitin Imade.');
        return;
      }
    }

    try {
      const loggedIn = await login(email, password);
      if (loggedIn.role === 'admin') {
        setActivePage('admin-dashboard');
      } else if (loggedIn.role === 'seller') {
        setActivePage('seller-dashboard');
      } else {
        setActivePage('buyer-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
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

        {adminRedirectReason && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold text-center flex items-center gap-2">
            <span className="text-base">🔒</span>
            <span>{adminRedirectReason}</span>
          </div>
        )}

        {/* Quick Demo Access for Public Roles (Buyer & Producer) */}
        <div className="p-3.5 rounded-2xl bg-[#FEF7E7] border border-[#F4B942] space-y-2">
          <p className="text-[11px] font-bold text-stone-800 text-center">
            ⚡ Quick Portal Access (Public Roles):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickSeller}
              className="p-2 rounded-xl bg-[#176B3A] text-white text-[11px] font-bold hover:bg-[#12542D] transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>🌾 Producer (Sahyadri FPC)</span>
            </button>
            <button
              type="button"
              onClick={handleQuickBuyer}
              className="p-2 rounded-xl bg-[#F4B942] text-[#1F2937] text-[11px] font-bold hover:bg-[#E5A932] transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>🛒 Buyer (Aditya)</span>
            </button>
          </div>
          <p className="text-[10px] text-stone-500 text-center italic">
            🔒 Admin Portal is restricted exclusively to Nitin Imade. Password verification is mandatory.
          </p>
        </div>

        {/* Role Toggle: 3 tabs */}
        <div className="grid grid-cols-3 p-1 bg-stone-100 rounded-xl text-xs font-semibold gap-1">
          <button
            type="button"
            onClick={() => handleRoleSwitch('buyer')}
            className={`py-2 rounded-lg transition-all text-center ${
              role === 'buyer' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'text-stone-500'
            }`}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('seller')}
            className={`py-2 rounded-lg transition-all text-center ${
              role === 'seller' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'text-stone-500'
            }`}
          >
            Producer
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            className={`py-2 rounded-lg transition-all text-center ${
              role === 'admin' ? 'bg-[#F4B942] text-stone-950 shadow-sm font-black' : 'text-stone-500'
            }`}
          >
            👑 Admin
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
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-stone-700">Password</label>
              {role === 'admin' && (
                <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                  Authorized Nitin Imade Password
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                placeholder={role === 'admin' ? 'Enter admin password' : '••••••••'}
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
            Sign In as {role === 'admin' ? 'Super Admin (Nitin Imade)' : role === 'seller' ? 'Producer (Nitin Imade)' : 'Buyer'}
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
