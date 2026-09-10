import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Filter, RefreshCw, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { indianLocations } from '../data/locations';
import ProductCard from '../components/cards/ProductCard';

const NearYouPage = ({ onViewDetails, setActivePage }) => {
  const {
    products,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedVillage,
    setSelectedVillage,
    maxDistance,
    setMaxDistance
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'map'

  // Districts based on selectedState
  const currentDistricts = selectedState !== 'all'
    ? indianLocations.find(l => l.state === selectedState)?.districts || []
    : [];

  // Villages based on selectedDistrict
  const currentVillages = selectedDistrict !== 'all'
    ? currentDistricts.find(d => d.name === selectedDistrict)?.villages || []
    : [];

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict('all');
    setSelectedVillage('all');
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedVillage('all');
  };

  // Filter products by location & radius
  const localProducts = products.filter(p => {
    if (selectedState !== 'all' && p.state.toLowerCase() !== selectedState.toLowerCase()) return false;
    if (selectedDistrict !== 'all' && p.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    if (selectedVillage !== 'all' && p.village.toLowerCase() !== selectedVillage.toLowerCase()) return false;
    if ((p.distanceKm || 0) > maxDistance) return false;
    return true;
  }).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#176B3A] to-[#277D49] rounded-3xl p-6 sm:p-10 text-white shadow-lg space-y-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#F4B942] mb-2 border border-white/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Hyperlocal Village Commerce</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            📍 Products Near You
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 mt-1">
            Discover fresh harvest, dairy, and handcrafted goods from farms within walking or quick van delivery distance.
          </p>
        </div>

        {/* Location Dropdowns Bar */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {/* State */}
          <div>
            <span className="text-white/80 block font-semibold mb-1">State:</span>
            <select
              value={selectedState}
              onChange={(e) => handleStateSelect(e.target.value)}
              className="w-full p-2.5 rounded-xl border-0 bg-white text-stone-900 font-semibold focus:ring-2 focus:ring-[#F4B942]"
            >
              <option value="all">All States</option>
              {indianLocations.map((l, idx) => (
                <option key={idx} value={l.state}>{l.state}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <span className="text-white/80 block font-semibold mb-1">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              className="w-full p-2.5 rounded-xl border-0 bg-white text-stone-900 font-semibold focus:ring-2 focus:ring-[#F4B942]"
            >
              <option value="all">All Districts</option>
              {currentDistricts.map((d, idx) => (
                <option key={idx} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Village */}
          <div>
            <span className="text-white/80 block font-semibold mb-1">Village / Panchayat:</span>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full p-2.5 rounded-xl border-0 bg-white text-stone-900 font-semibold focus:ring-2 focus:ring-[#F4B942]"
            >
              <option value="all">All Nearby Villages</option>
              {currentVillages.map((v, idx) => (
                <option key={idx} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex justify-between text-white/90 font-semibold mb-1">
              <span>Radius:</span>
              <span className="text-[#F4B942] font-bold">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-[#F4B942] cursor-pointer mt-2"
            />
          </div>
        </div>
      </div>

      {/* View Toggle Bar */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-stone-600 font-medium">
          Found <strong className="text-stone-900">{localProducts.length}</strong> products near you
        </div>

        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'list' ? 'bg-white shadow text-[#176B3A]' : 'text-stone-600'}`}
          >
            List & Cards
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'map' ? 'bg-white shadow text-[#176B3A]' : 'text-stone-600'}`}
          >
            🗺️ Village Map View
          </button>
        </div>
      </div>

      {/* Content Render */}
      {activeTab === 'map' ? (
        /* Interactive Map Mockup representing rural hubs */
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-soft p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-display font-bold text-base text-stone-900">
                Panchayat & Rural Producer Hubs Map
              </h3>
              <p className="text-xs text-stone-500">
                Green pins represent verified farmers and artisan cooperatives in your radius.
              </p>
            </div>
            <span className="text-xs font-bold text-[#176B3A] bg-[#E8F5ED] px-3 py-1 rounded-full">
              GPS Active
            </span>
          </div>

          {/* Map Graphic Canvas */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-[#E2ECE5] border border-stone-300 flex items-center justify-center">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-agro-pattern opacity-60"></div>

            {/* Roads & Region Graphic */}
            <svg className="w-full h-full absolute inset-0 opacity-40" viewBox="0 0 800 350">
              <path d="M 50 180 Q 250 80 400 190 T 750 160" stroke="#176B3A" strokeWidth="6" fill="none" strokeDasharray="8 8" />
              <path d="M 200 40 Q 300 200 500 220 T 700 320" stroke="#4F9D45" strokeWidth="4" fill="none" />
              <path d="M 380 50 L 420 320" stroke="#F4B942" strokeWidth="3" fill="none" />
            </svg>

            {/* Interactive Pins */}
            {localProducts.slice(0, 5).map((p, idx) => {
              const offsets = [
                { top: '35%', left: '28%' },
                { top: '55%', left: '48%' },
                { top: '25%', left: '62%' },
                { top: '65%', left: '32%' },
                { top: '45%', left: '78%' }
              ];
              const pos = offsets[idx % offsets.length];

              return (
                <div
                  key={p.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => onViewDetails(p)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#176B3A] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-125 transition-transform">
                    <span className="text-base">{p.category === 'produce' ? '🥬' : p.category === 'dairy' ? '🥛' : '🌾'}</span>
                  </div>
                  {/* Tooltip Card */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-white p-2.5 rounded-xl shadow-xl border border-stone-200 hidden group-hover:block z-20 text-xs">
                    <p className="font-bold text-stone-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-[#176B3A] font-extrabold">₹{p.price} / {p.unit}</p>
                    <p className="text-[10px] text-stone-500">📍 {p.village} ({p.distanceKm || 12} km away)</p>
                  </div>
                </div>
              );
            })}

            {/* User Center Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg animate-ping"></div>
              <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg absolute"></div>
              <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 shadow">
                You are here
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* List Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NearYouPage;
