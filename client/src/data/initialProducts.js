export const initialCategories = [
  {
    id: "agriculture",
    name: "Agriculture",
    nameHi: "कृषि",
    nameMr: "शेती",
    icon: "🌾",
    description: "Grains, pulses, seeds, and farm produce directly from fields",
    itemCount: 42
  },
  {
    id: "produce",
    name: "Fresh Produce",
    nameHi: "ताज़ी सब्ज़ियाँ व फल",
    nameMr: "ताजी भाजीपाला आणि फळे",
    icon: "🥬",
    description: "Farm-harvested fresh vegetables, fruits, and greens",
    itemCount: 38
  },
  {
    id: "dairy",
    name: "Dairy & Livestock",
    nameHi: "डेयरी उत्पाद",
    nameMr: "दुग्ध व्यवसाय",
    icon: "🥛",
    description: "Pure milk, desi ghee, paneer, and cattle nutrition",
    itemCount: 24
  },
  {
    id: "handicrafts",
    name: "Handicrafts & Art",
    nameHi: "हस्तशिल्प और कला",
    nameMr: "हस्तकला आणि कलाकुसर",
    icon: "🧺",
    description: "Bamboo crafts, terracotta, handloom, and traditional artifacts",
    itemCount: 29
  },
  {
    id: "organic",
    name: "Organic Products",
    nameHi: "जैविक उत्पाद",
    nameMr: "सेंद्रिय उत्पादने",
    icon: "🌱",
    description: "Certified chemical-free spices, flours, cold-pressed oils",
    itemCount: 31
  },
  {
    id: "homemade",
    name: "Homemade Delicacies",
    nameHi: "घरेलू उत्पाद व अचार",
    nameMr: "घरगुती खाद्यपदार्थ",
    icon: "🍯",
    description: "Village honey, sun-dried pickles, papads, and healthy sweets",
    itemCount: 22
  },
  {
    id: "clothing",
    name: "Rural Handloom & Khadi",
    nameHi: "खादी और ग्रामीण वस्त्र",
    nameMr: "हातमाग व खादी कपडे",
    icon: "👕",
    description: "Pure cotton fabrics, gamchas, hand-spun bags, and woolens",
    itemCount: 18
  },
  {
    id: "services",
    name: "Local Village Services",
    nameHi: "स्थानीय ग्रामीण सेवाएँ",
    nameMr: "स्थानिक ग्राम सेवा",
    icon: "🔧",
    description: "Tractor hire, pump repairs, soil testing, and skilled labor",
    itemCount: 15
  }
];

export const initialSellers = [
  {
    id: "seller-1",
    name: "Nitin Imade Kisan Sahakari Group",
    contactPerson: "Nitin Imade",
    phone: "+91 98221 45091",
    email: "nitin.imade@gramsetu.in",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    rating: 4.8,
    reviewsCount: 124,
    productsCount: 14,
    isVerified: true,
    joinedDate: "January 2024",
    bio: "Led by Nitin Imade, multi-generation traditional organic farmers growing heritage Sharbati wheat, onions, and field-fresh table tomatoes without synthetic fertilizers.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    badges: ["Top Rated Farmer", "Zero-Middlemen Certified", "Kisan Mitra"]
  },
  {
    id: "seller-2",
    name: "Siddhesh Kumbhar Craft Kendra",
    contactPerson: "Siddhesh Kumbhar",
    phone: "+91 94310 82711",
    email: "siddhesh.kumbhar@gramsetu.in",
    village: "Ranti",
    district: "Madhubani",
    state: "Bihar",
    rating: 4.9,
    reviewsCount: 89,
    productsCount: 9,
    isVerified: true,
    joinedDate: "March 2024",
    bio: "Master rural artisan Siddhesh Kumbhar leading 35 village artisans in traditional terracotta pottery, cane bamboo weaving, and eco-friendly handicrafts.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    badges: ["Master Artisan", "Rural Self-Help Mentor", "100% Eco-Friendly"]
  },
  {
    id: "seller-3",
    name: "Unnati Pawar Gramin Dairy Co-op",
    contactPerson: "Unnati Pawar",
    phone: "+91 97233 11840",
    email: "unnati.pawar@gramsetu.in",
    village: "Mogri",
    district: "Anand",
    state: "Gujarat",
    rating: 4.9,
    reviewsCount: 215,
    productsCount: 6,
    isVerified: true,
    joinedDate: "November 2023",
    bio: "Founded by Unnati Pawar, sourcing pure grass-fed Gir cow milk and traditional bilona churned golden ghee directly from 60 cattle-raising households.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    badges: ["A2 Certified", "Cold Chain Monitored", "Gramin Dairy Leader"]
  },
  {
    id: "seller-4",
    name: "Neha Kale Forest Honey Collectives",
    contactPerson: "Neha Kale",
    phone: "+91 98811 77622",
    email: "neha.kale@gramsetu.in",
    village: "Tapola",
    district: "Satara",
    state: "Maharashtra",
    rating: 4.7,
    reviewsCount: 98,
    productsCount: 5,
    isVerified: true,
    joinedDate: "February 2024",
    bio: "Spearheaded by Neha Kale, sustainable wild collectors harvesting raw unprocessed nectar honey from the Sahyadri Western Ghats evergreen forests.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    badges: ["Forest Collective", "Raw & Unfiltered", "Cruelty-Free Bees"]
  },
  {
    id: "seller-5",
    name: "Kajal Mali Organic Estates",
    contactPerson: "Kajal Mali",
    phone: "+91 98450 63219",
    email: "kajal.mali@gramsetu.in",
    village: "Madikeri",
    district: "Kodagu",
    state: "Karnataka",
    rating: 4.8,
    reviewsCount: 160,
    productsCount: 8,
    isVerified: true,
    joinedDate: "December 2023",
    bio: "Run by Kajal Mali, cultivating shade-grown high-curcumin Lakadong turmeric, hand-harvested green cardamom, and fresh natural hill spices.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    badges: ["High Curcumin 7.2%", "Zero Chemicals", "Direct Farm Gate"]
  },
  {
    id: "seller-6",
    name: "Apurva Shinde Khadi Weavers Sangam",
    contactPerson: "Apurva Shinde",
    phone: "+91 94432 99014",
    email: "apurva.shinde@gramsetu.in",
    village: "Omalur",
    district: "Salem",
    state: "Tamil Nadu",
    rating: 4.6,
    reviewsCount: 73,
    productsCount: 11,
    isVerified: true,
    joinedDate: "May 2024",
    bio: "Led by Apurva Shinde, heritage pit-loom weavers crafting pure unbleached cotton bags, utility kitchen towels, and handwoven rural khadi.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    badges: ["Handloom Mark Certified", "Zero Plastic Mission", "Artisan Direct"]
  },
  {
    id: "seller-7",
    name: "Aditya Shivale Rural Agro Services",
    contactPerson: "Aditya Shivale",
    phone: "+91 98200 12345",
    email: "aditya.shivale@gramsetu.in",
    village: "Gangapur",
    district: "Nashik",
    state: "Maharashtra",
    rating: 4.9,
    reviewsCount: 54,
    productsCount: 4,
    isVerified: true,
    joinedDate: "January 2024",
    bio: "Managed by Aditya Shivale, providing modern mechanized tractor plowing, harvesters, and solar water pump technical servicing across Nashik district.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80",
    badges: ["Machinery Expert", "Rapid Field Service", "Kisan Sahayak"]
  }
];

export const initialProducts = [
  {
    id: "prod-1",
    name: "Organic Sharbati Wheat",
    nameHi: "जैविक शरबती गेहूँ",
    nameMr: "सेंद्रिय शरबती गहू",
    category: "agriculture",
    price: 45,
    unit: "kg",
    sellerId: "seller-1",
    sellerName: "Nitin Imade Kisan Sahakari Group",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    distanceKm: 12,
    rating: 4.8,
    reviewsCount: 78,
    stock: 2400,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 5,
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sun-ripened, golden Sharbati wheat grains hand-cleaned and grown with jeevamrut organic compost by Nitin Imade. Produces exceptionally soft, sweet rotis with high dietary fiber and zero pesticide residue.",
    harvestDate: "April 2026",
    deliveryInfo: "Direct dispatch from farm within 24 hours. Bulk bag packaging available (30kg, 50kg).",
    specifications: {
      "Farmer": "Nitin Imade",
      "Grain Variety": "Golden Sharbati MP Heritage",
      "Cultivation Mode": "100% Organic Jeevamrut",
      "Moisture Content": "Under 11%",
      "Cleaning": "Double machine & hand sorted"
    }
  },
  {
    id: "prod-2",
    name: "Farm Fresh Desi Tomatoes",
    nameHi: "खेत के ताज़ा देसी टमाटर",
    nameMr: "शेतातील ताजे गावरान टोमॅटो",
    category: "produce",
    price: 30,
    unit: "kg",
    sellerId: "seller-1",
    sellerName: "Nitin Imade Kisan Sahakari Group",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    distanceKm: 12,
    rating: 4.7,
    reviewsCount: 112,
    stock: 650,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 2,
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Vine-ripened indigenous heirloom tomatoes grown by Nitin Imade, known for their tangy punch, juicy pulp, and thin skin. Harvested at sunrise and packed in ventilated crates.",
    harvestDate: "Daily morning harvest",
    deliveryInfo: "Same-day or next-day local delivery in crates. Wholesale rates on orders above 50 kg.",
    specifications: {
      "Farmer": "Nitin Imade",
      "Variety": "Desi Sour Round Heirloom",
      "Harvest": "Harvested fresh at 6:00 AM",
      "Grade": "A Grade (uniform sizing)"
    }
  },
  {
    id: "prod-3",
    name: "Handmade Bamboo Storage Basket",
    nameHi: "हस्तनिर्मित बाँस की टोकरी",
    nameMr: "हस्तनिर्मित बांबूची परडी व टोपली",
    category: "handicrafts",
    price: 350,
    unit: "piece",
    sellerId: "seller-2",
    sellerName: "Siddhesh Kumbhar Craft Kendra",
    village: "Ranti",
    district: "Madhubani",
    state: "Bihar",
    distanceKm: 65,
    rating: 4.9,
    reviewsCount: 45,
    stock: 85,
    isAvailable: true,
    isOrganic: false,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Carefully hand-interwoven by master artisan Siddhesh Kumbhar using seasoned riverbank bamboo. Extremely sturdy, completely biodegradable, and treated naturally against insects with neem oil smoke.",
    harvestDate: "Handmade this season",
    deliveryInfo: "Carefully bubble & corrugated boxed to prevent crushing during transit.",
    specifications: {
      "Artisan": "Siddhesh Kumbhar",
      "Material": "100% Mature River Bamboo",
      "Dimensions": "14 inch diameter x 8 inch height",
      "Weight Capacity": "Up to 8 kg items"
    }
  },
  {
    id: "prod-4",
    name: "Raw Sahyadri Wild Forest Honey",
    nameHi: "सह्याद्रि जंगली प्राकृतिक शहद",
    nameMr: "सह्याद्रीचे शुद्ध रानटी मध",
    category: "homemade",
    price: 280,
    unit: "bottle (500g)",
    sellerId: "seller-4",
    sellerName: "Neha Kale Forest Honey Collectives",
    village: "Tapola",
    district: "Satara",
    state: "Maharashtra",
    distanceKm: 42,
    rating: 4.8,
    reviewsCount: 82,
    stock: 310,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "100% raw, unheated, unfiltered mountain forest honey collected by Neha Kale from wild cliff bee colonies in Mahabaleshwar-Tapola valley. Rich in pollen and deep floral notes.",
    harvestDate: "March 2026 Forest Harvest",
    deliveryInfo: "Shipped in food-grade glass jars with leak-proof seal and safety cushioning.",
    specifications: {
      "Harvester": "Neha Kale",
      "Processing": "Zero Heat, Cold-Strained through Cotton",
      "Floral Source": "Hirda, Jamun, and Karvi forest blooms",
      "Packaging": "500g Hexagonal Glass Jar"
    }
  },
  {
    id: "prod-5",
    name: "Handwoven Khadi Cotton Carry Bag",
    nameHi: "हस्तकरघा खादी कॉटन थैला",
    nameMr: "हातमाग खादी सुती पिशवी",
    category: "clothing",
    price: 250,
    unit: "piece",
    sellerId: "seller-6",
    sellerName: "Apurva Shinde Khadi Weavers Sangam",
    village: "Omalur",
    district: "Salem",
    state: "Tamil Nadu",
    distanceKm: 88,
    rating: 4.6,
    reviewsCount: 56,
    stock: 140,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Heavy-duty unbleached natural cotton canvas bag spun by Apurva Shinde on traditional hand charkhas and pit looms. Reinforced double stitching can easily support heavy groceries up to 15 kg.",
    harvestDate: "Handmade in Tamil Nadu",
    deliveryInfo: "Ships within 2 days. Foldable, machine-washable.",
    specifications: {
      "Weaver": "Apurva Shinde",
      "Fabric": "100% Pure Handspun Cotton (340 GSM)",
      "Handles": "Heavy cotton webbing, 12-inch shoulder drop",
      "Eco Impact": "Replaces 500+ single-use plastic bags"
    }
  },
  {
    id: "prod-6",
    name: "Fresh Grass-Fed Buffalo Milk",
    nameHi: "ताज़ा देसी भैंस का दूध",
    nameMr: "ताजे म्हशीचे दूध (ए-२)",
    category: "dairy",
    price: 70,
    unit: "liter",
    sellerId: "seller-3",
    sellerName: "Unnati Pawar Gramin Dairy Co-op",
    village: "Mogri",
    district: "Anand",
    state: "Gujarat",
    distanceKm: 8,
    rating: 4.9,
    reviewsCount: 194,
    stock: 450,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Pure, thick, unadulterated raw milk from free-grazing Murrah buffaloes raised by Unnati Pawar's dairy co-op. Naturally rich in 7.5% butterfat and calcium.",
    harvestDate: "Daily Morning & Evening Milking",
    deliveryInfo: "Delivered chilled in insulated stainless steel cans or glass bottles within 15 km radius.",
    specifications: {
      "Dairy Lead": "Unnati Pawar",
      "Fat Content": "7.2% - 7.8% naturally occurring",
      "SNF": "9.0%+",
      "Preservatives": "0% (Nil adulteration guaranteed)"
    }
  },
  {
    id: "prod-7",
    name: "Lakadong Organic Turmeric Powder",
    nameHi: "लकाडोंग जैविक हल्दी पाउडर",
    nameMr: "उच्च कर्क्युमिन सेंद्रिय हळद पूड",
    category: "organic",
    price: 180,
    unit: "pack (500g)",
    sellerId: "seller-5",
    sellerName: "Kajal Mali Organic Estates",
    village: "Madikeri",
    district: "Kodagu",
    state: "Karnataka",
    distanceKm: 55,
    rating: 4.8,
    reviewsCount: 130,
    stock: 520,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-potency organic turmeric hand-pounded by Kajal Mali at low rpm to retain natural essential oils. Contains a verified 7.2% curcumin content with deep therapeutic aroma.",
    harvestDate: "February 2026 harvest",
    deliveryInfo: "Airtight zip-lock aluminum pouch packaging to preserve curcumin efficacy.",
    specifications: {
      "Grower": "Kajal Mali",
      "Curcumin Content": "7.2% (Verified Lab Quality)",
      "Grinding": "Cold stone pulverized",
      "Color": "Deep golden amber"
    }
  },
  {
    id: "prod-8",
    name: "Ratnagiri Alphonso (Hapus) Mangoes",
    nameHi: "रत्नागिरी हापूस आम (पेटी)",
    nameMr: "रत्नागिरी अस्सल हापूस आंबा",
    category: "produce",
    price: 850,
    unit: "dozen (12 pcs)",
    sellerId: "seller-1",
    sellerName: "Nitin Imade Kisan Sahakari Group",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    distanceKm: 25,
    rating: 4.9,
    reviewsCount: 145,
    stock: 120,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    description: "GI-tagged original coastal Alphonso mangoes curated by Nitin Imade, naturally grass-hay ripened without chemical carbide. Incomparable sweetness and saffron aroma.",
    harvestDate: "Seasonal harvest",
    deliveryInfo: "Dispatched in sturdy wooden cartons with straw bedding.",
    specifications: {
      "Farmer": "Nitin Imade",
      "Ripening": "100% Natural Grass Hay (Penda)",
      "Fruit Count": "12 large pieces (250g - 300g each)"
    }
  },
  {
    id: "prod-9",
    name: "Desi Gir Cow Bilona Ghee",
    nameHi: "देसी गिर गाय का बिलोना घी",
    nameMr: "शुद्ध देशी गायीचे बिलोणा तूप",
    category: "dairy",
    price: 850,
    unit: "jar (500ml)",
    sellerId: "seller-3",
    sellerName: "Unnati Pawar Gramin Dairy Co-op",
    village: "Mogri",
    district: "Anand",
    state: "Gujarat",
    distanceKm: 8,
    rating: 4.9,
    reviewsCount: 167,
    stock: 220,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crafted by Unnati Pawar strictly via Vedic Bilona method: whole A2 Gir cow milk cultured into curd, hand-churned with wooden bi-directional bilona, and slow-simmered over cow-dung firewood.",
    harvestDate: "Handmade this week",
    deliveryInfo: "Glass bottle packaged with bubble wrapping.",
    specifications: {
      "Producer": "Unnati Pawar",
      "Method": "Traditional Vedic 2-Way Wooden Bilona",
      "Source": "Free-grazing indigenous Gir cows",
      "Texture": "Danedar (golden granular)"
    }
  },
  {
    id: "prod-10",
    name: "Tractor & Multi-Crop Harvester Rental",
    nameHi: "ट्रैक्टर व कल्टीवेटर रेंटल सेवा",
    nameMr: "ट्रॅक्टर व शेती अवजारे भाडे सेवा",
    category: "services",
    price: 900,
    unit: "hour",
    sellerId: "seller-7",
    sellerName: "Aditya Shivale Rural Agro Services",
    village: "Gangapur",
    district: "Nashik",
    state: "Maharashtra",
    distanceKm: 12,
    rating: 4.9,
    reviewsCount: 54,
    stock: 4,
    isAvailable: true,
    isOrganic: false,
    minOrderQty: 2,
    images: [
      "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "55 HP 4WD Mahindra tractor managed by Aditya Shivale with rotavator, seed-drill, and reversible mouldboard plough attachments with experienced local driver. Available for nearby village farms.",
    harvestDate: "On-demand availability",
    deliveryInfo: "Reaches your field within 2 hours of confirmation in Nashik tehsil.",
    specifications: {
      "Service Operator": "Aditya Shivale",
      "Horsepower": "55 HP 4WD",
      "Driver Included": "Yes (Fuel & Operator included)"
    }
  }
];

export const initialOrders = [
  {
    id: "GS10245",
    buyerName: "Aditya Shivale",
    buyerPhone: "+91 98200 12345",
    buyerEmail: "aditya.shivale@gramsetu.in",
    deliveryAddress: {
      name: "Aditya Shivale",
      phone: "+91 98200 12345",
      address: "Flat 402, Green View Society, Gangapur Road",
      village: "Gangapur",
      district: "Nashik",
      state: "Maharashtra",
      pincode: "422013"
    },
    items: [
      {
        id: "prod-1",
        name: "Organic Sharbati Wheat",
        price: 45,
        unit: "kg",
        quantity: 20,
        sellerId: "seller-1",
        sellerName: "Nitin Imade Kisan Sahakari Group",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 900,
    deliveryFee: 60,
    total: 960,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    createdAt: "2026-09-08T10:30:00Z",
    timeline: [
      { status: "Order Placed", date: "08 Sep 2026, 10:30 AM", completed: true, note: "Order placed by Aditya Shivale via UPI" },
      { status: "Seller Accepted", date: "08 Sep 2026, 11:15 AM", completed: true, note: "Nitin Imade Kisan Sahakari Group accepted order" },
      { status: "Product Ready", date: "09 Sep 2026, 08:00 AM", completed: true, note: "20kg grain bagged & quality certified" },
      { status: "Out for Delivery", date: "10 Sep 2026, 09:30 AM", completed: true, note: "GramSetu Rural Express van out for delivery" },
      { status: "Delivered", date: "Expected Today by 5:00 PM", completed: false, note: "OTP verification required on arrival" }
    ],
    trackingDetails: {
      courier: "GramSetu Kisan Express Rural Van #MH-15-EG-4421",
      driverName: "Santosh Gaikwad",
      driverPhone: "+91 97654 33210",
      estimatedDelivery: "Today, 5:00 PM"
    }
  },
  {
    id: "GS10244",
    buyerName: "Kajal Mali",
    buyerPhone: "+91 98199 44332",
    buyerEmail: "kajal.mali@gramsetu.in",
    deliveryAddress: {
      name: "Kajal Mali",
      phone: "+91 98199 44332",
      address: "Shop 12, Main Bazaar Road",
      village: "Dindori",
      district: "Nashik",
      state: "Maharashtra",
      pincode: "422202"
    },
    items: [
      {
        id: "prod-2",
        name: "Farm Fresh Desi Tomatoes",
        price: 30,
        unit: "kg",
        quantity: 15,
        sellerId: "seller-1",
        sellerName: "Nitin Imade Kisan Sahakari Group",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 450,
    deliveryFee: 40,
    total: 490,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Delivered",
    createdAt: "2026-09-07T14:10:00Z",
    timeline: [
      { status: "Order Placed", date: "07 Sep 2026, 02:10 PM", completed: true, note: "Order placed via COD" },
      { status: "Seller Accepted", date: "07 Sep 2026, 02:40 PM", completed: true, note: "Nitin Imade confirmed fresh harvest" },
      { status: "Product Ready", date: "07 Sep 2026, 05:00 PM", completed: true, note: "Packed in aerated farm crates" },
      { status: "Out for Delivery", date: "08 Sep 2026, 08:30 AM", completed: true, note: "Dispatched to shop" },
      { status: "Delivered", date: "08 Sep 2026, 11:20 AM", completed: true, note: "Delivered & cash ₹490 collected" }
    ],
    trackingDetails: {
      courier: "Direct Farm Delivery",
      driverName: "Nitin Imade",
      driverPhone: "+91 98221 45091",
      estimatedDelivery: "Delivered"
    }
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    productId: "prod-1",
    userName: "Aditya Shivale",
    userRole: "Verified Buyer",
    rating: 5,
    date: "04 Sep 2026",
    comment: "Outstanding Sharbati wheat from Nitin Imade! The rotis puffed up like balloons and remained super soft. Direct farm gate purity without middleman adulteration.",
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userName: "Unnati Pawar",
    userRole: "Verified Buyer",
    rating: 5,
    date: "28 Aug 2026",
    comment: "Clean grains, zero stones, and natural aroma. Happy to support Nitin ji and his farmer collective in Dindori.",
    verifiedPurchase: true
  },
  {
    id: "rev-3",
    productId: "prod-3",
    userName: "Neha Kale",
    userRole: "Verified Customer",
    rating: 5,
    date: "02 Sep 2026",
    comment: "The bamboo craftsmanship by Siddhesh Kumbhar is top notch! Authentic, sturdy weave that gives our home a beautiful earthy rustic touch.",
    verifiedPurchase: true
  },
  {
    id: "rev-4",
    productId: "prod-4",
    userName: "Apurva Shinde",
    userRole: "Verified Buyer",
    rating: 5,
    date: "01 Sep 2026",
    comment: "Genuine raw forest honey harvested by Neha Kale. Crystallizes naturally and has distinct herbal fragrance of wild Sahyadri flora.",
    verifiedPurchase: true
  },
  {
    id: "rev-5",
    productId: "prod-6",
    userName: "Siddhesh Kumbhar",
    userRole: "Verified Buyer",
    rating: 5,
    date: "06 Sep 2026",
    comment: "Pure and thick buffalo milk from Unnati Pawar's dairy. Cream layer is thick and tastes like authentic village farm milk.",
    verifiedPurchase: true
  }
];
