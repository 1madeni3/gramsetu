import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialSellers, initialOrders, initialReviews } from '../data/initialProducts';
import { categoriesData } from '../data/categories';

const MarketplaceContext = createContext();

const API_BASE = 'http://localhost:5000/api';

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('gramsetu_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [sellers, setSellers] = useState(() => {
    try {
      const saved = localStorage.getItem('gramsetu_sellers');
      return saved ? JSON.parse(saved) : initialSellers;
    } catch {
      return initialSellers;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('gramsetu_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('gramsetu_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(100);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gramsetu_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gramsetu_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gramsetu_sellers', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('gramsetu_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Optional background fetch from API
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length) {
            setProducts(json.data);
          }
        }
      } catch {
        // Backend not reachable, keep using persistent local storage
      }
    };
    fetchApiData();
  }, []);

  const addNewProduct = (productData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      isAvailable: true,
      distanceKm: Math.floor(Math.random() * 25) + 5,
      harvestDate: "Recently Harvested",
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.quantity || productData.stock || 10)
    };

    setProducts(prev => [newProd, ...prev]);

    // Async sync with API if online
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd)
    }).catch(() => {});

    return newProd;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }).catch(() => {});
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: `GS${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      status: "Order Placed",
      timeline: [
        {
          status: "Order Placed",
          date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          completed: true,
          note: `Order placed successfully via ${orderData.paymentMethod || 'UPI'}`
        },
        {
          status: "Seller Accepted",
          date: "Within 2 Hours",
          completed: false,
          note: "Seller is confirming item availability and packaging"
        },
        {
          status: "Product Ready",
          date: "Tomorrow Morning",
          completed: false,
          note: "Packaging and cold sealing in progress"
        },
        {
          status: "Out for Delivery",
          date: "Tomorrow, 2:00 PM",
          completed: false,
          note: "Assigned to GramSetu Village Delivery Express"
        },
        {
          status: "Delivered",
          date: "Estimated 24-48 Hours",
          completed: false,
          note: "OTP verification required on arrival"
        }
      ],
      trackingDetails: {
        courier: "GramSetu Rural Express Van #MH-15-EG-4421",
        driverName: "Santosh Gaikwad",
        driverPhone: "+91 97654 33210",
        estimatedDelivery: "Within 24-48 Hours"
      },
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);

    fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, note = '') => {
    const statusOrder = ["Order Placed", "Seller Accepted", "Product Ready", "Out for Delivery", "Delivered"];
    const targetIdx = statusOrder.indexOf(newStatus);
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id.toLowerCase() === orderId.toLowerCase()) {
          const updatedTimeline = ord.timeline.map((step, idx) => {
            if (idx <= targetIdx) {
              return {
                ...step,
                completed: true,
                date: step.date.includes("Within") || step.date.includes("Tomorrow") || step.date.includes("Estimated") ? nowStr : step.date,
                note: idx === targetIdx && note ? note : step.note
              };
            }
            return { ...step, completed: false };
          });
          return { ...ord, status: newStatus, timeline: updatedTimeline };
        }
        return ord;
      })
    );

    fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, note })
    }).catch(() => {});
  };

  const addReview = (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      verifiedPurchase: true,
      ...reviewData
    };
    setReviews(prev => [newRev, ...prev]);

    // Update product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id === reviewData.productId) {
          const prodRevs = [...reviews.filter(r => r.productId === p.id), newRev];
          const avg = prodRevs.reduce((sum, r) => sum + Number(r.rating), 0) / prodRevs.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewsCount: prodRevs.length
          };
        }
        return p;
      })
    );
  };

  // Filtered products calculation
  const filteredProducts = products.filter(p => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.sellerName?.toLowerCase().includes(q) ||
        p.village?.toLowerCase().includes(q) ||
        p.district?.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    // Location: State
    if (selectedState && selectedState !== 'all') {
      if (p.state.toLowerCase() !== selectedState.toLowerCase()) return false;
    }

    // Location: District
    if (selectedDistrict && selectedDistrict !== 'all') {
      if (p.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    }

    // Location: Village
    if (selectedVillage && selectedVillage !== 'all') {
      if (p.village.toLowerCase() !== selectedVillage.toLowerCase()) return false;
    }

    // Price
    if (p.price < priceRange.min || p.price > priceRange.max) return false;

    // Rating
    if (minRating > 0 && p.rating < minRating) return false;

    // Distance
    if (maxDistance && (p.distanceKm || 0) > maxDistance) return false;

    // In Stock
    if (inStockOnly && (!p.isAvailable || p.stock <= 0)) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return (a.distanceKm || 0) - (b.distanceKm || 0);
    return 0; // default/featured
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('all');
    setSelectedDistrict('all');
    setSelectedVillage('all');
    setPriceRange({ min: 0, max: 2000 });
    setMinRating(0);
    setMaxDistance(100);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        filteredProducts,
        sellers,
        categories: categoriesData,
        orders,
        reviews,
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
        resetFilters,
        addNewProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        addReview
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => useContext(MarketplaceContext);
