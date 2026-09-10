import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = ({ setActivePage }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', category: 'General Inquiry', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: "How does GramSetu ensure zero middlemen?",
      a: "Products listed on GramSetu come directly from authenticated farmers, artisans, and self-help groups. Buyers pay the producer directly, with no commission cuts deducted by intermediaries."
    },
    {
      q: "How does 'Sell with Voice' work for elderly farmers or users who cannot type?",
      a: "Producers can simply tap the microphone and speak naturally (e.g. 'I have 50 kg of onions for 25 rupees per kg'). Our speech recognition automatically extracts the quantity, price, and crop type, creating a complete product listing in seconds."
    },
    {
      q: "How is product quality and seller credibility verified?",
      a: "Our village coordinators inspect producer fields and artisanal workshops to award the '✓ Verified Seller' badge. Buyers also review every purchase with transparent public ratings."
    },
    {
      q: "How does delivery work between rural villages and city buyers?",
      a: "GramSetu partners with local village logistics vans and state transport hubs (Gram Express) to pick up harvests directly at the farm gate and deliver to buyers within 24–48 hours."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#176B3A]">
          Gram Sahayata Kendra
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-stone-900">
          Contact & Support
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Our team and village coordinators are available to assist farmers, artisans, and buyers.
        </p>
      </div>

      {/* 3 Support Cards (Toll Free, WhatsApp, Regional Hubs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5ED] text-[#176B3A] flex items-center justify-center mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-stone-900">Kisan & Karigar Helpline</h3>
          <p className="text-xs text-stone-500">Toll-free rural support in Hindi, Marathi & English</p>
          <a href="tel:18002334726" className="text-lg font-extrabold text-[#176B3A] block hover:underline">
            1800-233-4726
          </a>
          <span className="text-[10px] text-stone-400">Available Mon - Sat (7 AM - 9 PM)</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5ED] text-[#25D366] flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-stone-900">WhatsApp Helpdesk</h3>
          <p className="text-xs text-stone-500">Instant order updates and audio message assistance</p>
          <a
            href="https://wa.me/919822145091"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5"
          >
            <span>Chat on WhatsApp</span>
          </a>
          <span className="text-[10px] text-stone-400 block">+91 98221 45091</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF7E7] text-[#E5A932] flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-base text-stone-900">Village Kendras</h3>
          <p className="text-xs text-stone-500">Rural hubs in Nashik, Anand, Madhubani & Salem</p>
          <p className="text-xs font-semibold text-stone-800">support@gramsetu.in</p>
          <span className="text-[10px] text-stone-400 block">450+ Village Representatives</span>
        </div>
      </div>

      {/* Contact Form & Office Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft space-y-6">
          <div>
            <h2 className="font-display font-bold text-xl text-stone-900">
              Send us a Message or Inquiry
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Have questions about selling your farm harvest, buying in bulk, or technical support? Fill out the form below.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-[#E8F5ED] text-[#176B3A] rounded-2xl border border-[#176B3A]/30 text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 mx-auto" />
              <h4 className="font-bold text-base">Message Sent Successfully!</h4>
              <p className="text-xs text-stone-700">
                A GramSetu coordinator will contact you at {formData.phone} within 4 working hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Nitin Imade or Aditya Shivale"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98221 00000"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Inquiry Topic</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  >
                    <option value="General Inquiry">General Question</option>
                    <option value="Farmer Registration">Farmer / Producer Onboarding</option>
                    <option value="Bulk Order">Bulk Purchase (Wholesale / Restaurant)</option>
                    <option value="Logistics Support">Village Transport & Logistics</option>
                    <option value="Report Issue">Report Issue with Product / Seller</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today? Feel free to describe your query in Hindi, Marathi, or English..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary text-xs py-3 px-6 font-bold shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Inquiry
              </button>
            </form>
          )}
        </div>

        {/* FAQ Accordion (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-base text-stone-900 pb-2 border-b border-stone-100">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3 text-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-3.5 text-left font-bold text-stone-800 flex items-center justify-between gap-2 hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-3.5 pt-0 text-stone-600 leading-relaxed bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
