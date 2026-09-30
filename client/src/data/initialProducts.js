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
    bio: "Led by veteran farmer Ramrao Patil, multi-generation traditional organic farmers growing heritage Sharbati wheat, onions, and field-fresh table tomatoes without synthetic fertilizers.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    badges: ["Top Rated Farmer", "Zero-Middlemen Certified", "Kisan Mitra"]
  },
  {
    id: "seller-2",
    name: "MatiShilp Heritage Terracotta & Art Studio",
    contactPerson: "Kashinath Kumbhar",
    phone: "+91 94310 82711",
    email: "kashinath.kumbhar@gramsetu.in",
    village: "Ranti",
    district: "Madhubani",
    state: "Bihar",
    rating: 4.9,
    reviewsCount: 89,
    productsCount: 9,
    isVerified: true,
    joinedDate: "March 2024",
    bio: "Master rural artisan Kashinath Kumbhar leading 35 village artisans in traditional terracotta pottery, cane bamboo weaving, and eco-friendly handicrafts.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    badges: ["Master Artisan", "Rural Self-Help Mentor", "100% Eco-Friendly"]
  },
  {
    id: "seller-3",
    name: "AmrutDhara Indigenous Dairy & Gir Gaushala",
    contactPerson: "Govindbhai Rabari",
    phone: "+91 97233 11840",
    email: "govindbhai.rabari@gramsetu.in",
    village: "Mogri",
    district: "Anand",
    state: "Gujarat",
    rating: 4.9,
    reviewsCount: 215,
    productsCount: 6,
    isVerified: true,
    joinedDate: "November 2023",
    bio: "Founded by Govindbhai Rabari, sourcing pure grass-fed Gir cow milk and traditional bilona churned golden ghee directly from 60 cattle-raising households.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    badges: ["A2 Certified", "Cold Chain Monitored", "Gramin Dairy Leader"]
  },
  {
    id: "seller-4",
    name: "VanVeda Wild Forest Organics & Honey",
    contactPerson: "Bhikaji Gawali",
    phone: "+91 98811 77622",
    email: "bhikaji.gawali@gramsetu.in",
    village: "Tapola",
    district: "Satara",
    state: "Maharashtra",
    rating: 4.7,
    reviewsCount: 98,
    productsCount: 5,
    isVerified: true,
    joinedDate: "February 2024",
    bio: "Spearheaded by forest elder Bhikaji Gawali, sustainable wild collectors harvesting raw unprocessed nectar honey from the Sahyadri Western Ghats evergreen forests.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    badges: ["Forest Collective", "Raw & Unfiltered", "Cruelty-Free Bees"]
  },
  {
    id: "seller-5",
    name: "Malnad Heritage Spices & High-Curcumin Agro",
    contactPerson: "Manjunath Gowda",
    phone: "+91 98450 63219",
    email: "manjunath.gowda@gramsetu.in",
    village: "Madikeri",
    district: "Kodagu",
    state: "Karnataka",
    rating: 4.8,
    reviewsCount: 160,
    productsCount: 8,
    isVerified: true,
    joinedDate: "December 2023",
    bio: "Run by progressive grower Manjunath Gowda, cultivating shade-grown high-curcumin Lakadong turmeric, hand-harvested green cardamom, and fresh natural hill spices.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    badges: ["High Curcumin 7.2%", "Zero Chemicals", "Direct Farm Gate"]
  },
  {
    id: "seller-6",
    name: "Chenetha Handloom & Pure Khadi Guild",
    contactPerson: "Muthusamy Chettiar",
    phone: "+91 94432 99014",
    email: "muthusamy.chettiar@gramsetu.in",
    village: "Omalur",
    district: "Salem",
    state: "Tamil Nadu",
    rating: 4.6,
    reviewsCount: 73,
    productsCount: 11,
    isVerified: true,
    joinedDate: "May 2024",
    bio: "Led by master weaver Muthusamy Chettiar, heritage pit-loom weavers crafting pure unbleached cotton bags, utility kitchen towels, and handwoven rural khadi.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    badges: ["Handloom Mark Certified", "Zero Plastic Mission", "Artisan Direct"]
  },
  {
    id: "seller-7",
    name: "GramTech Modern Farm Mechanization & Solar",
    contactPerson: "Dattatraya Shinde",
    phone: "+91 98200 12345",
    email: "dattatraya.shinde@gramsetu.in",
    village: "Gangapur",
    district: "Nashik",
    state: "Maharashtra",
    rating: 4.9,
    reviewsCount: 54,
    productsCount: 4,
    isVerified: true,
    joinedDate: "January 2024",
    bio: "Managed by Dattatraya Shinde, providing modern mechanized tractor plowing, harvesters, and solar water pump technical servicing across Nashik district.",
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
    sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
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
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sun-ripened, golden Sharbati wheat grains hand-cleaned and grown with jeevamrut organic compost by Ramrao Patil. Produces exceptionally soft, sweet rotis with high dietary fiber and zero pesticide residue.",
    harvestDate: "April 2026",
    deliveryInfo: "Direct dispatch from farm within 24 hours. Bulk bag packaging available (30kg, 50kg).",
    specifications: {
      "Farmer": "Ramrao Patil",
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
    sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
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
    description: "Vine-ripened indigenous heirloom tomatoes grown by Ramrao Patil, known for their tangy punch, juicy pulp, and thin skin. Harvested at sunrise and packed in ventilated crates.",
    harvestDate: "Daily morning harvest",
    deliveryInfo: "Same-day or next-day local delivery in crates. Wholesale rates on orders above 50 kg.",
    specifications: {
      "Farmer": "Ramrao Patil",
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
    sellerName: "MatiShilp Heritage Terracotta & Art Studio",
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
      "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Carefully hand-interwoven by master artisan Kashinath Kumbhar using seasoned riverbank bamboo. Extremely sturdy, completely biodegradable, and treated naturally against insects with neem oil smoke.",
    harvestDate: "Handmade this season",
    deliveryInfo: "Carefully bubble & corrugated boxed to prevent crushing during transit.",
    specifications: {
      "Artisan": "Kashinath Kumbhar",
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
    sellerName: "VanVeda Wild Forest Organics & Honey",
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
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "100% raw, unheated, unfiltered mountain forest honey collected by Bhikaji Gawali from wild cliff bee colonies in Mahabaleshwar-Tapola valley. Rich in pollen and deep floral notes.",
    harvestDate: "March 2026 Forest Harvest",
    deliveryInfo: "Shipped in food-grade glass jars with leak-proof seal and safety cushioning.",
    specifications: {
      "Harvester": "Bhikaji Gawali",
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
    sellerName: "Chenetha Handloom & Pure Khadi Guild",
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
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Heavy-duty unbleached natural cotton canvas bag spun by Muthusamy Chettiar on traditional hand charkhas and pit looms. Reinforced double stitching can easily support heavy groceries up to 15 kg.",
    harvestDate: "Handmade in Tamil Nadu",
    deliveryInfo: "Ships within 2 days. Foldable, machine-washable.",
    specifications: {
      "Weaver": "Muthusamy Chettiar",
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
    sellerName: "AmrutDhara Indigenous Dairy & Gir Gaushala",
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
    description: "Pure, thick, unadulterated raw milk from free-grazing Murrah buffaloes raised by Govindbhai Rabari's dairy co-op. Naturally rich in 7.5% butterfat and calcium.",
    harvestDate: "Daily Morning & Evening Milking",
    deliveryInfo: "Delivered chilled in insulated stainless steel cans or glass bottles within 15 km radius.",
    specifications: {
      "Dairy Lead": "Govindbhai Rabari",
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
    sellerName: "Malnad Heritage Spices & High-Curcumin Agro",
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
      "https://images.unsplash.com/photo-1666818398897-381dd5eb9139?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "High-potency organic turmeric hand-pounded by Manjunath Gowda at low rpm to retain natural essential oils. Contains a verified 7.2% curcumin content with deep therapeutic aroma.",
    harvestDate: "February 2026 harvest",
    deliveryInfo: "Airtight zip-lock aluminum pouch packaging to preserve curcumin efficacy.",
    specifications: {
      "Grower": "Manjunath Gowda",
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
    sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
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
    description: "GI-tagged original coastal Alphonso mangoes curated by Ramrao Patil, naturally grass-hay ripened without chemical carbide. Incomparable sweetness and saffron aroma.",
    harvestDate: "Seasonal harvest",
    deliveryInfo: "Dispatched in sturdy wooden cartons with straw bedding.",
    specifications: {
      "Farmer": "Ramrao Patil",
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
    sellerName: "AmrutDhara Indigenous Dairy & Gir Gaushala",
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
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crafted by Govindbhai Rabari strictly via Vedic Bilona method: whole A2 Gir cow milk cultured into curd, hand-churned with wooden bi-directional bilona, and slow-simmered over cow-dung firewood.",
    harvestDate: "Handmade this week",
    deliveryInfo: "Glass bottle packaged with bubble wrapping.",
    specifications: {
      "Producer": "Govindbhai Rabari",
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
    sellerName: "GramTech Modern Farm Mechanization & Solar",
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
      "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "55 HP 4WD Mahindra tractor managed by Dattatraya Shinde with rotavator, seed-drill, and reversible mouldboard plough attachments with experienced local driver. Available for nearby village farms.",
    harvestDate: "On-demand availability",
    deliveryInfo: "Reaches your field within 2 hours of confirmation in Nashik tehsil.",
    specifications: {
      "Service Operator": "Dattatraya Shinde",
      "Horsepower": "55 HP 4WD",
      "Driver Included": "Yes (Fuel & Operator included)"
    }
  },
  {
    id: "prod-11",
    name: "Cold-Pressed Yellow Mustard (Kachi Ghani) Oil",
    nameHi: "कच्ची घानी शुद्ध पीली सरसों का तेल",
    nameMr: "लाकडी घाण्याचे शुद्ध मोहरीचे तेल",
    category: "organic",
    price: 220,
    unit: "bottle (1 liter)",
    sellerId: "seller-1",
    sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    distanceKm: 12,
    rating: 4.9,
    reviewsCount: 68,
    stock: 180,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1638324396229-632af05042dd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Cold-pressed wood churned (lakdi ghani) yellow mustard oil extracted at room temperature by Ramrao Patil's farmer cooperative. Zero heating, zero chemicals, retaining 100% natural pungent flavor and essential Omega-3 fatty acids.",
    harvestDate: "Pressed Fresh Weekly",
    deliveryInfo: "Glass bottle packaged securely with shockproof cardboard cushioning.",
    specifications: {
      "Farmer Collective": "Sahyadri Jaivik Kisan Utpadak FPC",
      "Extraction Method": "Traditional Wooden Kolhu (Lakdi Ghani)",
      "Purity": "100% Unrefined & Unbleached",
      "Volume": "1000 ml"
    }
  },
  {
    id: "prod-12",
    name: "Handcrafted Terracotta Water Matka & Clay Pot",
    nameHi: "हस्तनिर्मित मिट्टी का प्राकृतिक मटका",
    nameMr: "हस्तनिर्मित मातीचे थंड पाण्याचे माठ",
    category: "handicrafts",
    price: 290,
    unit: "piece",
    sellerId: "seller-2",
    sellerName: "MatiShilp Heritage Terracotta & Art Studio",
    village: "Ranti",
    district: "Madhubani",
    state: "Bihar",
    distanceKm: 65,
    rating: 4.8,
    reviewsCount: 52,
    stock: 60,
    isAvailable: true,
    isOrganic: false,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Wheel-thrown porous clay water vessel crafted by master artisan Kashinath Kumbhar using river silt. Naturally cools water up to 10 degrees below room temperature through microscopic evaporation while infusing alkaline minerals.",
    harvestDate: "Handcrafted this season",
    deliveryInfo: "Triple-layer bubble and corrugated armor packed to prevent cracking.",
    specifications: {
      "Artisan": "Kashinath Kumbhar",
      "Material": "Natural Gangetic Clay & River Silt",
      "Capacity": "7 Liters",
      "Includes": "Earthen Lid & Dispensing Tap"
    }
  },
  {
    id: "prod-13",
    name: "Farm-Direct Nashik Red Onions (Garva Kanda)",
    nameHi: "खेत से ताज़ा नासिक लाल प्याज (गरवा कांदा)",
    nameMr: "नाशिकचा अस्सल लाल गरवा कांदा",
    category: "produce",
    price: 35,
    unit: "kg",
    sellerId: "seller-1",
    sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
    village: "Dindori",
    district: "Nashik",
    state: "Maharashtra",
    distanceKm: 12,
    rating: 4.8,
    reviewsCount: 96,
    stock: 3500,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 5,
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Direct farm-harvested Nashik red onions cultivated in mineral-rich black volcanic soil by Ramrao Patil. Known across India for high pungent aroma, crisp layers, and exceptional shelf life exceeding 4 months.",
    harvestDate: "Current Rabi Season Harvest",
    deliveryInfo: "Packed in breathable jute mesh sacks of 5kg, 10kg, and 50kg.",
    specifications: {
      "Farmer": "Ramrao Patil",
      "Variety": "Nashik Garva Lal Onion",
      "Size": "Medium to Large (45mm - 60mm)",
      "Shelf Life": "Over 90-120 days in aerated shade"
    }
  },
  {
    id: "prod-14",
    name: "Traditional Sun-Dried Mango & Green Chilli Achar",
    nameHi: "पारंपरिक धूप में पका आम व मिर्च का तीखा अचार",
    nameMr: "गावरान उन्हात सुकवलेले कैरी व मिरचीचे लोणचे",
    category: "homemade",
    price: 195,
    unit: "jar (400g)",
    sellerId: "seller-4",
    sellerName: "VanVeda Wild Forest Organics & Honey",
    village: "Tapola",
    district: "Satara",
    state: "Maharashtra",
    distanceKm: 42,
    rating: 4.9,
    reviewsCount: 74,
    stock: 210,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Aged village recipe by Bhikaji Gawali's household made with wild sour green mangoes, hand-ground mustard seeds, fenugreek, rock salt, and wood-pressed oil. Sun-cured in ceramic martaban jars for 21 days with zero artificial preservatives.",
    harvestDate: "Handmade in traditional small batches",
    deliveryInfo: "Glass martaban jars protected with leak-proof foil seal.",
    specifications: {
      "Maker": "Bhikaji Gawali Household",
      "Preservation": "Pure Cold-Pressed Oil & Sea Salt only",
      "Oil Base": "Cold-Pressed Mustard Oil",
      "Weight": "400 grams"
    }
  },
  {
    id: "prod-15",
    name: "Organic Finger Millet (Nachni / Ragi) Flour",
    nameHi: "सेंद्रिय रागी / मडुआ का शुद्ध पौष्टिक आटा",
    nameMr: "सेंद्रिय नाचणीचे खडे व पीठ (कॅल्शियम युक्त)",
    category: "agriculture",
    price: 65,
    unit: "pack (1 kg)",
    sellerId: "seller-5",
    sellerName: "Malnad Heritage Spices & High-Curcumin Agro",
    village: "Madikeri",
    district: "Kodagu",
    state: "Karnataka",
    distanceKm: 55,
    rating: 4.8,
    reviewsCount: 63,
    stock: 450,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 2,
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Rain-fed indigenous dark ragi grains grown by Manjunath Gowda. Cold stone ground to preserve living bran and high dietary calcium (344mg/100g). Perfect for healthy rotis, bhakris, mudde, and nutritious baby porridge.",
    harvestDate: "Fresh Milling on Order",
    deliveryInfo: "Food-grade double-layered craft paper pouch with ziplock seal.",
    specifications: {
      "Farmer": "Manjunath Gowda",
      "Grain": "Desi Brown Finger Millet (Eleusine coracana)",
      "Nutrition": "Extremely high Calcium & Dietary Fiber",
      "Gluten": "100% Naturally Gluten-Free"
    }
  },
  {
    id: "prod-16",
    name: "Heritage Pure Cotton Handspun Gamcha / Shawl",
    nameHi: "शुद्ध सूती हथकरघा गमछा / उत्तरीय",
    nameMr: "हातमाग शुद्ध सुती गमछा व उपरणे",
    category: "clothing",
    price: 180,
    unit: "piece",
    sellerId: "seller-6",
    sellerName: "Chenetha Handloom & Pure Khadi Guild",
    village: "Omalur",
    district: "Salem",
    state: "Tamil Nadu",
    distanceKm: 88,
    rating: 4.7,
    reviewsCount: 42,
    stock: 110,
    isAvailable: true,
    isOrganic: true,
    minOrderQty: 1,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Traditional absorbent handloom cotton gamcha woven on wooden pit looms by Muthusamy Chettiar. Highly breathable, soft against the skin, quick-drying, and dyed with natural plant-based vegetable colors.",
    harvestDate: "Handloom crafted",
    deliveryInfo: "Ships within 24 hours. Eco-friendly biodegradable wrapper.",
    specifications: {
      "Weaver": "Muthusamy Chettiar",
      "Yarn Count": "60s Pure Combed Indian Cotton",
      "Dimensions": "1.8 meters x 0.9 meters",
      "Color Fastness": "Tested with organic indigo and madder"
    }
  }
];

export const initialOrders = [
  {
    id: "GS10245",
    buyerName: "Aniket Deshmukh",
    buyerPhone: "+91 98200 12345",
    buyerEmail: "aniket.deshmukh@gmail.com",
    deliveryAddress: {
      name: "Aniket Deshmukh",
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
        sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
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
      { status: "Order Placed", date: "08 Sep 2026, 10:30 AM", completed: true, note: "Order placed by Aniket Deshmukh via UPI" },
      { status: "Seller Accepted", date: "08 Sep 2026, 11:15 AM", completed: true, note: "Sahyadri Jaivik Kisan Utpadak FPC accepted order" },
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
    buyerName: "Sunita Kulkarni",
    buyerPhone: "+91 98199 44332",
    buyerEmail: "sunita.kulkarni@gmail.com",
    deliveryAddress: {
      name: "Sunita Kulkarni",
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
        sellerName: "Sahyadri Jaivik Kisan Utpadak FPC",
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
      { status: "Seller Accepted", date: "07 Sep 2026, 02:40 PM", completed: true, note: "Ramrao Patil confirmed fresh harvest" },
      { status: "Product Ready", date: "07 Sep 2026, 05:00 PM", completed: true, note: "Packed in aerated farm crates" },
      { status: "Out for Delivery", date: "08 Sep 2026, 08:30 AM", completed: true, note: "Dispatched to shop" },
      { status: "Delivered", date: "08 Sep 2026, 11:20 AM", completed: true, note: "Delivered & cash ₹490 collected" }
    ],
    trackingDetails: {
      courier: "Direct Farm Delivery",
      driverName: "Pandurang Shinde",
      driverPhone: "+91 98221 45091",
      estimatedDelivery: "Delivered"
    }
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    productId: "prod-1",
    userName: "Aniket Deshmukh",
    userRole: "Verified Buyer",
    rating: 5,
    date: "04 Sep 2026",
    comment: "Outstanding Sharbati wheat from Ramrao Patil! The rotis puffed up like balloons and remained super soft. Direct farm gate purity without middleman adulteration.",
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userName: "Govindbhai Rabari",
    userRole: "Verified Buyer",
    rating: 5,
    date: "28 Aug 2026",
    comment: "Clean grains, zero stones, and natural aroma. Happy to support Nitin ji and his farmer collective in Dindori.",
    verifiedPurchase: true
  },
  {
    id: "rev-3",
    productId: "prod-3",
    userName: "Bhikaji Gawali",
    userRole: "Verified Customer",
    rating: 5,
    date: "02 Sep 2026",
    comment: "The bamboo craftsmanship by Kashinath Kumbhar is top notch! Authentic, sturdy weave that gives our home a beautiful earthy rustic touch.",
    verifiedPurchase: true
  },
  {
    id: "rev-4",
    productId: "prod-4",
    userName: "Muthusamy Chettiar",
    userRole: "Verified Buyer",
    rating: 5,
    date: "01 Sep 2026",
    comment: "Genuine raw forest honey harvested by Bhikaji Gawali. Crystallizes naturally and has distinct herbal fragrance of wild Sahyadri flora.",
    verifiedPurchase: true
  },
  {
    id: "rev-5",
    productId: "prod-6",
    userName: "Kashinath Kumbhar",
    userRole: "Verified Buyer",
    rating: 5,
    date: "06 Sep 2026",
    comment: "Pure and thick buffalo milk from Govindbhai Rabari's dairy. Cream layer is thick and tastes like authentic village farm milk.",
    verifiedPurchase: true
  }
];
