import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Sparkles, CheckCircle2, ArrowRight, ArrowLeft,
  Volume2, RefreshCw, AlertCircle, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { parseSpeechToProduct } from '../components/common/VoiceListingModal';

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
  }
];

const VoiceListingPage = ({ setActivePage }) => {
  const { addNewProduct } = useMarketplace();
  const { user } = useAuth();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        let currentInterim = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
          else currentInterim += event.results[i][0].transcript;
        }
        if (currentInterim) setInterimText(currentInterim);
        if (finalTranscript) {
          setTranscript(finalTranscript);
          setExtractedData(parseSpeechToProduct(finalTranscript));
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
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
      } catch {
        simulateSpeech(SAMPLE_SPEECHES[0]);
      }
    } else {
      simulateSpeech(SAMPLE_SPEECHES[0]);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  const simulateSpeech = (sample) => {
    setIsListening(true);
    setInterimText('Listening to voice query...');
    setExtractedData(null);
    setTimeout(() => setInterimText(sample.text), 800);
    setTimeout(() => {
      setIsListening(false);
      setTranscript(sample.text);
      setInterimText('');
      setExtractedData(sample.parsed);
    }, 1600);
  };

  const handlePublish = () => {
    if (!extractedData) return;
    addNewProduct({
      ...extractedData,
      sellerId: user?.sellerId || 'seller-1',
      sellerName: user?.sellerProfile?.name || user?.name || 'Nitin Imade Kisan Sahakari Group'
    });
    setIsPublished(true);
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <button
          onClick={() => setActivePage('home')}
          className="text-xs font-semibold text-stone-600 hover:text-[#176B3A] flex items-center gap-1.5 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="flex items-center gap-3">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900">
            🎤 Sell with Voice (बोलकर बेचें)
          </h1>
          <span className="bg-[#F4B942] text-[#1F2937] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full">
            Flagship Rural Tool
          </span>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          “Not comfortable typing? Just speak and we'll create your product listing.”
        </p>
      </div>

      {isPublished ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-[#E8F5ED] text-[#176B3A] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-stone-900">
            Product Successfully Published to GramSetu!
          </h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Your listing for <strong>{extractedData?.name}</strong> at <strong>₹{extractedData?.price}/{extractedData?.unit}</strong> is now visible to thousands of buyers nationwide.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => { setExtractedData(null); setIsPublished(false); }}
              className="btn-outline text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              List Another Crop / Craft
            </button>
            <button
              onClick={() => setActivePage('marketplace')}
              className="btn-primary text-xs"
            >
              Go to Marketplace
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft space-y-8">
          {/* Central Mic Button */}
          <div className="text-center py-6 bg-[#F8FAF5] rounded-2xl border border-stone-200 p-6 space-y-4">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all mx-auto active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white mic-active'
                  : 'bg-[#176B3A] text-white hover:bg-[#12542D] hover:shadow-2xl'
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12 animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 text-[#F4B942]" />
              )}
            </button>

            <div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                {isListening ? "Listening... Speak now" : "Tap the Mic to Speak"}
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Try saying: <span className="italic text-stone-800">"I have 50 kg of onions available for ₹25 per kg."</span>
              </p>
            </div>

            {/* Recognized Voice Transcript */}
            {(isListening || interimText || transcript) && (
              <div className="p-4 rounded-xl bg-white border border-stone-300 text-left text-xs max-w-lg mx-auto shadow-sm">
                <span className="font-bold text-[#176B3A] block mb-1">
                  🗣️ {isListening ? "Listening:" : "Audio Transcript:"}
                </span>
                <p className="text-stone-800 text-sm italic font-medium">
                  {interimText || transcript || "Waiting for audio..."}
                </p>
              </div>
            )}

            {/* 1-Click Samples for Testing */}
            <div className="pt-4 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-500 block mb-2">
                Or click any simulated voice input below:
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {SAMPLE_SPEECHES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => simulateSpeech(sample)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:border-[#176B3A] hover:bg-[#E8F5ED] hover:text-[#176B3A] transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#E5A932]" />
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Extracted Details Box (Review & Edit before publishing) */}
          {extractedData && (
            <div className="bg-[#E8F5ED]/40 rounded-2xl border-2 border-[#176B3A]/30 p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E5A932]" />
                  <h3 className="font-display font-bold text-base text-stone-900">
                    Voice Extracted Information
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#176B3A]">
                  Review & edit before publishing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={extractedData.name}
                    onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
                    className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={extractedData.category}
                    onChange={(e) => setExtractedData({ ...extractedData, category: e.target.value })}
                    className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#176B3A]"
                  >
                    <option value="agriculture">🌾 Agriculture</option>
                    <option value="produce">🥬 Fresh Produce</option>
                    <option value="dairy">🥛 Dairy & Livestock</option>
                    <option value="handicrafts">🧺 Handicrafts & Art</option>
                    <option value="organic">🌱 Organic Products</option>
                    <option value="homemade">🍯 Homemade Products</option>
                    <option value="clothing">👕 Handloom & Khadi</option>
                    <option value="services">🔧 Village Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={extractedData.price}
                    onChange={(e) => setExtractedData({ ...extractedData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={extractedData.quantity}
                      onChange={(e) => setExtractedData({ ...extractedData, quantity: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#176B3A]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Unit</label>
                    <select
                      value={extractedData.unit}
                      onChange={(e) => setExtractedData({ ...extractedData, unit: e.target.value })}
                      className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#176B3A]"
                    >
                      <option value="kg">kg</option>
                      <option value="liter">liter</option>
                      <option value="piece">piece</option>
                      <option value="quintal">quintal</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={extractedData.description}
                    onChange={(e) => setExtractedData({ ...extractedData, description: e.target.value })}
                    className="w-full p-2.5 bg-white rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setExtractedData(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Clear & Re-speak
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  className="btn-accent text-xs px-6 py-2.5 font-bold shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Publish to Marketplace Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceListingPage;
