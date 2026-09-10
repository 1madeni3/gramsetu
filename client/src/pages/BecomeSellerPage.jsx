import React, { useState } from 'react';
import {
  Store, CheckCircle2, Upload, FileText, Camera, ShieldCheck,
  ArrowRight, ArrowLeft, Sparkles, MapPin, User, Phone, Mail, Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { indianLocations } from '../data/locations';

const BecomeSellerPage = ({ setActivePage }) => {
  const { registerSeller } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    village: '',
    district: '',
    state: 'Maharashtra',
    businessType: 'Agriculture (Farmer)',
    address: '',
    preferredLanguage: 'Hindi',
    profilePhoto: null,
    idDocument: null,
    productPhotos: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const states = indianLocations.map(l => l.state);
  const districts = indianLocations.find(l => l.state === formData.state)?.districts.map(d => d.name) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setFormData(prev => ({ ...prev, profilePhoto: url }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.village) {
      alert("Please fill in required fields.");
      return;
    }

    registerSeller(formData);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <button
        onClick={() => setActivePage('home')}
        className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {submitted ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-[#E8F5ED] text-[#176B3A] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
              Welcome to GramSetu! Your seller profile is being reviewed.
            </h2>
            <p className="text-sm text-stone-600 max-w-xl mx-auto">
              Namaste <strong>{formData.name}</strong>! Your producer registration from <strong>{formData.village}, {formData.district}</strong> has been received. Our local Gram Kendra coordinator will verify your village credentials shortly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Business / Producer Type:</span>
              <span className="font-semibold text-stone-800">{formData.businessType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Registered Phone:</span>
              <span className="font-semibold text-stone-800">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Preferred Language:</span>
              <span className="font-semibold text-stone-800">{formData.preferredLanguage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Verification Status:</span>
              <span className="font-bold text-[#176B3A]">✓ Fast-Track Approved for Demo</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('seller-dashboard')}
              className="btn-primary text-xs px-6 py-3 font-bold"
            >
              Open Seller Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('add-product')}
              className="btn-outline text-xs px-6 py-3 font-bold"
            >
              List Your First Product
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
          {/* Form Banner */}
          <div className="bg-gradient-to-r from-[#176B3A] to-[#277D49] text-white p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-[#F4B942]" />
              </div>
              <span className="bg-[#F4B942] text-[#1F2937] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                Direct Producer Onboarding
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Sell on GramSetu
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
              Connect directly with customers across India. Zero middleman commission, fair prices, and direct bank/UPI payouts.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            {/* Step 1: Personal & Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <User className="w-4 h-4 text-[#176B3A]" />
                <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
                  1. Producer & Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Producer / Group / Farm Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Nitin Imade Kisan Sahakari Group or Siddhesh Kumbhar Crafts"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Nitin Imade"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Mobile Number (for SMS & WhatsApp Orders) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98221 00000"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="farmer@example.com"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Location & Village Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <MapPin className="w-4 h-4 text-[#176B3A]" />
                <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
                  2. Village & Rural Location
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  >
                    {states.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((d, idx) => (
                      <option key={idx} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Village / Panchayat *</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="e.g. Dindori"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-stone-700 mb-1">
                    Detailed Farm or Workshop Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Near Old Gram Panchayat office, Main Road"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Business Type & Language */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <Globe className="w-4 h-4 text-[#176B3A]" />
                <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
                  3. Production Category & Language
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Business / Producer Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  >
                    <option value="Agriculture (Farmer)">🌾 Farmer (Grains, Pulses, Seeds)</option>
                    <option value="Fresh Produce (Vegetables & Fruits)">🥬 Fresh Produce Grower</option>
                    <option value="Dairy Producer">🥛 Dairy & Cattle Producer</option>
                    <option value="Rural Artisan & Crafts">🧺 Handicrafts & Bamboo Artisan</option>
                    <option value="Organic Certified Producer">🌱 Organic Producer</option>
                    <option value="Homemade Products">🍯 Homemade Honey, Pickles, Snacks</option>
                    <option value="Handloom & Khadi">👕 Weaver / Khadi Producer</option>
                    <option value="Local Services Provider">🔧 Agricultural & Village Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Preferred Communication Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  >
                    <option value="Hindi">हिंदी (Hindi)</option>
                    <option value="Marathi">मराठी (Marathi)</option>
                    <option value="English">English</option>
                    <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                    <option value="Tamil">தமிழ் (Tamil)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Document & Photo Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <Camera className="w-4 h-4 text-[#176B3A]" />
                <h3 className="font-display font-bold text-sm text-stone-900 uppercase tracking-wider">
                  4. Verification & Profile Media
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Profile / Farm Photo */}
                <div className="p-4 border-2 border-dashed border-stone-300 rounded-2xl text-center space-y-2 bg-[#F8FAF5]">
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-[#176B3A]" />
                      <p className="text-[11px] text-[#176B3A] font-semibold">Photo uploaded</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Camera className="w-8 h-8 text-stone-400 mx-auto" />
                      <p className="font-semibold text-stone-700">Upload Producer / Farm Photo</p>
                      <p className="text-[10px] text-stone-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="inline-block px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-[11px] cursor-pointer hover:bg-stone-50"
                  >
                    Choose Photo
                  </label>
                </div>

                {/* ID / Kisan Card Simulation */}
                <div className="p-4 border-2 border-dashed border-stone-300 rounded-2xl text-center space-y-2 bg-[#F8FAF5]">
                  <FileText className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="font-semibold text-stone-700">Kisan Card / Aadhaar / Artisan Card</p>
                  <p className="text-[10px] text-stone-500">For "✓ Verified Seller" Green Badge</p>
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-semibold text-[11px] cursor-pointer hover:bg-stone-50">
                    Upload ID Document
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Policy Agreement */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#E8F5ED] text-xs text-stone-700">
              <ShieldCheck className="w-5 h-5 text-[#176B3A] shrink-0 mt-0.5" />
              <p>
                By registering, you agree to supply authentic, unadulterated products directly from your village. GramSetu guarantees zero middleman charges.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActivePage('home')}
                className="px-5 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary text-xs px-8 py-3 font-bold shadow-md"
              >
                Register as Producer
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BecomeSellerPage;
