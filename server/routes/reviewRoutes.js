import express from 'express';
import { store } from '../db/store.js';

const router = express.Router();

// GET reviews for a product
router.get('/:productId', (req, res) => {
  try {
    const reviews = store.getReviewsByProductId(req.params.productId);
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add new review
router.post('/', (req, res) => {
  try {
    const { productId, userName, userRole, rating, comment } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Product ID, rating, and review comment are required' });
    }

    const newReview = store.addReview({
      productId,
      userName: userName || 'GramSetu Buyer',
      userRole: userRole || 'Verified Customer',
      rating: Number(rating),
      comment
    });

    res.status(201).json({ success: true, message: 'Review posted successfully!', data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
