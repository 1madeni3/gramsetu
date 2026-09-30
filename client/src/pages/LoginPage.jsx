import React, { useState } from 'react';
import { ArrowLeft, User, Lock, Store, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const LoginPage = ({ setActivePage, adminRedirectReason, initialMode = 'signin' }) => {
  const { login, loginDemoBuyer, loginDemoSeller } = useAuth();
  const { t } = useLanguage();

  // Mode: 'signin' (Buyers & Producers) or 'login' (Admin / Credentials)
  const [authMode, setAuthMode] = useState(
    adminRedirectReason || initialMode === 'login' ? 'login' : 'signin'
  );

  const [role, setRole] = useState(
    adminRedirectReason || initialMode === 'login' ? 'admin' : 'buyer'
  );
  const [email, setEmail] = useState(
    adminRedirectReason || initialMode === 'login' ? 'nitinimade@gmail.com' : 'buyer@gramsetu.in'
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setError('');
    if (mode === 'login') {
      setRole('admin');
      setEmail('nitinimade@gmail.com');
      setPassword('');
    } else {
      setRole('buyer');
      setEmail('buyer@gramsetu.in');
      setPassword('password123');
    }
  };

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
            {authMode === 'login' ? 'Login to GramSetu' : 'Sign In to GramSetu'}
          </h1>
          <p className="text-xs text-stone-500">
            {authMode === 'login'
              ? 'Authorized Portal & Administrative Access'
              : 'Bridging Villages to Markets • Farmers, Artisans & Buyers'}
          </p>
        </div>

        {/* Two Options: Sign In and Login */}
        <div className="flex p-1.5 bg-stone-100 rounded-2xl border border-stone-200 gap-1.5">
          <button
            type="button"
            onClick={() => handleModeChange('signin')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'signin'
                ? 'bg-[#176B3A] text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('login')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'login'
                ? 'bg-[#176B3A] text-white shadow-md'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
        </div>

        {adminRedirectReason && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold text-center flex items-center gap-2">
            <span className="text-base">🔒</span>
            <span>{adminRedirectReason}</span>
          </div>
        )}

        {/* Content depending on authMode */}
        {authMode === 'signin' ? (
          <>
            {/* Quick Demo Access for Public Roles (Buyer & Producer) */}
            <div className="p-3.5 rounded-2xl bg-[#FEF7E7] border border-[#F4B942] space-y-2">
              <p className="text-[11px] font-bold text-stone-800 text-center">
                ⚡ Quick Sign In (Public Roles):
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
                  <span>🛒 Buyer (Aniket)</span>
                </button>
              </div>
            </div>

            {/* Role Toggle: 2 tabs in Sign In */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold gap-1">
              <button
                type="button"
                onClick={() => handleRoleSwitch('buyer')}
                className={`py-2 rounded-lg transition-all text-center ${
                  role === 'buyer' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'text-stone-500'
                }`}
              >
                🛒 Buyer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('seller')}
                className={`py-2 rounded-lg transition-all text-center ${
                  role === 'seller' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'text-stone-500'
                }`}
              >
                🌾 Producer / Farmer
              </button>
            </div>
          </>
        ) : (
          /* Login mode (Admin / Staff Portal) */
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-black text-xs shadow-sm">
              <span>👑</span>
              <span>Administrator Portal Login</span>
            </div>
            <p className="text-xs text-amber-900 font-medium">
              Authorized personnel: <strong>Nitin Imade</strong> (nitinimade@gmail.com)
            </p>
          </div>
        )}

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {authMode === 'login' ? 'Admin Email Address' : 'Email Address'}
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={authMode === 'login'}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A] ${
                  authMode === 'login' ? 'bg-stone-50 cursor-not-allowed font-medium text-stone-800' : ''
                }`}
                required
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-stone-700">Password</label>
              {role === 'admin' && (
                <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                  Authorized Nitin Imade Credentials
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
            className="w-full btn-primary text-xs py-3 font-bold shadow-md cursor-pointer"
          >
            {authMode === 'login'
              ? 'Login to Admin Portal (Nitin Imade)'
              : `Sign In as ${role === 'seller' ? 'Producer (Ramrao Patil)' : 'Buyer (Aniket Deshmukh)'}`}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-500 space-y-2 border-t border-stone-100">
          {authMode === 'signin' ? (
            <p>
              Are you an Administrator?{' '}
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className="text-[#176B3A] font-bold hover:underline"
              >
                Switch to Login
              </button>
            </p>
          ) : (
            <p>
              Looking for Producer or Buyer access?{' '}
              <button
                type="button"
                onClick={() => handleModeChange('signin')}
                className="text-[#176B3A] font-bold hover:underline"
              >
                Switch to Sign In
              </button>
            </p>
          )}

          <p className="pt-1">
            Want to sell your harvest or crafts?{' '}
            <button
              type="button"
              onClick={() => setActivePage('become-seller')}
              className="text-[#176B3A] font-bold hover:underline"
            >
              Register as Seller on GramSetu
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
