import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_BUYER = {
  id: "user-buyer-1",
  name: "Aniket Deshmukh",
  email: "aniket.deshmukh@gmail.com",
  phone: "+91 98200 12345",
  role: "buyer",
  village: "Gangapur",
  district: "Nashik",
  state: "Maharashtra",
  address: "Flat 402, Green View Society, Gangapur Road",
  pincode: "422013"
};

const DEMO_SELLER = {
  id: "user-seller-1",
  name: "Ramrao Patil",
  email: "ramrao.patil@gramsetu.in",
  phone: "+91 98221 45091",
  role: "seller",
  sellerId: "seller-1",
  village: "Dindori",
  district: "Nashik",
  state: "Maharashtra",
  sellerProfile: {
    id: "seller-1",
    name: "Sahyadri Jaivik Kisan Utpadak FPC",
    contactPerson: "Ramrao Patil",
    phone: "+91 98221 45091",
    email: "ramrao.patil@gramsetu.in",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    rating: 4.8,
    reviewsCount: 124,
    productsCount: 14,
    isVerified: true,
    joinedDate: "January 2024",
    bio: "Led by Ramrao Patil, traditional organic farmers growing heritage Sharbati wheat, onions, and field-fresh table tomatoes without synthetic fertilizers.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    badges: ["Top Rated Farmer", "Zero-Middlemen Certified", "Kisan Mitra"]
  }
};

const DEMO_ADMIN = {
  id: "user-admin-1",
  name: "Nitin Imade",
  email: "nitinimade@gmail.com",
  phone: "+91 98221 45091",
  role: "admin",
  status: "Active",
  village: "Dindori",
  district: "Nashik",
  state: "Maharashtra",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  title: "Super Administrator",
  password: "nitin@123456"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gramsetu_user');
      return saved ? JSON.parse(saved) : null; // Default to guest (safe and unprivileged)
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('gramsetu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gramsetu_user');
    }
  }, [user]);

  const loginDemoBuyer = () => {
    setUser(DEMO_BUYER);
    return DEMO_BUYER;
  };

  const loginDemoSeller = () => {
    setUser(DEMO_SELLER);
    return DEMO_SELLER;
  };

  const login = async (email, password) => {
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    // Admin login: STRICTLY restricted to Nitin Imade
    if (cleanEmail === 'nitinimade@gmail.com') {
      if (password !== 'nitin@123456') {
        throw new Error('Incorrect password. Please enter valid password for Nitin Imade.');
      }
      setUser(DEMO_ADMIN);
      return DEMO_ADMIN;
    }

    // Reject any other email claiming to be admin
    if (cleanEmail.includes('admin') || cleanEmail.includes('nitin')) {
      throw new Error('Access Denied: Admin Portal is restricted exclusively to Nitin Imade (nitinimade@gmail.com).');
    }

    if (cleanEmail === 'seller@gramsetu.in' || cleanEmail.includes('seller')) {
      setUser(DEMO_SELLER);
      return DEMO_SELLER;
    }

    const buyerUser = {
      ...DEMO_BUYER,
      email: cleanEmail || DEMO_BUYER.email
    };
    setUser(buyerUser);
    return buyerUser;
  };

  const registerBuyer = (data) => {
    const newUser = {
      id: `user-${Date.now()}`,
      role: 'buyer',
      ...data
    };
    setUser(newUser);
    return newUser;
  };

  const registerSeller = (data) => {
    const newSellerProfile = {
      id: `seller-${Date.now()}`,
      name: data.name,
      contactPerson: data.contactPerson || data.name,
      phone: data.phone,
      email: data.email || `${data.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gramsetu.in`,
      village: data.village,
      district: data.district,
      state: data.state,
      businessType: data.businessType || 'Agriculture',
      rating: 5.0,
      reviewsCount: 1,
      productsCount: 1,
      isVerified: true,
      joinedDate: "September 2026",
      bio: `Direct rural producer and artisan based in ${data.village}, ${data.district}.`,
      avatar: data.profilePhoto || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      badges: ["GramSetu Verified Seller", "Direct Producer"]
    };

    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'seller',
      sellerId: newSellerProfile.id,
      village: data.village,
      district: data.district,
      state: data.state,
      sellerProfile: newSellerProfile
    };

    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        loginDemoBuyer,
        loginDemoSeller,
        registerBuyer,
        registerSeller,
        logout,
        isAdmin: user?.role === 'admin' && user?.email?.toLowerCase() === 'nitinimade@gmail.com',
        isSuperAdmin: user?.role === 'admin' && user?.email?.toLowerCase() === 'nitinimade@gmail.com',
        isSeller: user?.role === 'seller',
        isBuyer: user?.role === 'buyer'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
