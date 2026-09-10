import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MarketplaceProvider } from './context/MarketplaceContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import VoiceListingModal from './components/common/VoiceListingModal';

// Pages
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BecomeSellerPage from './pages/BecomeSellerPage';
import SellerDashboardPage from './pages/seller/SellerDashboardPage';
import BuyerDashboardPage from './pages/buyer/BuyerDashboardPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import NearYouPage from './pages/NearYouPage';
import VoiceListingPage from './pages/VoiceListingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackedOrderId, setTrackedOrderId] = useState('GS10245');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  const handleViewProductDetails = (product) => {
    setSelectedProduct(product);
    setActivePage('product-details');
  };

  const handleTrackOrder = (orderId) => {
    setTrackedOrderId(orderId);
    setActivePage('order-tracking');
  };

  const handleOrderPlaced = (newOrderId) => {
    setTrackedOrderId(newOrderId);
    setActivePage('order-tracking');
  };

  const openVoiceModal = () => {
    setIsVoiceModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF5] text-[#1F2937]">
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openVoiceModal={openVoiceModal}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onViewDetails={handleViewProductDetails}
            openVoiceModal={openVoiceModal}
          />
        )}

        {activePage === 'marketplace' && (
          <MarketplacePage
            onViewDetails={handleViewProductDetails}
            openVoiceModal={openVoiceModal}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesPage setActivePage={setActivePage} />
        )}

        {activePage === 'near-you' && (
          <NearYouPage
            onViewDetails={handleViewProductDetails}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'product-details' && (
          <ProductDetailsPage
            product={selectedProduct}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'voice-listing' && (
          <VoiceListingPage setActivePage={setActivePage} />
        )}

        {activePage === 'cart' && (
          <CartPage
            setActivePage={setActivePage}
            onViewDetails={handleViewProductDetails}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            setActivePage={setActivePage}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {activePage === 'order-tracking' && (
          <OrderTrackingPage
            orderId={trackedOrderId}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'become-seller' && (
          <BecomeSellerPage setActivePage={setActivePage} />
        )}

        {activePage === 'seller-dashboard' && (
          <SellerDashboardPage
            setActivePage={setActivePage}
            openVoiceModal={openVoiceModal}
            defaultTab="overview"
          />
        )}

        {activePage === 'add-product' && (
          <SellerDashboardPage
            setActivePage={setActivePage}
            openVoiceModal={openVoiceModal}
            defaultTab="add-product"
          />
        )}

        {activePage === 'seller-products' && (
          <SellerDashboardPage
            setActivePage={setActivePage}
            openVoiceModal={openVoiceModal}
            defaultTab="products"
          />
        )}

        {activePage === 'buyer-dashboard' && (
          <BuyerDashboardPage
            setActivePage={setActivePage}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {activePage === 'buyer-orders' && (
          <BuyerDashboardPage
            setActivePage={setActivePage}
            onTrackOrder={handleTrackOrder}
          />
        )}

        {activePage === 'how-it-works' && (
          <HomePage
            setActivePage={setActivePage}
            onViewDetails={handleViewProductDetails}
            openVoiceModal={openVoiceModal}
          />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={setActivePage} />
        )}

        {activePage === 'contact' && (
          <ContactPage setActivePage={setActivePage} />
        )}

        {activePage === 'login' && (
          <LoginPage setActivePage={setActivePage} />
        )}

        {activePage === 'register' && (
          <RegisterPage setActivePage={setActivePage} />
        )}

        {activePage === 'settings' && (
          <SettingsPage setActivePage={setActivePage} />
        )}

        {activePage === 'profile' && (
          <BuyerDashboardPage
            setActivePage={setActivePage}
            onTrackOrder={handleTrackOrder}
          />
        )}
      </main>

      {/* Global Voice-to-Listing Modal */}
      <VoiceListingModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onProductCreated={(prod) => {
          setSelectedProduct(prod);
          setActivePage('product-details');
        }}
      />

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <MarketplaceProvider>
            <AppContent />
          </MarketplaceProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
