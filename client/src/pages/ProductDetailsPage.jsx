import React, { useState } from 'react';
import {
  ArrowLeft, MapPin, ShoppingBag, Zap, MessageSquare, ShieldCheck,
  Truck, Clock, CheckCircle2, Star, Calendar, Flag, Plus, Minus, Share2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';
import StarRating from '../components/common/StarRating';
import VerifiedBadge from '../components/common/VerifiedBadge';
import ContactSellerModal from '../components/common/ContactSellerModal';

const ProductDetailsPage = ({ product, setActivePage, onSelectSeller }) => {
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();
  const { sellers, reviews, addReview } = useMarketplace();

  const [quantity, setQuantity] = useState(product?.minOrderQty || 1);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewName, setNewReviewName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-stone-500">No product selected.</p>
        <button onClick={() => setActivePage('marketplace')} className="btn-primary text-xs">
          Go to Marketplace
        </button>
      </div>
    );
  }

  const seller = sellers.find(s => s.id === product.sellerId) || {
    id: product.sellerId || "seller-1",
    name: product.sellerName || "Nitin Imade Kisan Sahakari Group",
    village: product.village || "Dindori",
    district: product.district || "Nashik",
    state: product.state || "Maharashtra",
    rating: 4.8,
    reviewsCount: 124,
    productsCount: 14,
    isVerified: true,
    joinedDate: "January 2024",
    bio: "Dedicated traditional organic farmers growing high-quality crops with sustainable eco-friendly practices."
  };

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActivePage('checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    addReview({
      productId: product.id,
      userName: newReviewName.trim() || 'Verified Buyer',
      userRole: 'Verified Customer',
      rating: newReviewRating,
      comment: newReviewText.trim()
    });

    setNewReviewText('');
    setNewReviewName('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const displayName = lang === 'hi' && product.nameHi
    ? product.nameHi
    : lang === 'mr' && product.nameMr
    ? product.nameMr
    : product.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => setActivePage('marketplace')}
          className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>
      </div>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Large Main Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <img
              src={product.images?.[selectedImgIndex] || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-[#176B3A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                🌱 100% Certified Organic
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-stone-700 hover:text-[#176B3A] shadow-sm transition-colors"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="absolute top-14 right-4 bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                Link Copied!
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImgIndex === idx
                      ? 'border-[#176B3A] ring-2 ring-[#176B3A]/20'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Direct Producer Guarantee Note */}
          <div className="p-4 rounded-2xl bg-[#E8F5ED] border border-[#176B3A]/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#176B3A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#176B3A]">GramSetu Direct Guarantee</h4>
              <p className="text-[11px] text-stone-700 mt-0.5">
                Every rupee you spend goes directly to {product.sellerName}. We guarantee zero unauthorized middleman cuts and authenticate every producer's village credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A] bg-[#E8F5ED] px-3 py-1 rounded-full">
              {product.category}
            </span>
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
          </div>

          {/* Product Title */}
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
            {displayName}
          </h1>

          {/* Village & Seller Quick Location */}
          <div className="flex items-center gap-2 text-xs text-stone-600 flex-wrap">
            <span>Produced in</span>
            <strong className="text-stone-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#176B3A]" />
              {product.village}, {product.district}, {product.state}
            </strong>
            {product.distanceKm !== undefined && (
              <span className="text-[#176B3A] font-semibold bg-white px-2 py-0.5 rounded-full border border-stone-200">
                (~{product.distanceKm} km away)
              </span>
            )}
          </div>

          {/* Price & Unit Display */}
          <div className="p-5 rounded-2xl bg-[#F8FAF5] border border-stone-200/80 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-display font-extrabold text-[#176B3A]">
                ₹{product.price}
              </span>
              <span className="text-sm font-semibold text-stone-600 ml-1.5">
                / {product.unit}
              </span>
              <span className="block text-[11px] text-stone-500 mt-1">
                Inclusive of direct farmer gate price + packaging
              </span>
            </div>

            <div className="text-right">
              {product.isAvailable && product.stock > 0 ? (
                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#176B3A]">
                    <CheckCircle2 className="w-4 h-4" />
                    In Stock
                  </span>
                  <span className="block text-[11px] text-stone-500">
                    {product.stock} {product.unit} available
                  </span>
                </div>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
              Product Description
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications Table */}
          {product.specifications && (
            <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
              <div className="bg-stone-50 px-4 py-2 font-bold text-stone-700 border-b border-stone-200">
                Authenticity & Specifications
              </div>
              <div className="divide-y divide-stone-100 bg-white">
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div key={idx} className="px-4 py-2.5 flex justify-between">
                    <span className="text-stone-500 font-medium">{key}</span>
                    <span className="text-stone-800 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Select Quantity ({product.unit})
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-stone-200 rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(product.minOrderQty || 1, prev - 1))}
                  className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(product.stock || 100, prev + 1))}
                  className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-500">
                Subtotal: <strong className="text-[#176B3A] text-sm">₹{product.price * quantity}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons (Add to Cart, Buy Now, Contact Seller) */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.isAvailable || product.stock <= 0}
                className="btn-primary text-xs py-3 font-bold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('addToCart')}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.isAvailable || product.stock <= 0}
                className="btn-accent text-xs py-3 font-bold shadow"
              >
                <Zap className="w-4 h-4" />
                <span>{t('buyNow')}</span>
              </button>
            </div>

            {/* Contact Seller Button */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl border-2 border-[#176B3A] text-[#176B3A] hover:bg-[#E8F5ED] text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('contactSeller')}</span>
            </button>
          </div>

          {/* Delivery Info */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-800">
              <Truck className="w-4 h-4 text-[#176B3A]" />
              <span>{t('deliveryInfo')}</span>
            </div>
            <p className="leading-relaxed">
              {product.deliveryInfo || "Direct dispatch from farm within 24 hours via GramSetu Rural Express Logistics. Delivered to your doorstep with freshness guarantee."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Seller Information Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-4">
            <img
              src={seller.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"}
              alt={seller.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#176B3A]/20 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-lg text-stone-900">{seller.name}</h3>
                <VerifiedBadge size="sm" />
              </div>
              <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#176B3A]" />
                {seller.village}, {seller.district}, {seller.state}
              </p>
              <div className="flex items-center gap-4 text-xs text-stone-500 mt-1">
                <span>Joined: <strong>{seller.joinedDate}</strong></span>
                <span>•</span>
                <span>Active Listings: <strong>{seller.productsCount || 8} products</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="btn-outline text-xs self-start sm:self-auto"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Contact Producer
          </button>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-4xl">
          {seller.bio}
        </p>

        {seller.badges && seller.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {seller.badges.map((badge, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8F5ED] text-[#176B3A] border border-[#176B3A]/20"
              >
                ★ {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Ratings and Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Customer Ratings & Reviews ({productReviews.length})
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Honest feedback from verified community buyers
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="btn-outline text-xs self-start sm:self-auto"
          >
            {showReviewForm ? "Cancel" : t('writeReview')}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-[#F8FAF5] border border-stone-200 space-y-4 animate-fadeIn">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700">Write Your Feedback</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Anand Kumar"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Star Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5) Very Good</option>
                  <option value={3}>⭐⭐⭐ (3/5) Average</option>
                  <option value={2}>⭐⭐ (2/5) Below Expectation</option>
                  <option value={1}>⭐ (1/5) Poor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Review</label>
              <textarea
                rows={3}
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Share details about the quality, taste, or packaging of this rural product..."
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                required
              />
            </div>

            <button type="submit" className="btn-primary text-xs">
              Post Verified Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        {productReviews.length === 0 ? (
          <p className="text-xs text-stone-500 py-4">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-4 divide-y divide-stone-100">
            {productReviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900">{rev.userName}</span>
                    <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {rev.userRole}
                    </span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-[#176B3A] font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <StarRating rating={rev.rating} showCount={false} size="sm" />
                <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Seller Modal */}
      <ContactSellerModal
        seller={seller}
        product={product}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default ProductDetailsPage;
