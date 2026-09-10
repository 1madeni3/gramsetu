import express from 'express';
import { store } from '../db/store.js';

const router = express.Router();

// GET all products with optional filters
router.get('/', (req, res) => {
  try {
    const products = store.getProducts(req.query);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET product by ID
router.get('/:id', (req, res) => {
  try {
    const product = store.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const seller = store.getSellerById(product.sellerId);
    const reviews = store.getReviewsByProductId(product.id);
    res.json({ success: true, data: { ...product, seller, reviews } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add new product (supports voice listing or standard add form)
router.post('/', (req, res) => {
  try {
    const { name, category, price, unit, quantity, description, village, district, state, images, deliveryInfo, sellerId, sellerName } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Product name, category, and price are required' });
    }

    const newProduct = store.addProduct({
      name,
      category,
      price: Number(price),
      unit: unit || 'kg',
      stock: Number(quantity) || 10,
      description: description || 'Fresh rural product harvested by local producer.',
      village: village || 'Dindori',
      district: district || 'Nashik',
      state: state || 'Maharashtra',
      sellerId: sellerId || 'seller-1',
      sellerName: sellerName || 'Nitin Imade Kisan Sahakari Group',
      deliveryInfo: deliveryInfo || 'Dispatched directly from village farm within 24 hours.',
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80']
    });

    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update product
router.put('/:id', (req, res) => {
  try {
    const updated = store.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE product
router.delete('/:id', (req, res) => {
  try {
    const deleted = store.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
