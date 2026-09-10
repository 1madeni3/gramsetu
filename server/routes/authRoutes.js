import express from 'express';
import { store } from '../db/store.js';

const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const user = store.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Try sample accounts below!' });
  }

  // In demo prototype, compare password
  if (password && user.password && user.password !== password) {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }

  let sellerProfile = null;
  if (user.role === 'seller' && user.sellerId) {
    sellerProfile = store.getSellerById(user.sellerId);
  }

  res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    token: `demo-token-${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      village: user.village,
      district: user.district,
      state: user.state,
      sellerId: user.sellerId || null,
      sellerProfile
    }
  });
});

// Buyer Registration
router.post('/register', (req, res) => {
  const { name, email, phone, password, village, district, state } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
  }

  const existing = store.findUserByEmail(email);
  if (existing) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists' });
  }

  const newUser = store.createUser({
    name,
    email,
    phone,
    password: password || 'demo123',
    village: village || 'Gram Village',
    district: district || 'District',
    state: state || 'Maharashtra',
    role: 'buyer'
  });

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    token: `demo-token-${Date.now()}`,
    user: newUser
  });
});

// Seller Registration (Become a Seller)
router.post('/become-seller', (req, res) => {
  const {
    name,
    contactPerson,
    phone,
    email,
    village,
    district,
    state,
    businessType,
    address,
    preferredLanguage,
    profilePhoto
  } = req.body;

  if (!name || !phone || !village || !district || !state) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
  }

  // Create new seller profile
  const newSeller = store.addSeller({
    name,
    contactPerson: contactPerson || name,
    phone,
    email: email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gramsetu.in`,
    village,
    district,
    state,
    businessType: businessType || 'Agriculture',
    preferredLanguage: preferredLanguage || 'English',
    avatar: profilePhoto || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: `Verified rural producer from ${village}, ${district}. Specializes in ${businessType || 'local produce'}.`
  });

  // Create seller user account
  const newUser = store.createUser({
    name,
    email: email || newSeller.email,
    phone,
    role: 'seller',
    sellerId: newSeller.id,
    village,
    district,
    state,
    password: 'password123'
  });

  res.status(201).json({
    success: true,
    message: 'Welcome to GramSetu! Your seller profile is being reviewed.',
    token: `demo-token-${Date.now()}`,
    user: {
      ...newUser,
      sellerProfile: newSeller
    }
  });
});

export default router;
