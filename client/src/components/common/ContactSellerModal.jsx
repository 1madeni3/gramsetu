import React, { useState } from 'react';
import { X, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

const ContactSellerModal = ({ seller, product, isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen || !seller) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setMessage('');
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="bg-[#176B3A] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <MessageSquare className="w-5 h-5 text-[#F4B942]" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Contact Rural Producer</h3>
              <p className="text-xs text-stone-200">Direct connection without middlemen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Seller Card Preview */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAF5] border border-stone-200/80 mb-5">
            <img
              src={seller.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"}
              alt={seller.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#176B3A]/20"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="font-semibold text-stone-900 text-sm">{seller.name}</h4>
                <VerifiedBadge size="sm" />
              </div>
              <p className="text-xs text-stone-600 flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3 text-[#176B3A]" />
                {seller.village}, {seller.district}, {seller.state}
              </p>
              {product && (
                <p className="text-xs text-stone-500 font-medium truncate">
                  Inquiring about: <span className="text-[#176B3A]">{product.name} (₹{product.price}/{product.unit})</span>
                </p>
              )}
            </div>
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-[#E8F5ED] text-[#176B3A] rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display font-semibold text-lg text-stone-900">Message Sent!</h4>
              <p className="text-sm text-stone-600 mt-1">
                The seller has been notified via SMS & GramSetu notification. They will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Direct Call & WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <a
                  href={`tel:${seller.phone || '+919822145091'}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 border-[#176B3A] text-[#176B3A] hover:bg-[#176B3A] hover:text-white transition-colors text-xs font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call: {seller.phone || '+91 98221 45091'}
                </a>
                <a
                  href={`https://wa.me/919822145091?text=Hi%20${encodeURIComponent(seller.name)},%20I%20am%20interested%20in%20your%20product%20on%20GramSetu`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] text-white hover:bg-[#1ebd59] transition-colors text-xs font-semibold"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Send a Direct Message / Inquiry
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Can you supply 100 kg of wheat to Nashik next Tuesday? What will be the wholesale rate?"
                  className="w-full text-sm p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A] focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#176B3A] shrink-0" />
                <span>Your contact details are protected under GramSetu Fair Trade Trust policy.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSellerModal;
