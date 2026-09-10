import express from 'express';
import { store } from '../db/store.js';

const router = express.Router();

// GET all orders with optional filter
router.get('/', (req, res) => {
  try {
    const orders = store.getOrders(req.query);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET order by ID (e.g. GS10245)
router.get('/:id', (req, res) => {
  try {
    const order = store.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: `Order #${req.params.id} not found` });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST place order
router.post('/', (req, res) => {
  try {
    const { buyerName, buyerPhone, buyerEmail, deliveryAddress, items, subtotal, deliveryFee, total, paymentMethod } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    const newOrder = store.createOrder({
      buyerName: buyerName || deliveryAddress?.name || 'Customer',
      buyerPhone: buyerPhone || deliveryAddress?.phone || '+91 99999 88888',
      buyerEmail: buyerEmail || 'customer@example.com',
      deliveryAddress: deliveryAddress || {
        name: buyerName,
        phone: buyerPhone,
        address: 'Village Central Chowk',
        village: 'Dindori',
        district: 'Nashik',
        state: 'Maharashtra',
        pincode: '422001'
      },
      items,
      subtotal: Number(subtotal) || 0,
      deliveryFee: Number(deliveryFee) || 40,
      total: Number(total) || 0,
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid'
    });

    res.status(201).json({ success: true, message: 'Order placed successfully!', data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updated = store.updateOrderStatus(req.params.id, status, note);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: `Order status updated to ${status}`, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
