import React from 'react';
import { MapPin, ShoppingBag, Eye, CheckCircle } from 'lucide-react';
import StarRating from '../common/StarRating';
import VerifiedBadge from '../common/VerifiedBadge';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { t, lang } = useLanguage();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const displayName = lang === 'hi' && product.nameHi
    ? product.nameHi
    : lang === 'mr' && product.nameMr
    ? product.nameMr
    : product.name;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="card-rural group flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 border border-stone-200"
    >
      {/* Product Image & Tags */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={product.images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isOrganic && (
            <span className="bg-[#176B3A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              🌱 Organic
            </span>
          )}
          {product.distanceKm !== undefined && (
            <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm border border-stone-200 flex items-center gap-0.5">
              📍 {product.distanceKm} km
            </span>
          )}
        </div>

        {/* Stock status */}
        <div className="absolute top-2.5 right-2.5">
          {product.isAvailable && product.stock > 0 ? (
            <span className="bg-[#E8F5ED] text-[#176B3A] border border-[#176B3A]/30 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
              In Stock
            </span>
          ) : (
            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-base text-stone-900 line-clamp-1 group-hover:text-[#176B3A] transition-colors">
            {displayName}
          </h3>

          {/* Seller & Village Info */}
          <div className="mt-1.5 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-stone-600 font-medium">
                {t('seller')}: <strong className="text-stone-800">{product.sellerName}</strong>
              </span>
              <VerifiedBadge size="sm" />
            </div>

            <p className="text-xs text-stone-600 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#176B3A] shrink-0" />
              <span>{product.village}, {product.district}, {product.state}</span>
            </p>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xl font-display font-extrabold text-[#176B3A]">
                ₹{product.price}
              </span>
              <span className="text-xs font-semibold text-stone-600 ml-1">
                / {product.unit}
              </span>
            </div>
            {product.minOrderQty && product.minOrderQty > 1 && (
              <span className="text-[10px] text-stone-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Min: {product.minOrderQty} {product.unit}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="py-2 px-2.5 rounded-xl border-2 border-stone-200 hover:border-[#176B3A] text-stone-700 hover:text-[#176B3A] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 bg-stone-50/50"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('viewDetails')}</span>
            </button>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!product.isAvailable || product.stock <= 0}
              className="btn-primary py-2 px-2.5 text-xs shadow-none hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('addToCart')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
