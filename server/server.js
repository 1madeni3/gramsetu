import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { store } from './db/store.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Performance Middlewares
app.use(compression());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Lightweight Request Logger for Production Debugging
if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      if (req.path.startsWith('/api/')) {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
      }
    });
    next();
  });
}

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/reviews', reviewRoutes);

// Categories endpoint
app.get('/api/categories', (req, res) => {
  try {
    const categories = store.getCategories();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Health check with system diagnostics
app.get('/api/health', (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    status: 'online',
    platform: 'GramSetu Rural Marketplace API',
    tagline: 'Bridging Villages to Markets',
    environment: process.env.NODE_ENV || 'production',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`
    }
  });
});

// Catch-all 404 for unknown /api/* requests
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Serve compiled frontend in production (Single-server deployment)
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath, { maxAge: '1d' }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // If client/dist isn't built yet, inform visitors
  app.get('/', (req, res) => {
    res.json({
      message: 'GramSetu API is running. Frontend static build not detected in client/dist.',
      hint: 'Run `npm run build` to compile the frontend, or visit http://localhost:5173 in development mode.',
      healthCheck: '/api/health',
      documentation: 'https://github.com/1madeni3/gramsetu'
    });
  });
}

// Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

import os from 'os';

function getLocalIp() {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch {
    // fallback
  }
  return 'localhost';
}

// Start Server bound to all network interfaces for LAN / Windows deployment
const HOST = process.env.HOST || '0.0.0.0';
const server = app.listen(PORT, HOST, () => {
  const localIp = getLocalIp();
  console.log(`=========================================`);
  console.log(`🌱 GramSetu Production Server running on Windows!`);
  console.log(`🌾 Bridging Villages to Markets`);
  console.log(`💻 Local URL:        http://localhost:${PORT}`);
  console.log(`📱 Wi-Fi / LAN URL:  http://${localIp}:${PORT}`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => console.log('HTTP server closed'));
});
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => console.log('HTTP server closed'));
});
