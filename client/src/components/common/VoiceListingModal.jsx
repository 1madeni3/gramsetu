import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Volume2, X, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const SAMPLE_SPEECHES = [
  {
    lang: "en",
    label: "English: 50 kg Onions",
    text: "I have 50 kg of fresh red onions available for ₹25 per kg in Dindori village Nashik.",
    parsed: {
      name: "Fresh Red Onions",
      category: "produce",
      quantity: 50,
      unit: "kg",
      price: 25,
      village: "Dindori",
      district: "Nashik",
      state: "Maharashtra",
      description: "Direct farm harvested fresh red onions with strong aroma and long shelf life."
    }
  },
  {
    lang: "hi",
    label: "हिंदी: 30 किलो जैविक गेहूँ",
    text: "मेरे पास 30 किलो जैविक शरबती गेहूँ 45 रुपये प्रति किलो की दर से उपलब्ध है।",
    parsed: {
      name: "जैविक शरबती गेहूँ (Organic Wheat)",
      category: "agriculture",
      quantity: 30,
      unit: "kg",
      price: 45,
      village: "Dindori",
      district: "Nashik",
      state: "Maharashtra",
      description: "खेत से सीधे ताजा जैविक शरबती गेहूँ, बिना कीटनाशक।"
    }
  },
  {
    lang: "mr",
    label: "मराठी: 15 हस्तनिर्मित बांबू टोपल्या",
    text: "माझ्याकडे 15 हस्तनिर्मित बांबूच्या टोपल्या 350 रुपये प्रति नग उपलब्ध आहेत.",
    parsed: {
      name: "हस्तनिर्मित बांबूची टोपली (Handmade Bamboo Basket)",
      category: "handicrafts",
      quantity: 15,
      unit: "piece",
      price: 350,
      village: "Ranti",
      district: "Madhubani",
      state: "Bihar",
      description: "गावातील महिला कारागिरांनी हाताने विणलेली मजबूत बांबूची टोपली."
    }
  },
  {
    lang: "en",
    label: "English: 20 Liters Pure Milk",
    text: "I want to sell 20 liters of fresh buffalo milk for ₹70 per liter from Anand.",
    parsed: {
      name: "Fresh Buffalo Milk",
      category: "dairy",
      quantity: 20,
      unit: "liter",
      price: 70,
      village: "Mogri",
      district: "Anand",
      state: "Gujarat",
      description: "Daily fresh grass-fed buffalo milk with high cream content."
    }
  }
];

export const parseSpeechToProduct = (transcript) => {
  const text = transcript.toLowerCase();
  
  // Extract Quantity and Unit
  let quantity = 10;
  let unit = 'kg';
  
  const qtyMatch = text.match(/(\d+)\s*(kg|kilo|kilogram|लीटर|लिटर|liter|litre|piece|pieces|नग|क्विंटल|quintal|packet|bottle|दर्जन|dozen)?/i);
  if (qtyMatch) {
    quantity = parseInt(qtyMatch[1], 10);
    if (qtyMatch[2]) {
      const u = qtyMatch[2].toLowerCase();
      if (u.includes('kg') || u.includes('kilo') || u.includes('किलो')) unit = 'kg';
      else if (u.includes('lit') || u.includes('लीटर') || u.includes('लिटर')) unit = 'liter';
      else if (u.includes('piec') || u.includes('नग')) unit = 'piece';
      else if (u.includes('quintal') || u.includes('क्विंटल')) unit = 'quintal';
      else if (u.includes('dozen') || u.includes('दर्जन')) unit = 'dozen';
    }
  }

  // Extract Price
  let price = 50;
  const priceMatch = text.match(/(?:₹|rs\.?|rupees|रुपये|रुपया)\s*(\d+)/i) || text.match(/(\d+)\s*(?:₹|rs\.?|rupees|रुपये|रुपया|\/|per)/i);
  if (priceMatch) {
    price = parseInt(priceMatch[1], 10);
  }

  // Detect Category & Name
  let name = "Fresh Rural Farm Produce";
  let category = "produce";

  if (text.includes("onion") || text.includes("प्याज") || text.includes("कांदा")) {
    name = "Fresh Field Onions";
    category = "produce";
  } else if (text.includes("tomato") || text.includes("टमाटर") || text.includes("टोमॅटो")) {
    name = "Farm Fresh Desi Tomatoes";
    category = "produce";
  } else if (text.includes("wheat") || text.includes("गेहूं") || text.includes("गहू")) {
    name = "Organic Sharbati Wheat";
    category = "agriculture";
  } else if (text.includes("rice") || text.includes("चावल") || text.includes("तांदूळ")) {
    name = "Desi Heritage Rice";
    category = "agriculture";
  } else if (text.includes("milk") || text.includes("दूध")) {
    name = "Pure Grass-Fed Milk";
    category = "dairy";
    unit = 'liter';
  } else if (text.includes("ghee") || text.includes("घी") || text.includes("तूप")) {
    name = "Desi Cow Vedic Ghee";
    category = "dairy";
    unit = 'liter';
  } else if (text.includes("basket") || text.includes("टोकरी") || text.includes("टोपली") || text.includes("बांबू")) {
    name = "Handcrafted Bamboo Basket";
    category = "handicrafts";
    unit = 'piece';
  } else if (text.includes("honey") || text.includes("शहद") || text.includes("मध")) {
    name = "Raw Forest Honey";
    category = "homemade";
    unit = 'bottle (500g)';
  } else if (text.includes("turmeric") || text.includes("हल्दी") || text.includes("हळद")) {
    name = "Lakadong Organic Turmeric";
    category = "organic";
    unit = 'pack (500g)';
  } else if (text.includes("bag") || text.includes("थैला") || text.includes("पिशवी") || text.includes("खत")) {
    name = "Handwoven Khadi Cotton Bag";
    category = "clothing";
    unit = 'piece';
  }

  return {
    name,
    category,
    quantity,
    unit,
    price,
    description: `Direct producer listing via GramSetu Voice: "${transcript}"`,
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    images: [
      category === 'produce'
        ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
        : category === 'agriculture'
        ? 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80'
        : category === 'dairy'
        ? 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80'
    ]
  };
};

const VoiceListingModal = ({ isOpen, onClose, onProductCreated }) => {
  const { addNewProduct } = useMarketplace();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition if browser supports it
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Works for Indian English and Hinglish phrases

      recognition.onstart = () => {
        setIsListening(true);
        setInterimText('');
      };

      recognition.onresult = (event) => {
        let currentInterim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (currentInterim) setInterimText(currentInterim);
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processTranscript(finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    setExtractedData(null);
    setTranscript('');
    setInterimText('');
    setIsPublished(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
        // Fallback simulation
        simulateSpeech(SAMPLE_SPEECHES[0]);
      }
    } else {
      // Fallback for browsers without Web Speech API
      simulateSpeech(SAMPLE_SPEECHES[0]);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processTranscript = (text) => {
    const parsed = parseSpeechToProduct(text);
    setExtractedData(parsed);
  };

  const simulateSpeech = (sample) => {
    setIsListening(true);
    setTranscript('');
    setInterimText('Listening to voice input...');
    setExtractedData(null);

    setTimeout(() => {
      setInterimText(sample.text);
    }, 900);

    setTimeout(() => {
      setIsListening(false);
      setTranscript(sample.text);
      setInterimText('');
      setExtractedData(sample.parsed);
    }, 1800);
  };

  const handleFieldChange = (field, value) => {
    setExtractedData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = () => {
    if (!extractedData) return;

    const finalProduct = {
      ...extractedData,
      sellerId: user?.sellerId || 'seller-1',
      sellerName: user?.sellerProfile?.name || user?.name || 'Nitin Imade Kisan Sahakari Group',
      village: extractedData.village || user?.village || 'Dindori',
      district: extractedData.district || user?.district || 'Nashik',
      state: extractedData.state || user?.state || 'Maharashtra'
    };

    addNewProduct(finalProduct);
    setIsPublished(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    if (onProductCreated) {
      onProductCreated(finalProduct);
    }
  };

  const handleReset = () => {
    setExtractedData(null);
    setTranscript('');
    setInterimText('');
    setIsPublished(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#176B3A] to-[#277D49] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <Mic className="w-6 h-6 text-[#F4B942]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl">Sell with Voice</h3>
                <span className="bg-[#F4B942] text-[#1F2937] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                  AI Rural Powered
                </span>
              </div>
              <p className="text-xs text-stone-200 mt-0.5">
                {t('voiceDesc')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Published Success View */}
          {isPublished ? (
            <div className="text-center py-8 px-4 space-y-4">
              <div className="w-16 h-16 bg-[#E8F5ED] text-[#176B3A] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-bold text-2xl text-stone-900">
                🎉 Product Listed Successfully!
              </h4>
              <p className="text-stone-600 max-w-md mx-auto text-sm">
                Your product <strong className="text-[#176B3A]">{extractedData?.name}</strong> is now live on GramSetu marketplace with zero middlemen!
              </p>
              <div className="p-4 rounded-xl bg-[#F8FAF5] border border-stone-200 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Product:</span>
                  <span className="font-semibold">{extractedData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Price:</span>
                  <span className="font-semibold text-[#176B3A]">₹{extractedData?.price} / {extractedData?.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Quantity:</span>
                  <span className="font-semibold">{extractedData?.quantity} {extractedData?.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Location:</span>
                  <span className="font-semibold">{extractedData?.village}, {extractedData?.district}</span>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="btn-outline text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  List Another Product
                </button>
                <button
                  onClick={onClose}
                  className="btn-primary text-xs"
                >
                  View in Marketplace
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mic Centerpiece */}
              <div className="text-center py-4 bg-gradient-to-b from-[#F8FAF5] to-white rounded-2xl border border-stone-200/70 p-6 shadow-sm">
                <div className="relative inline-block mb-4">
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-95 ${
                      isListening
                        ? 'bg-rose-500 text-white mic-active'
                        : 'bg-[#176B3A] text-white hover:bg-[#12542D] hover:shadow-xl'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-10 h-10 animate-pulse" />
                    ) : (
                      <Mic className="w-10 h-10 text-[#F4B942]" />
                    )}
                  </button>
                </div>

                <h4 className="font-display font-semibold text-lg text-stone-900">
                  {isListening ? "Listening... Speak clearly now" : "Tap to Speak"}
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Say something like: <span className="italic text-stone-700">"I have 50 kg of onions available for ₹25 per kg."</span>
                </p>

                {/* Live Speech Feedback */}
                {(isListening || interimText || transcript) && (
                  <div className="mt-4 p-3.5 rounded-xl bg-stone-100 border border-stone-300/80 text-left text-xs text-stone-700">
                    <span className="font-semibold text-[#176B3A] block mb-1">
                      🗣️ {isListening ? "Listening:" : "Recognized Voice:"}
                    </span>
                    <p className="italic text-sm">
                      {interimText || transcript || "Waiting for audio..."}
                    </p>
                  </div>
                )}

                {/* Quick 1-Click Samples for Testing / Low mic support */}
                <div className="mt-5 pt-4 border-t border-stone-200/80">
                  <p className="text-xs font-semibold text-stone-600 mb-2 flex items-center justify-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#176B3A]" />
                    Or test with a sample voice query (One-click):
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SAMPLE_SPEECHES.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => simulateSpeech(sample)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:border-[#176B3A] hover:bg-[#E8F5ED] hover:text-[#176B3A] transition-all flex items-center gap-1 shadow-sm"
                      >
                        <Sparkles className="w-3 h-3 text-[#F4B942]" />
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extracted Data Review & Edit Form */}
              {extractedData && (
                <div className="bg-[#F8FAF5] rounded-2xl border border-[#176B3A]/30 p-5 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F4B942]" />
                      <h4 className="font-display font-semibold text-sm text-stone-900">
                        Review Extracted Listing Details
                      </h4>
                    </div>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Edit any field before publishing
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={extractedData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Category
                      </label>
                      <select
                        value={extractedData.category}
                        onChange={(e) => handleFieldChange('category', e.target.value)}
                        className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                      >
                        <option value="agriculture">🌾 Agriculture</option>
                        <option value="produce">🥬 Fresh Produce</option>
                        <option value="dairy">🥛 Dairy & Livestock</option>
                        <option value="handicrafts">🧺 Handicrafts & Art</option>
                        <option value="organic">🌱 Organic Products</option>
                        <option value="homemade">🍯 Homemade Products</option>
                        <option value="clothing">👕 Rural Handloom & Khadi</option>
                        <option value="services">🔧 Local Services</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          value={extractedData.price}
                          onChange={(e) => handleFieldChange('price', Number(e.target.value))}
                          className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">
                          Unit
                        </label>
                        <select
                          value={extractedData.unit}
                          onChange={(e) => handleFieldChange('unit', e.target.value)}
                          className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                        >
                          <option value="kg">kg</option>
                          <option value="liter">liter</option>
                          <option value="piece">piece</option>
                          <option value="quintal">quintal</option>
                          <option value="dozen">dozen</option>
                          <option value="bottle (500g)">bottle (500g)</option>
                          <option value="pack (500g)">pack (500g)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Available Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={extractedData.quantity}
                        onChange={(e) => handleFieldChange('quantity', Number(e.target.value))}
                        className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">
                        Village / Location
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Village"
                          value={extractedData.village}
                          onChange={(e) => handleFieldChange('village', e.target.value)}
                          className="p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                        />
                        <input
                          type="text"
                          placeholder="District"
                          value={extractedData.district}
                          onChange={(e) => handleFieldChange('district', e.target.value)}
                          className="p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={extractedData.state}
                          onChange={(e) => handleFieldChange('state', e.target.value)}
                          className="p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={extractedData.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                    >
                      Clear & Try Again
                    </button>
                    <button
                      type="button"
                      onClick={handlePublish}
                      className="btn-accent text-xs shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Publish Product to Marketplace
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceListingModal;
