import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import CategoryCard from '../components/cards/CategoryCard';

const CategoriesPage = ({ setActivePage }) => {
  const { categories, setSelectedCategory } = useMarketplace();
  const { t } = useLanguage();

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    setActivePage('marketplace');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <button
            onClick={() => setActivePage('home')}
            className="text-xs font-semibold text-[#176B3A] flex items-center gap-1.5 mb-2 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
          <h1 className="font-display font-extrabold text-3xl text-stone-900">
            Explore Rural Marketplace Categories
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse our 8 foundational rural sectors. Everything is sourced directly from village producers.
          </p>
        </div>

        <button
          onClick={() => setActivePage('marketplace')}
          className="btn-outline text-xs self-start sm:self-auto"
        >
          View All Products ({categories.reduce((sum, c) => sum + (c.itemCount || 0), 0)}+)
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of 8 Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onSelectCategory={handleSelect}
          />
        ))}
      </div>

      {/* Additional Rural Services Banner */}
      <div className="bg-[#E8F5ED] border border-[#176B3A]/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔧</span>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Need Local Village Machinery & Agricultural Services?
            </h3>
          </div>
          <p className="text-xs text-stone-600 max-w-2xl">
            GramSetu also connects farmers with tractor rentals, harvester machines, borewell technicians, and soil testing labs right in nearby villages.
          </p>
        </div>

        <button
          onClick={() => handleSelect('services')}
          className="btn-primary text-xs px-5 py-2.5 shrink-0"
        >
          Browse Village Services
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
