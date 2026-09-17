# GramSetu (ग्रामसेतु) - Bridging Villages to Markets 🌾🛒

> **Rural Digital Marketplace connecting rural farmers, artisans, and small producers directly with customers and local markets across India.**

---

## 🌟 Highlights & Key Features

- **Direct Rural Trade:** Eliminates middlemen commissions; connects buyers directly with certified rural producers.
- **Flagship 🎤 "Sell with Voice":** Voice listing in simple conversational language powered by Web Speech API + intelligent NLP extraction for farmers with limited digital literacy.
- **📍 "Products Near You":** Distance radius filtering (5–150 km) and interactive village maps.
- **8 Dedicated Rural Categories:** Agriculture, Fresh Produce, Dairy & Livestock, Handicrafts & Art, Organic Products, Homemade Delicacies, Clothing & Handloom, and Local Rural Services.
- **Multilingual Support:** Instant language toggling (**English | हिंदी | मराठी**).
- **Simulated Checkout & Tracking:** UPI with QR code, Cash on Delivery (COD), cards, and a 5-step live order journey.
- **Producer & Buyer Dashboards:** Sales metrics, product inventory management, order status pipeline, and live tracking.

---

## 💻 How to Deploy & Run on Windows

### Method 1: 1-Click Launch (Easiest)
Simply double-click the **`start-windows.bat`** file in the project root folder.
- It verifies Node.js is installed.
- Builds the production frontend automatically if not yet built.
- Starts the production server and prints your **Local URL** and **Wi-Fi / LAN URL**.

### Method 2: Command Line (PowerShell or Command Prompt)
```powershell
# 1. Install all dependencies (root, client, and server)
npm run install:all

# 2. Build the production React frontend
npm run build

# 3. Start the production server
npm start
```
- Access locally: **http://localhost:5000**
- Access from phone on same Wi-Fi: **http://YOUR_LOCAL_IP:5000** (e.g. `http://192.168.1.15:5000`)

### Method 3: 24/7 Windows Background Service (Auto-restart on boot)
To keep GramSetu running continuously on your Windows PC even when the terminal is closed:
```powershell
# Install PM2 globally
npm install -g pm2

# Start GramSetu as a background service
pm2 start server/server.js --name "gramsetu"

# Configure PM2 to start on Windows boot
npm install -g pm2-windows-startup
pm2-startup install
pm2 save
```

### Method 4: Share Free Public HTTPS Link from Windows (No Cloud Needed)
To share your Windows-hosted GramSetu with anyone over the internet for free without buying hosting:
```powershell
# Using Cloudflare Tunnel (Instant & Free HTTPS):
winget install Cloudflare.cloudflared
cloudflared tunnel --url http://localhost:5000

# Or using LocalTunnel via npx:
npx localtunnel --port 5000
```

---

## 📤 What to Upload to GitHub

When committing and pushing GramSetu to GitHub, the included **`.gitignore`** automatically ensures only clean source code is uploaded:

### ✅ Files to Upload (Tracked by Git):
- `package.json` (Root orchestration scripts)
- `render.yaml` (1-click Render cloud deployment blueprint)
- `vercel.json` (Vercel SPA routing configuration)
- `Dockerfile` (Containerized deployment)
- `start-windows.bat` & `dev-windows.bat` (1-click Windows starter scripts)
- `.env.example` (Environment variables template)
- `server/` (Express API code, routes, seed data, store logic)
- `client/` (React source code, components, pages, Tailwind CSS config, Vite config)

### ❌ Files Excluded (Ignored by `.gitignore`):
- `node_modules/` (Thousands of library files — installed automatically via `npm install`)
- `client/dist/` (Production bundle generated automatically on deployment via `npm run build`)
- `.env` (Local secret keys and passwords)
- `server/data/store.json` (Dynamic runtime database file)

### Git Push Commands:
```bash
git add .
git commit -m "GramSetu production deployment ready"
git push origin main
```

---

## 🚀 Cloud Deployment Options

### Option A: Render (Unified 1-Click Fullstack — Free)
1. Push this repository to your GitHub account (`https://github.com/1madeni3/gramsetu`).
2. Go to **[render.com](https://render.com)**, click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Click **Deploy Web Service**! Render will give you a live `https://gramsetu-xxxx.onrender.com` link.

### Option B: Vercel (Frontend) + Render (Backend API)
- **Frontend on Vercel:**
  1. Import `client` repository in Vercel.
  2. Set Environment Variable: `VITE_API_BASE=https://your-backend.onrender.com/api`
  3. Deploy.
- **Backend on Render:**
  1. Create Web Service for `server/` folder.
  2. Start Command: `node server.js`.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React Icons, Canvas Confetti.
- **Backend:** Node.js, Express.js, Compression, CORS, Dotenv.
- **Data:** File/Memory DataStore with rich Indian rural seed data.
- **Deployment:** Windows Native, Render, Vercel, Docker.
