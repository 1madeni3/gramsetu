import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CategoryCard = ({ category, onSelectCategory }) => {
  const { lang } = useLanguage();

  const displayName = lang === 'hi' && category.nameHi
    ? category.nameHi
    : lang === 'mr' && category.nameMr
    ? category.nameMr
    : category.name;

  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-soft hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Banner Image with gradient */}
      <div className="relative h-32 w-full overflow-hidden bg-stone-100">
        <img
          src={category.bannerImg || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Icon Floating Badge */}
        <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl border border-stone-100 group-hover:scale-110 transition-transform">
          {category.icon}
        </div>

        {/* Item count */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#176B3A] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
          {category.itemCount || 20}+ items
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-base text-stone-900 group-hover:text-[#176B3A] transition-colors">
            {displayName}
          </h3>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2">
            {category.description}
          </p>
        </div>

        {/* Subcategories tags preview */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {category.subcategories.slice(0, 3).map((sub, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
              >
                {sub}
              </span>
            ))}
            {category.subcategories.length > 3 && (
              <span className="text-[10px] text-stone-400 font-medium px-1">
                +{category.subcategories.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#176B3A] group-hover:translate-x-1 transition-transform">
          <span>Explore Products</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#176B3A]" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
