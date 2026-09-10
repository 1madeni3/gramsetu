import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialCategories, initialSellers, initialProducts, initialOrders, initialReviews } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class DataStore {
  constructor() {
    this.data = {
      categories: initialCategories,
      sellers: initialSellers,
      products: initialProducts,
      orders: initialOrders,
      reviews: initialReviews,
      users: [
        {
          id: "user-buyer-1",
          name: "Aditya Shivale",
          email: "buyer@gramsetu.in",
          phone: "+91 98200 12345",
          role: "buyer",
          village: "Gangapur",
          district: "Nashik",
          state: "Maharashtra",
          password: "password123"
        },
        {
          id: "user-seller-1",
          name: "Nitin Imade",
          email: "seller@gramsetu.in",
          phone: "+91 98221 45091",
          role: "seller",
          sellerId: "seller-1",
          village: "Dindori",
          district: "Nashik",
          state: "Maharashtra",
          password: "password123"
        }
      ]
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = {
          categories: parsed.categories?.length ? parsed.categories : initialCategories,
          sellers: parsed.sellers?.length ? parsed.sellers : initialSellers,
          products: parsed.products?.length ? parsed.products : initialProducts,
          orders: parsed.orders?.length ? parsed.orders : initialOrders,
          reviews: parsed.reviews?.length ? parsed.reviews : initialReviews,
          users: parsed.users?.length ? parsed.users : this.data.users
        };
      } else {
        this.save();
      }
    } catch (err) {
      console.warn('Using in-memory default store, error reading JSON:', err.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving store to file:', err.message);
    }
  }

  // Categories
  getCategories() {
    return this.data.categories;
  }

  // Products
  getProducts(filters = {}) {
    let result = [...this.data.products];
    const { category, search, minPrice, maxPrice, state, district, rating, availableOnly, sort } = filters;

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.sellerName?.toLowerCase().includes(q) ||
        p.village?.toLowerCase().includes(q) ||
        p.district?.toLowerCase().includes(q)
      );
    }

    if (minPrice !== undefined && minPrice !== '') {
      result = result.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice !== undefined && maxPrice !== '') {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (state && state !== 'all') {
      result = result.filter(p => p.state.toLowerCase() === state.toLowerCase());
    }

    if (district && district !== 'all') {
      result = result.filter(p => p.district.toLowerCase() === district.toLowerCase());
    }

    if (rating) {
      result = result.filter(p => p.rating >= Number(rating));
    }

    if (availableOnly === 'true' || availableOnly === true) {
      result = result.filter(p => p.isAvailable && p.stock > 0);
    }

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'distance') {
      result.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
    }

    return result;
  }

  getProductById(id) {
    return this.data.products.find(p => p.id === id);
  }

  addProduct(productData) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      isAvailable: true,
      distanceKm: Math.floor(Math.random() * 25) + 5,
      ...productData
    };
    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updates) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...updates };
      this.save();
      return this.data.products[idx];
    }
    return null;
  }

  deleteProduct(id) {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Sellers
  getSellers() {
    return this.data.sellers;
  }

  getSellerById(id) {
    return this.data.sellers.find(s => s.id === id);
  }

  addSeller(sellerData) {
    const newSeller = {
      id: `seller-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      productsCount: 0,
      isVerified: true,
      joinedDate: "Recently Joined",
      badges: ["GramSetu Verified Seller"],
      ...sellerData
    };
    this.data.sellers.push(newSeller);
    this.save();
    return newSeller;
  }

  // Orders
  getOrders(filter = {}) {
    let orders = [...this.data.orders];
    if (filter.sellerId) {
      orders = orders.filter(o => o.items.some(item => item.sellerId === filter.sellerId));
    }
    if (filter.buyerEmail) {
      orders = orders.filter(o => o.buyerEmail === filter.buyerEmail);
    }
    return orders;
  }

  getOrderById(id) {
    return this.data.orders.find(o => o.id.toLowerCase() === id.toLowerCase());
  }

  createOrder(orderData) {
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
          date: "Pending confirmation",
          completed: false,
          note: "Seller is reviewing the order items"
        },
        {
          status: "Product Ready",
          date: "Awaiting packaging",
          completed: false,
          note: "Harvesting & packaging in progress"
        },
        {
          status: "Out for Delivery",
          date: "Pending dispatch",
          completed: false,
          note: "Assigned to rural logistics van"
        },
        {
          status: "Delivered",
          date: "Estimated within 24-48 hrs",
          completed: false,
          note: "OTP verification required"
        }
      ],
      trackingDetails: {
        courier: "GramSetu Rural Express Logistics",
        driverName: "Kailash Jadhav",
        driverPhone: "+91 99887 76655",
        estimatedDelivery: "Within 24-48 Hours"
      },
      ...orderData
    };
    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrderStatus(orderId, status, note = '') {
    const order = this.data.orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (!order) return null;

    order.status = status;
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const statusOrder = ["Order Placed", "Seller Accepted", "Product Ready", "Out for Delivery", "Delivered"];
    const targetIdx = statusOrder.indexOf(status);

    order.timeline = order.timeline.map((step, idx) => {
      if (idx <= targetIdx) {
        return {
          ...step,
          completed: true,
          date: step.date.includes("Pending") || step.date.includes("Awaiting") ? nowStr : step.date,
          note: idx === targetIdx && note ? note : step.note
        };
      } else {
        return { ...step, completed: false };
      }
    });

    this.save();
    return order;
  }

  // Reviews
  getReviewsByProductId(productId) {
    return this.data.reviews.filter(r => r.productId === productId);
  }

  addReview(reviewData) {
    const newReview = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      verifiedPurchase: true,
      ...reviewData
    };
    this.data.reviews.unshift(newReview);

    // Update product rating average
    const productReviews = this.data.reviews.filter(r => r.productId === reviewData.productId);
    const avg = productReviews.reduce((sum, r) => sum + Number(r.rating), 0) / productReviews.length;
    const prod = this.data.products.find(p => p.id === reviewData.productId);
    if (prod) {
      prod.rating = Number(avg.toFixed(1));
      prod.reviewsCount = productReviews.length;
    }

    this.save();
    return newReview;
  }

  // Users & Auth
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData) {
    const newUser = {
      id: `user-${Date.now()}`,
      role: 'buyer',
      ...userData
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }
}

export const store = new DataStore();
