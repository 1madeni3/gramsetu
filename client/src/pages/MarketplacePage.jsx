import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, MapPin, X, RefreshCw, Mic,
  Grid, List, CheckCircle, ChevronDown, Filter
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import { indianLocations } from '../data/locations';
import ProductCard from '../components/cards/ProductCard';

const MarketplacePage = ({ onViewDetails, openVoiceModal }) => {
  const { t } = useLanguage();
  const {
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedVillage,
    setSelectedVillage,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    maxDistance,
    setMaxDistance,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    resetFilters
  } = useMarketplace();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available districts based on selected state
  const currentDistricts = selectedState !== 'all'
    ? indianLocations.find(loc => loc.state === selectedState)?.districts || []
    : [];

  // Available villages based on selected district
  const currentVillages = selectedDistrict !== 'all'
    ? currentDistricts.find(d => d.name === selectedDistrict)?.villages || []
    : [];

  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    setSelectedDistrict('all');
    setSelectedVillage('all');
  };

  const handleDistrictChange = (districtName) => {
    setSelectedDistrict(districtName);
    setSelectedVillage('all');
  };

  const quickSearchPills = [
    "Organic Wheat",
    "Fresh Tomatoes",
    "Handmade Baskets",
    "Buffalo Milk",
    "Wild Honey",
    "Turmeric Powder"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Large Search Section */}
      <div className="bg-gradient-to-r from-[#176B3A] to-[#277D49] rounded-3xl p-6 sm:p-10 text-white shadow-lg space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F4B942] block mb-1">
            Rural Digital Marketplace
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            Direct Products from Indian Villages
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 mt-1">
            Zero middlemen. Sourced directly from verified farmers, weavers, artisans, and dairy producers.
          </p>
        </div>

        {/* Large Search Input */}
        <div className="relative max-w-3xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for? (e.g. Tomatoes, Handmade baskets, Organic wheat...)"
              className="w-full pl-12 pr-28 py-3.5 bg-white text-stone-900 rounded-2xl shadow-md border-0 text-sm focus:outline-none focus:ring-4 focus:ring-[#F4B942]/60 placeholder:text-stone-400"
            />
            <Search className="w-5 h-5 text-[#176B3A] absolute left-4" />

            {/* Voice listing shortcut */}
            <button
              type="button"
              onClick={openVoiceModal}
              className="absolute right-2 px-3 py-1.5 rounded-xl bg-[#FEF7E7] hover:bg-[#F4B942] text-[#1F2937] font-semibold text-xs transition-colors flex items-center gap-1.5 border border-[#F4B942]"
              title="Search or sell with voice"
            >
              <Mic className="w-3.5 h-3.5 text-[#176B3A]" />
              <span>Voice</span>
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            <span className="text-stone-300 text-[11px] font-medium">Popular:</span>
            {quickSearchPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchQuery(pill)}
                className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
              >
                {pill}
              </button>
            ))}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-white/80 hover:text-white underline text-[11px] ml-1"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between pb-2 border-b border-stone-200">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-800 shadow-sm"
          >
            <Filter className="w-4 h-4 text-[#176B3A]" />
            <span>Filters & Locations</span>
          </button>
          <span className="text-xs font-semibold text-stone-600">
            {filteredProducts.length} items found
          </span>
        </div>

        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-white rounded-2xl border border-stone-200 p-5 shadow-soft space-y-6`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#176B3A]" />
              <h3 className="font-display font-bold text-sm text-stone-900">
                Filter Marketplace
              </h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#176B3A] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Category
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#176B3A] text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>🌾 All Categories</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#176B3A] text-white font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-white/80' : 'text-stone-400'}`}>
                    {cat.itemCount || 10}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Location Filters (State, District, Village) */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#176B3A]" />
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Location
              </label>
            </div>

            {/* State Select */}
            <div>
              <span className="text-[11px] font-semibold text-stone-600 block mb-1">State:</span>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-[#F8FAF5] focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              >
                <option value="all">All States of India</option>
                {indianLocations.map((loc, idx) => (
                  <option key={idx} value={loc.state}>{loc.state}</option>
                ))}
              </select>
            </div>

            {/* District Select */}
            {selectedState !== 'all' && (
              <div>
                <span className="text-[11px] font-semibold text-stone-600 block mb-1">District:</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-[#F8FAF5] focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                >
                  <option value="all">All Districts</option>
                  {currentDistricts.map((d, idx) => (
                    <option key={idx} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Village Select */}
            {selectedDistrict !== 'all' && (
              <div>
                <span className="text-[11px] font-semibold text-stone-600 block mb-1">Village / Town:</span>
                <select
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-[#F8FAF5] focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                >
                  <option value="all">All Villages / Panchayats</option>
                  {currentVillages.map((v, idx) => (
                    <option key={idx} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 3. Price Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-700">Max Price</span>
              <span className="font-extrabold text-[#176B3A]">₹{priceRange.max}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-full accent-[#176B3A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium">
              <span>₹0</span>
              <span>₹1000</span>
              <span>₹2000+</span>
            </div>
          </div>

          {/* 4. Distance Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-700">Distance Radius</span>
              <span className="font-extrabold text-[#176B3A]">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-[#176B3A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-medium">
              <span>5 km</span>
              <span>75 km</span>
              <span>150 km</span>
            </div>
          </div>

          {/* 5. Rating Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <span className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Minimum Rating
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 3, 4, 4.5].map((val) => (
                <button
                  key={val}
                  onClick={() => setMinRating(val)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    minRating === val
                      ? 'bg-[#176B3A] text-white border-[#176B3A]'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {val === 0 ? 'All' : `${val}★+`}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Availability */}
          <div className="pt-3 border-t border-stone-100">
            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#176B3A] focus:ring-[#176B3A] w-4 h-4 accent-[#176B3A]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Products Grid & View Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="text-xs text-stone-600 font-medium">
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> authentic products
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-stone-600">{t('sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1.5 px-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                >
                  <option value="featured">Featured (Verified First)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest Distance</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow text-[#176B3A]' : 'text-stone-500'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white shadow text-[#176B3A]' : 'text-stone-500'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          {(selectedCategory !== 'all' || selectedState !== 'all' || searchQuery || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium text-[11px]">Applied filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F5ED] text-[#176B3A] font-semibold text-[11px]">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedState !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F5ED] text-[#176B3A] font-semibold text-[11px]">
                  State: {selectedState}
                  <button onClick={() => setSelectedState('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF7E7] text-[#1F2937] font-semibold text-[11px]">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 font-semibold text-[11px]">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Render */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FEF7E7] text-[#E5A932] flex items-center justify-center text-3xl mx-auto">
                🌾
              </div>
              <h3 className="font-display font-bold text-xl text-stone-800">
                No products found matching your filters
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Try broadening your location radius, adjusting the price range, or searching for other agricultural produce.
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onViewDetails(prod)}
                  className="card-rural p-4 flex flex-col sm:flex-row gap-4 items-center justify-between cursor-pointer hover:border-[#176B3A] transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={prod.images?.[0]}
                      alt={prod.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-stone-900">{prod.name}</h4>
                        <span className="text-[10px] font-bold uppercase text-[#176B3A] bg-[#E8F5ED] px-2 py-0.5 rounded">
                          {prod.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">
                        {prod.sellerName} • 📍 {prod.village}, {prod.district}
                      </p>
                      <p className="text-xs text-stone-500 line-clamp-1">{prod.description}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-extrabold text-[#176B3A]">₹{prod.price}</span>
                      <span className="text-xs text-stone-500"> / {prod.unit}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onViewDetails(prod); }}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
