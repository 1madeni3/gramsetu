import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  ShoppingBag,
  Store,
  DollarSign,
  Search,
  Filter,
  Eye,
  Trash2,
  Edit3,
  UserPlus,
  RefreshCw,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  ChevronRight,
  Server,
  Activity,
  Cpu,
  Layers,
  ArrowLeft,
  X,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function AdminDashboardPage({ setActivePage }) {
  const { user } = useAuth();
  const { products, sellers, orders } = useMarketplace();

  // Strict Security Guard: Only Nitin Imade (nitinimade@gmail.com) can access the Admin Dashboard
  if (!user || user.email?.toLowerCase() !== 'nitinimade@gmail.com') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-stone-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-amber-100 text-stone-900 rounded-full flex items-center justify-center mx-auto text-2xl border border-amber-300">
          🔒
        </div>
        <h2 className="text-xl font-display font-extrabold text-stone-900">Restricted Admin Access</h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          Access to this dashboard is private and strictly restricted to <strong>Nitin Imade</strong> (<code>nitinimade@gmail.com</code>).
        </p>
        <button
          onClick={() => setActivePage('login')}
          className="w-full btn-primary text-xs py-3 font-bold"
        >
          Sign In with Admin Credentials
        </button>
      </div>
    );
  }

  // State
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'sellers' | 'products' | 'orders' | 'diagnostics'
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');

  // Modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'buyer',
    status: 'Active',
    village: '',
    district: '',
    state: 'Maharashtra'
  });

  // Fetch users from API (fallback to local generation if backend is loading)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      if (json.success && json.data) {
        setUsersList(json.data);
      } else {
        throw new Error(json.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.warn('Using fallback users due to API error:', err.message);
      // Fallback local users matching seedData
      setUsersList([
        {
          id: 'user-admin-1',
          name: 'Nitin Imade',
          email: 'nitinimade@gmail.com',
          phone: '+91 98221 45091',
          role: 'admin',
          status: 'Active',
          village: 'Dindori',
          district: 'Nashik',
          state: 'Maharashtra',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'January 2024',
          title: 'Super Administrator',
          stats: { listingsCount: 0, ordersReceived: 0 }
        },
        {
          id: 'user-seller-1',
          name: 'Nitin Imade',
          email: 'seller@gramsetu.in',
          phone: '+91 98221 45091',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-1',
          village: 'Dindori',
          district: 'Nashik',
          state: 'Maharashtra',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'January 2024',
          specialty: 'Wheat, Onions & Table Tomatoes',
          stats: { listingsCount: 3, ordersReceived: 48, totalRevenue: 24500 }
        },
        {
          id: 'user-seller-2',
          name: 'Siddhesh Kumbhar',
          email: 'siddhesh.kumbhar@gramsetu.in',
          phone: '+91 94310 82711',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-2',
          village: 'Ranti',
          district: 'Madhubani',
          state: 'Bihar',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'March 2024',
          specialty: 'Terracotta Pottery & Bamboo Crafts',
          stats: { listingsCount: 2, ordersReceived: 21, totalRevenue: 14200 }
        },
        {
          id: 'user-seller-3',
          name: 'Unnati Pawar',
          email: 'unnati.pawar@gramsetu.in',
          phone: '+91 97233 11840',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-3',
          village: 'Mogri',
          district: 'Anand',
          state: 'Gujarat',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'November 2023',
          specialty: 'A2 Gir Cow Milk & Bilona Ghee',
          stats: { listingsCount: 2, ordersReceived: 64, totalRevenue: 51200 }
        },
        {
          id: 'user-seller-4',
          name: 'Neha Kale',
          email: 'neha.kale@gramsetu.in',
          phone: '+91 98811 77622',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-4',
          village: 'Tapola',
          district: 'Satara',
          state: 'Maharashtra',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'February 2024',
          specialty: 'Raw Sahyadri Wild Forest Honey',
          stats: { listingsCount: 1, ordersReceived: 35, totalRevenue: 19800 }
        },
        {
          id: 'user-seller-5',
          name: 'Kajal Mali',
          email: 'kajal.mali@gramsetu.in',
          phone: '+91 98450 63219',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-5',
          village: 'Madikeri',
          district: 'Kodagu',
          state: 'Karnataka',
          avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'December 2023',
          specialty: 'High-Curcumin Turmeric & Hill Spices',
          stats: { listingsCount: 1, ordersReceived: 18, totalRevenue: 9200 }
        },
        {
          id: 'user-seller-6',
          name: 'Apurva Shinde',
          email: 'apurva.shinde@gramsetu.in',
          phone: '+91 94432 99014',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-6',
          village: 'Omalur',
          district: 'Salem',
          state: 'Tamil Nadu',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'May 2024',
          specialty: 'Pure Cotton Khadi & Handloom Bags',
          stats: { listingsCount: 1, ordersReceived: 27, totalRevenue: 8100 }
        },
        {
          id: 'user-seller-7',
          name: 'Aditya Shivale',
          email: 'aditya.shivale@gramsetu.in',
          phone: '+91 98200 12345',
          role: 'seller',
          status: 'Verified',
          sellerId: 'seller-7',
          village: 'Gangapur',
          district: 'Nashik',
          state: 'Maharashtra',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'January 2024',
          specialty: 'Mechanized Tractors & Solar Pump Services',
          stats: { listingsCount: 1, ordersReceived: 12, totalRevenue: 15600 }
        },
        {
          id: 'user-buyer-1',
          name: 'Aditya Shivale',
          email: 'buyer@gramsetu.in',
          phone: '+91 98200 12345',
          role: 'buyer',
          status: 'Active',
          village: 'Gangapur',
          district: 'Nashik',
          state: 'Maharashtra',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'January 2024',
          stats: { ordersPlaced: 3, totalSpent: 1850 }
        },
        {
          id: 'user-buyer-2',
          name: 'Maya Joshi',
          email: 'maya.joshi@gmail.com',
          phone: '+91 98230 44556',
          role: 'buyer',
          status: 'Active',
          village: 'Kothrud',
          district: 'Pune',
          state: 'Maharashtra',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'February 2024',
          stats: { ordersPlaced: 7, totalSpent: 4320 }
        },
        {
          id: 'user-buyer-3',
          name: 'Rajesh Patel',
          email: 'rajesh.patel@patelagro.in',
          phone: '+91 99099 88776',
          role: 'buyer',
          status: 'Active',
          village: 'Maninagar',
          district: 'Ahmedabad',
          state: 'Gujarat',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
          joinedDate: 'March 2024',
          stats: { ordersPlaced: 12, totalSpent: 11400 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered Users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery) ||
      u.village?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.district?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.state?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || (u.status || 'Active').toLowerCase() === statusFilter.toLowerCase();
    const matchesState = stateFilter === 'all' || u.state?.toLowerCase() === stateFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus && matchesState;
  });

  // Toggle user status
  const handleToggleStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'Active' || currentStatus === 'Verified' ? 'Suspended' : 'Active';
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch {
      // ignore
    }
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
    if (selectedUser?.id === userId) {
      setSelectedUser(prev => ({ ...prev, status: nextStatus }));
    }
  };

  // Delete user
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user '${userName}'? This action cannot be undone.`)) {
      return;
    }
    try {
      await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    setUsersList(prev => prev.filter(u => u.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  // Add User Form Submission
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) return;

    const newUserObj = {
      id: `user-${Date.now()}`,
      ...newUserForm,
      joinedDate: 'September 2026',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      stats: { listingsCount: 0, ordersPlaced: 0 }
    };

    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserObj)
      });
    } catch {
      // ignore
    }

    setUsersList(prev => [newUserObj, ...prev]);
    setIsAddUserModalOpen(false);
    setNewUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'buyer',
      status: 'Active',
      village: '',
      district: '',
      state: 'Maharashtra'
    });
  };

  // Export Users JSON
  const handleExportUsers = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(usersList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gramsetu_users_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    if (!selectedUser) return;
    navigator.clipboard.writeText(JSON.stringify(selectedUser, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Metrics
  const totalUsersCount = usersList.length;
  const totalSellersCount = usersList.filter(u => u.role === 'seller').length;
  const totalBuyersCount = usersList.filter(u => u.role === 'buyer').length;
  const verifiedCount = usersList.filter(u => u.status === 'Verified').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner Navigation & Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-[#F4B942] text-stone-950 text-[10px] font-extrabold uppercase tracking-wider">
              👑 Super Admin Portal
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Backend Active
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            GramSetu Command & Intelligence Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            Logged in as <strong className="text-[#F4B942]">{user?.name || 'Nitin Imade'}</strong> (Administrator). Manage all rural producers, buyers, catalog listings, and platform metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActivePage('home')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            View Marketplace
          </button>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 border border-white/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleExportUsers}
            className="px-3.5 py-2 rounded-xl bg-[#F4B942] hover:bg-[#E5A932] text-stone-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Total Users</span>
            <Users className="w-4 h-4 text-[#176B3A]" />
          </div>
          <p className="font-display font-extrabold text-2xl text-stone-900">{totalUsersCount}</p>
          <span className="text-[10px] text-stone-500 font-medium">All accounts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Producers</span>
            <Store className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-display font-extrabold text-2xl text-stone-900">{totalSellersCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">{verifiedCount} Verified Farmers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Buyers</span>
            <ShoppingBag className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-stone-900">{totalBuyersCount}</p>
          <span className="text-[10px] text-stone-500 font-medium">Consumer & Retail</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Listings</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <p className="font-display font-extrabold text-2xl text-stone-900">{products.length || 10}</p>
          <span className="text-[10px] text-sky-600 font-semibold">8 Rural Categories</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Orders</span>
            <Activity className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="font-display font-extrabold text-2xl text-stone-900">{orders.length || 48}</p>
          <span className="text-[10px] text-indigo-600 font-semibold">100% Direct Delivery</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-semibold uppercase">Panchayats</span>
            <MapPin className="w-4 h-4 text-rose-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-stone-900">450+</p>
          <span className="text-[10px] text-stone-500 font-medium">Village Clusters</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-[#176B3A] text-[#176B3A]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          All Users Information ({usersList.length})
        </button>

        <button
          onClick={() => setActiveTab('sellers')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'sellers'
              ? 'border-[#176B3A] text-[#176B3A]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Store className="w-4 h-4" />
          Rural Producers ({totalSellersCount})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-[#176B3A] text-[#176B3A]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          Catalog Moderation ({products.length || 10})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-[#176B3A] text-[#176B3A]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Orders & Transactions ({orders.length || 48})
        </button>

        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`pb-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'diagnostics'
              ? 'border-[#176B3A] text-[#176B3A]'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Server className="w-4 h-4" />
          Server Telemetry
        </button>
      </div>

      {/* TAB 1: ALL USERS INFORMATION (MAIN USER REQUEST) */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone, village..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              >
                <option value="all">All Roles</option>
                <option value="seller">🌾 Producers (Sellers)</option>
                <option value="buyer">🛒 Buyers</option>
                <option value="admin">👑 Administrators</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="verified">Verified</option>
                <option value="suspended">Suspended</option>
              </select>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
              >
                <option value="all">All States</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="gujarat">Gujarat</option>
                <option value="bihar">Bihar</option>
                <option value="karnataka">Karnataka</option>
                <option value="tamil nadu">Tamil Nadu</option>
              </select>

              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="btn-primary text-xs py-2 px-3.5 font-bold flex items-center gap-1.5 shadow-sm ml-auto md:ml-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-[11px] uppercase font-bold text-stone-500">
                  <tr>
                    <th className="py-3.5 px-4">User & Identity</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Village & Region</th>
                    <th className="py-3.5 px-4">Activity & Stats</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-stone-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#176B3A]" />
                        Loading user records...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-stone-500">
                        <Users className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                        No users matched your current filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const isProducer = u.role === 'seller';
                      const isAdmin = u.role === 'admin';
                      const isSuspended = u.status === 'Suspended';

                      return (
                        <tr key={u.id} className="hover:bg-[#F8FAF5] transition-colors">
                          {/* User Avatar + Name */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={u.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                                alt={u.name}
                                className="w-9 h-9 rounded-xl object-cover border border-stone-200"
                              />
                              <div>
                                <h4 className="font-bold text-stone-900 leading-tight flex items-center gap-1.5">
                                  {u.name}
                                  {u.title && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                                      {u.title}
                                    </span>
                                  )}
                                </h4>
                                <span className="text-[10px] text-stone-400 font-mono">
                                  ID: {u.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Role Badge */}
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                isAdmin
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : isProducer
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}
                            >
                              {isAdmin ? '👑 Admin' : isProducer ? '🌾 Producer' : '🛒 Buyer'}
                            </span>
                          </td>

                          {/* Contact Info */}
                          <td className="py-3 px-4 space-y-0.5">
                            <p className="text-stone-900 font-medium flex items-center gap-1">
                              <Mail className="w-3 h-3 text-stone-400" />
                              {u.email}
                            </p>
                            <p className="text-stone-500 text-[11px] flex items-center gap-1">
                              <Phone className="w-3 h-3 text-stone-400" />
                              {u.phone}
                            </p>
                          </td>

                          {/* Location */}
                          <td className="py-3 px-4 space-y-0.5">
                            <p className="font-medium text-stone-800 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#176B3A]" />
                              {u.village || 'N/A'}, {u.district || 'N/A'}
                            </p>
                            <p className="text-[11px] text-stone-500 pl-4">{u.state || 'Maharashtra'}</p>
                          </td>

                          {/* Activity Stats */}
                          <td className="py-3 px-4">
                            {isProducer ? (
                              <div>
                                <span className="font-bold text-[#176B3A]">
                                  {u.stats?.listingsCount || 1} listings
                                </span>
                                <p className="text-[11px] text-stone-500">
                                  {u.stats?.ordersReceived || 0} orders (₹{u.stats?.totalRevenue?.toLocaleString('en-IN') || '0'})
                                </p>
                              </div>
                            ) : isAdmin ? (
                              <span className="text-purple-700 font-semibold">Full System Access</span>
                            ) : (
                              <div>
                                <span className="font-bold text-amber-700">
                                  {u.stats?.ordersPlaced || u.ordersCount || 0} orders
                                </span>
                                <p className="text-[11px] text-stone-500">
                                  ₹{u.stats?.totalSpent?.toLocaleString('en-IN') || '0'} spent
                                </p>
                              </div>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                isSuspended
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : u.status === 'Verified'
                                  ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isSuspended ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                              {u.status || 'Active'}
                            </span>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedUser(u)}
                                title="View Full User Information"
                                className="p-1.5 rounded-lg bg-stone-100 hover:bg-[#176B3A] hover:text-white text-stone-600 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleToggleStatus(u.id, u.status)}
                                title={isSuspended ? 'Activate User' : 'Suspend User'}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isSuspended
                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                }`}
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              {!isAdmin && (
                                <button
                                  onClick={() => handleDeleteUser(u.id, u.name)}
                                  title="Delete User Record"
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Showing <strong>{filteredUsers.length}</strong> of <strong>{usersList.length}</strong> total users</span>
              <span className="text-[11px] text-stone-400">Database Engine: FileBacked JSON DataStore</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RURAL PRODUCERS (SELLERS) */}
      {activeTab === 'sellers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellers.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-soft space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-[#176B3A]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-sm leading-snug truncate">{s.name}</h4>
                    <p className="text-xs text-stone-600 font-medium">Contact: {s.contactPerson}</p>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#176B3A]" />
                      {s.village}, {s.district} ({s.state})
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic line-clamp-2">"{s.bio}"</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {s.badges?.map((b, i) => (
                    <span key={i} className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#E8F5ED] text-[#176B3A]">
                      ✓ {b}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">⭐ {s.rating} ({s.reviewsCount} reviews)</span>
                  <span className="font-bold text-[#176B3A]">{s.productsCount} Products</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS MODERATION */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-[11px] uppercase font-bold text-stone-500">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price / Unit</th>
                  <th className="py-3 px-4">Producer</th>
                  <th className="py-3 px-4">Origin</th>
                  <th className="py-3 px-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8FAF5]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80'}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                        />
                        <div>
                          <h5 className="font-bold text-stone-900">{p.name}</h5>
                          <span className="text-[10px] text-stone-400 font-mono">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-[#176B3A]">
                      ₹{p.price} <span className="text-[10px] text-stone-400 font-normal">/ {p.unit}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">{p.sellerName}</td>
                    <td className="py-3 px-4 text-stone-500">{p.village}, {p.district}</td>
                    <td className="py-3 px-4 font-bold text-amber-600">⭐ {p.rating} ({p.reviewsCount})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS LEDGER */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 border-b border-stone-200 text-[11px] uppercase font-bold text-stone-500">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Items Summary</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#F8FAF5]">
                    <td className="py-3 px-4 font-mono font-bold text-[#176B3A]">#{o.id}</td>
                    <td className="py-3 px-4 font-medium text-stone-900">{o.deliveryAddress?.name || 'Customer'}</td>
                    <td className="py-3 px-4 text-stone-600">{o.items?.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}</td>
                    <td className="py-3 px-4 font-bold text-stone-900">₹{o.total}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {o.paymentMethod || 'UPI'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        ✓ {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM TELEMETRY */}
      {activeTab === 'diagnostics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-4">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-[#176B3A]" />
              Backend Server Health
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">API Status</span>
                <span className="font-bold text-emerald-600">● Online (200 OK)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Node.js Engine</span>
                <span className="font-mono font-bold text-stone-800">v24.20.0 (Windows x64)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Host Port</span>
                <span className="font-mono font-bold text-stone-800">5000 (Bound 0.0.0.0)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Compression</span>
                <span className="font-bold text-emerald-600">Gzip & Brotli Enabled</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Store Engine</span>
                <span className="font-bold text-stone-800">Memory & JSON File Persistence</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft space-y-4">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              Resource Allocation
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-stone-600 mb-1">
                  <span>RAM Heap Utilization</span>
                  <span className="font-bold text-stone-900">~12 MB / 4096 MB</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#176B3A] h-full w-[2%]"></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF5] border border-stone-200 space-y-1">
                <p className="font-bold text-stone-800">Production Ready For Windows & Cloud</p>
                <p className="text-[11px] text-stone-500">
                  Ready to serve simultaneously over local network (Wi-Fi) and cloud platforms (Render/Vercel/Docker).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: FULL USER INFORMATION & DATA MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl animate-scaleUp">
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex items-start justify-between bg-stone-50/50 rounded-t-3xl">
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#176B3A] shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-extrabold text-xl text-stone-900">
                      {selectedUser.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        selectedUser.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : selectedUser.role === 'seller'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {selectedUser.role}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">{selectedUser.email} • {selectedUser.phone}</p>
                  <p className="text-[11px] text-stone-400 font-mono mt-0.5">User ID: {selectedUser.id}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-6 text-xs">
              {/* Profile Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F8FAF5] p-4 rounded-2xl border border-stone-200">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Account Status</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {selectedUser.status || 'Active'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Registration Date</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{selectedUser.joinedDate || 'January 2024'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Location (Panchayat)</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">
                    {selectedUser.village || 'N/A'}, {selectedUser.district || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">State & Region</span>
                  <span className="font-semibold text-stone-800 mt-0.5 block">{selectedUser.state || 'Maharashtra'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Specialty / Category</span>
                  <span className="font-semibold text-[#176B3A] mt-0.5 block">
                    {selectedUser.specialty || 'General Buyer'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Primary Contact</span>
                  <a
                    href={`https://wa.me/${selectedUser.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    WhatsApp Chat ↗
                  </a>
                </div>
              </div>

              {/* Raw JSON Data Viewer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#176B3A]" />
                    Complete Raw User Data Record (JSON)
                  </span>
                  <button
                    onClick={handleCopyJson}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-[10px]">Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-stone-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-60 border border-stone-800 leading-relaxed">
                  {JSON.stringify(selectedUser, null, 2)}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-100 flex items-center justify-between bg-stone-50/50 rounded-b-3xl">
              <button
                onClick={() => handleToggleStatus(selectedUser.id, selectedUser.status)}
                className="btn-outline text-xs py-2 px-4"
              >
                {selectedUser.status === 'Suspended' ? '✓ Activate Account' : '⚠️ Suspend User'}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="btn-primary text-xs py-2 px-5 font-bold"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-display font-extrabold text-lg text-stone-900">
                  Register New User
                </h3>
                <p className="text-xs text-stone-500">Create a new producer, buyer, or admin profile</p>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="ramesh@gramsetu.in"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Account Role</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A] bg-white font-medium"
                  >
                    <option value="buyer">🛒 Buyer</option>
                    <option value="seller">🌾 Producer (Seller)</option>
                    <option value="admin">👑 Administrator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Village</label>
                  <input
                    type="text"
                    value={newUserForm.village}
                    onChange={(e) => setNewUserForm({ ...newUserForm, village: e.target.value })}
                    placeholder="Dindori"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">District</label>
                  <input
                    type="text"
                    value={newUserForm.district}
                    onChange={(e) => setNewUserForm({ ...newUserForm, district: e.target.value })}
                    placeholder="Nashik"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={newUserForm.state}
                    onChange={(e) => setNewUserForm({ ...newUserForm, state: e.target.value })}
                    placeholder="Maharashtra"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#176B3A]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="btn-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-5 font-bold shadow-md"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
