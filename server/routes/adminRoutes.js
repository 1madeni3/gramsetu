import express from 'express';
import { store } from '../db/store.js';

const router = express.Router();

// GET all users (with optional filtering: role, search, status, state)
router.get('/users', (req, res) => {
  try {
    const { role, search, status, state } = req.query;
    const users = store.getUsers({ role, search, status, state });
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single user by ID
router.get('/users/:id', (req, res) => {
  try {
    const user = store.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create user (Admin creation)
router.post('/users', (req, res) => {
  try {
    const { name, email, phone, role, village, district, state, status } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const existing = store.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const newUser = store.createUser({
      name,
      email,
      phone: phone || '+91 90000 00000',
      role: role || 'buyer',
      status: status || 'Active',
      village: village || 'Local Panchayat',
      district: district || 'Rural District',
      state: state || 'Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      password: 'password123'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH update user details / status / role
router.patch('/users/:id', (req, res) => {
  try {
    const updated = store.updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE user
router.delete('/users/:id', (req, res) => {
  try {
    const removed = store.deleteUser(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      message: `User '${removed.name}' removed successfully`,
      data: removed
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET platform-wide overview statistics
router.get('/stats', (req, res) => {
  try {
    const stats = store.getPlatformStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST toggle seller verification badge
router.post('/sellers/:id/verify', (req, res) => {
  try {
    const seller = store.getSellerById(req.params.id);
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller not found' });
    }
    seller.isVerified = !seller.isVerified;
    store.save();
    res.json({
      success: true,
      message: `Seller '${seller.name}' verification status set to ${seller.isVerified}`,
      isVerified: seller.isVerified
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
