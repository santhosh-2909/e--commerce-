import type { Product, Category, Review, Order, User } from '../types';

export const categories: Category[] = [
  { id: 'cat1', name: 'Fresh Fruits', slug: 'fresh-fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', productCount: 24, description: 'Farm fresh fruits delivered daily' },
  { id: 'cat2', name: 'Vegetables', slug: 'vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80', productCount: 31, description: 'Organic and fresh vegetables' },
  { id: 'cat3', name: 'Dairy & Eggs', slug: 'dairy-eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', productCount: 18, description: 'Premium dairy products and eggs' },
  { id: 'cat4', name: 'Bakery', slug: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', productCount: 15, description: 'Freshly baked goods every morning' },
  { id: 'cat5', name: 'Beverages', slug: 'beverages', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80', productCount: 22, description: 'Refreshing drinks and juices' },
  { id: 'cat6', name: 'Snacks', slug: 'snacks', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', productCount: 29, description: 'Tasty snacks for any time' },
  { id: 'cat7', name: 'Personal Care', slug: 'personal-care', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', productCount: 16, description: 'Health and beauty products' },
  { id: 'cat8', name: 'Home & Kitchen', slug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', productCount: 20, description: 'Essential household items' },
];

export const products: Product[] = [
  {
    id: 'p1', name: 'Organic Alphonso Mangoes', slug: 'organic-alphonso-mangoes',
    description: 'Premium grade Alphonso mangoes from the orchards of Ratnagiri, Maharashtra. Known for their rich aroma, saffron-coloured flesh, and exceptional sweetness. Each mango is hand-picked at peak ripeness and carefully packed to reach you in perfect condition.',
    shortDescription: 'Premium Ratnagiri Alphonso — sweet, aromatic, saffron-coloured flesh.',
    price: 599, comparePrice: 799,
    images: [
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=80',
      'https://images.unsplash.com/photo-1618897996318-5a901fa4d6a5?w=600&q=80',
      'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    ],
    category: 'Fresh Fruits', categoryId: 'cat1', rating: 4.8, reviewCount: 156,
    stock: 48, sku: 'FRT-001', isFeatured: true, isBestseller: true, isNew: false,
    tags: ['organic', 'seasonal', 'premium'],
    specifications: [{ key: 'Weight', value: '1 Dozen (12 pcs)' }, { key: 'Origin', value: 'Ratnagiri, Maharashtra' }, { key: 'Type', value: 'Organic' }, { key: 'Storage', value: 'Room temperature' }],
    createdAt: '2024-03-15',
  },
  {
    id: 'p2', name: 'Farm Fresh Strawberries', slug: 'farm-fresh-strawberries',
    description: 'Juicy, plump strawberries freshly harvested from our partner farms in Mahabaleshwar. Rich in Vitamin C and antioxidants. Perfect for desserts, smoothies, or eating fresh.',
    shortDescription: 'Plump Mahabaleshwar strawberries — juicy, sweet, vitamin-rich.',
    price: 149, comparePrice: 199,
    images: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&q=80',
    ],
    category: 'Fresh Fruits', categoryId: 'cat1', rating: 4.6, reviewCount: 89,
    stock: 30, sku: 'FRT-002', isFeatured: true, isBestseller: false, isNew: true,
    tags: ['fresh', 'vitamin-c'],
    specifications: [{ key: 'Weight', value: '500g' }, { key: 'Origin', value: 'Mahabaleshwar' }, { key: 'Storage', value: 'Refrigerate' }],
    createdAt: '2024-04-01',
  },
  {
    id: 'p3', name: 'Premium Basmati Rice', slug: 'premium-basmati-rice',
    description: 'Aged extra-long grain Basmati rice from the foothills of the Himalayas. Distinct aroma, fluffy texture, and superior taste. Ideal for biryani, pulao, and everyday cooking.',
    shortDescription: 'Aged Himalayan extra-long grain basmati — fragrant, fluffy perfection.',
    price: 285, comparePrice: 340,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff86e2f8f7e0?w=600&q=80',
    ],
    category: 'Snacks', categoryId: 'cat6', rating: 4.9, reviewCount: 312,
    stock: 200, sku: 'GRN-001', isFeatured: true, isBestseller: true, isNew: false,
    tags: ['staple', 'premium', 'aged'],
    specifications: [{ key: 'Weight', value: '5 kg' }, { key: 'Grain Length', value: 'Extra Long' }, { key: 'Age', value: '2 years aged' }, { key: 'Origin', value: 'Himalayan foothills' }],
    createdAt: '2024-01-10',
  },
  {
    id: 'p4', name: 'Cold Pressed Virgin Coconut Oil', slug: 'cold-pressed-virgin-coconut-oil',
    description: 'Pure cold-pressed virgin coconut oil extracted from fresh coconuts without any chemicals or heat. Retains all natural nutrients, antioxidants, and lauric acid. Suitable for cooking, skincare, and haircare.',
    shortDescription: 'Chemical-free cold-pressed coconut oil — pure, nutritious, multi-use.',
    price: 399, comparePrice: 499,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
      'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
    ],
    category: 'Home & Kitchen', categoryId: 'cat8', rating: 4.7, reviewCount: 203,
    stock: 75, sku: 'OIL-001', isFeatured: false, isBestseller: true, isNew: false,
    tags: ['organic', 'cold-pressed', 'natural'],
    specifications: [{ key: 'Volume', value: '500 ml' }, { key: 'Extraction', value: 'Cold Pressed' }, { key: 'Type', value: 'Virgin' }, { key: 'Packaging', value: 'Glass Bottle' }],
    createdAt: '2024-02-05',
  },
  {
    id: 'p5', name: 'Greek Yogurt — Honey Vanilla', slug: 'greek-yogurt-honey-vanilla',
    description: 'Thick, creamy Greek yogurt made from full-fat milk, infused with natural honey and vanilla. High in protein and probiotics for gut health. No artificial sweeteners or preservatives.',
    shortDescription: 'Thick, probiotic-rich Greek yogurt with natural honey and vanilla.',
    price: 129, comparePrice: 160,
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&q=80',
    ],
    category: 'Dairy & Eggs', categoryId: 'cat3', rating: 4.5, reviewCount: 67,
    stock: 40, sku: 'DRY-001', isFeatured: true, isBestseller: false, isNew: true,
    tags: ['probiotic', 'high-protein', 'natural'],
    specifications: [{ key: 'Weight', value: '200g' }, { key: 'Fat Content', value: 'Full Fat' }, { key: 'Protein', value: '12g per serving' }, { key: 'Shelf Life', value: '10 days' }],
    createdAt: '2024-04-10',
  },
  {
    id: 'p6', name: 'Artisan Sourdough Bread', slug: 'artisan-sourdough-bread',
    description: 'Handcrafted sourdough bread made with a 72-hour fermented starter. Crispy golden crust, airy crumb, and complex tangy flavour. Baked fresh daily using traditional techniques and no commercial yeast.',
    shortDescription: 'Handcrafted 72-hour sourdough — crispy, tangy, baked fresh daily.',
    price: 179, comparePrice: 220,
    images: [
      'https://images.unsplash.com/photo-1585478259715-876acc5be8e1?w=600&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    ],
    category: 'Bakery', categoryId: 'cat4', rating: 4.8, reviewCount: 91,
    stock: 20, sku: 'BKY-001', isFeatured: false, isBestseller: true, isNew: false,
    tags: ['artisan', 'fresh', 'no-preservatives'],
    specifications: [{ key: 'Weight', value: '400g' }, { key: 'Fermentation', value: '72 hours' }, { key: 'Type', value: 'Whole wheat + white' }, { key: 'Allergens', value: 'Gluten, Wheat' }],
    createdAt: '2024-03-20',
  },
  {
    id: 'p7', name: 'Himalayan Pink Salt Almonds', slug: 'himalayan-pink-salt-almonds',
    description: 'California almonds dry-roasted and seasoned with Himalayan pink salt. Crunchy, nutritious, and perfectly salted. Rich in healthy fats, magnesium, and Vitamin E. Ideal as a healthy snack.',
    shortDescription: 'California almonds dry-roasted with Himalayan pink salt — crunchy perfection.',
    price: 349, comparePrice: 420,
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80',
      'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=600&q=80',
    ],
    category: 'Snacks', categoryId: 'cat6', rating: 4.6, reviewCount: 144,
    stock: 60, sku: 'SNK-001', isFeatured: true, isBestseller: true, isNew: false,
    tags: ['healthy', 'nuts', 'gluten-free'],
    specifications: [{ key: 'Weight', value: '250g' }, { key: 'Roasting', value: 'Dry Roasted' }, { key: 'Salt', value: 'Himalayan Pink Salt' }, { key: 'Calories', value: '170 kcal per 30g' }],
    createdAt: '2024-02-20',
  },
  {
    id: 'p8', name: 'Cold Brew Coffee Concentrate', slug: 'cold-brew-coffee-concentrate',
    description: 'Small-batch cold brew coffee steeped for 24 hours at low temperature. Smooth, bold, and never bitter. Dilute 1:1 with water or milk. Made from single-origin Coorg Arabica beans.',
    shortDescription: '24-hour steeped cold brew — smooth, bold, single-origin Coorg Arabica.',
    price: 299, comparePrice: 375,
    images: [
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    ],
    category: 'Beverages', categoryId: 'cat5', rating: 4.7, reviewCount: 78,
    stock: 35, sku: 'BVG-001', isFeatured: true, isBestseller: false, isNew: true,
    tags: ['coffee', 'cold-brew', 'premium'],
    specifications: [{ key: 'Volume', value: '500 ml' }, { key: 'Steep Time', value: '24 hours' }, { key: 'Origin', value: 'Coorg, Karnataka' }, { key: 'Shelf Life', value: '14 days refrigerated' }],
    createdAt: '2024-04-05',
  },
  {
    id: 'p9', name: 'Organic Turmeric Powder', slug: 'organic-turmeric-powder',
    description: 'Premium organic turmeric powder with high curcumin content (4-5%). Sourced from Erode, the turmeric capital of the world. Bright golden colour, intense flavour, and powerful anti-inflammatory properties.',
    shortDescription: 'High-curcumin organic turmeric from Erode — golden, aromatic, medicinal.',
    price: 119, comparePrice: 150,
    images: [
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    ],
    category: 'Home & Kitchen', categoryId: 'cat8', rating: 4.9, reviewCount: 267,
    stock: 150, sku: 'SPC-001', isFeatured: false, isBestseller: true, isNew: false,
    tags: ['organic', 'spice', 'medicinal'],
    specifications: [{ key: 'Weight', value: '200g' }, { key: 'Curcumin', value: '4-5%' }, { key: 'Origin', value: 'Erode, Tamil Nadu' }, { key: 'Certification', value: 'USDA Organic' }],
    createdAt: '2024-01-20',
  },
  {
    id: 'p10', name: 'Farm Eggs — Free Range', slug: 'farm-eggs-free-range',
    description: 'Eggs from hens raised in open, natural environments with access to fresh air, sunlight, and natural feed. Rich yolks, firm whites, and superior nutritional profile. No antibiotics, no hormones.',
    shortDescription: 'Hormone-free free-range eggs — rich yolks, superior nutrition.',
    price: 89, comparePrice: 110,
    images: [
      'https://images.unsplash.com/photo-1518569656558-1f25e69d2221?w=600&q=80',
      'https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=600&q=80',
    ],
    category: 'Dairy & Eggs', categoryId: 'cat3', rating: 4.7, reviewCount: 189,
    stock: 80, sku: 'EGG-001', isFeatured: false, isBestseller: true, isNew: false,
    tags: ['free-range', 'fresh', 'protein'],
    specifications: [{ key: 'Pack', value: '12 eggs' }, { key: 'Type', value: 'Free Range' }, { key: 'Feed', value: 'Natural grain' }, { key: 'Shelf Life', value: '21 days' }],
    createdAt: '2024-03-01',
  },
  {
    id: 'p11', name: 'Green Tea — Darjeeling First Flush', slug: 'darjeeling-first-flush-green-tea',
    description: 'The finest first flush green tea from the misty hills of Darjeeling. Light, floral, and delicately sweet. Each batch is handpicked in spring for maximum freshness and antioxidants.',
    shortDescription: 'Spring-harvested Darjeeling first flush — floral, light, antioxidant-rich.',
    price: 449, comparePrice: 550,
    images: [
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&q=80',
    ],
    category: 'Beverages', categoryId: 'cat5', rating: 4.8, reviewCount: 134,
    stock: 45, sku: 'TEA-001', isFeatured: true, isBestseller: false, isNew: false,
    tags: ['tea', 'premium', 'antioxidant'],
    specifications: [{ key: 'Weight', value: '100g (50 cups)' }, { key: 'Flush', value: 'First Flush' }, { key: 'Origin', value: 'Darjeeling, WB' }, { key: 'Caffeine', value: 'Low' }],
    createdAt: '2024-02-10',
  },
  {
    id: 'p12', name: 'Aloe Vera Face Wash', slug: 'aloe-vera-face-wash',
    description: 'Gentle daily face wash enriched with pure aloe vera extract, neem, and cucumber. Removes impurities without stripping natural moisture. Suitable for all skin types. Paraben-free and dermatologically tested.',
    shortDescription: 'Gentle aloe vera face wash — hydrating, paraben-free, for all skin types.',
    price: 199, comparePrice: 249,
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
      'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&q=80',
    ],
    category: 'Personal Care', categoryId: 'cat7', rating: 4.4, reviewCount: 56,
    stock: 55, sku: 'SKN-001', isFeatured: false, isBestseller: false, isNew: true,
    tags: ['skincare', 'natural', 'paraben-free'],
    specifications: [{ key: 'Volume', value: '150 ml' }, { key: 'Skin Type', value: 'All Types' }, { key: 'Aloe Content', value: '70%' }, { key: 'Certifications', value: 'Dermatologist Tested' }],
    createdAt: '2024-04-15',
  },
];

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', userId: 'u1', userName: 'Priya Sharma', userAvatar: 'https://i.pravatar.cc/40?img=1', rating: 5, comment: 'Absolutely delicious! The mangoes were perfectly ripe, sweet, and aromatic. Will definitely order again next season!', date: '2024-04-20', helpful: 24 },
  { id: 'r2', productId: 'p1', userId: 'u2', userName: 'Rahul Mehta', userAvatar: 'https://i.pravatar.cc/40?img=2', rating: 5, comment: 'Best Alphonso mangoes I have ever tasted. Delivered fresh and well-packaged. No damage to any mango.', date: '2024-04-18', helpful: 18 },
  { id: 'r3', productId: 'p1', userId: 'u3', userName: 'Ananya Krishnan', userAvatar: 'https://i.pravatar.cc/40?img=3', rating: 4, comment: 'Great quality mangoes! The flavour was exceptional. One mango was slightly under-ripe but overall very happy.', date: '2024-04-15', helpful: 11 },
  { id: 'r4', productId: 'p2', userId: 'u4', userName: 'Vikram Patel', userAvatar: 'https://i.pravatar.cc/40?img=4', rating: 5, comment: 'Freshest strawberries I have had this season. Perfect sweetness and size.', date: '2024-04-19', helpful: 9 },
  { id: 'r5', productId: 'p3', userId: 'u5', userName: 'Deepa Nair', userAvatar: 'https://i.pravatar.cc/40?img=5', rating: 5, comment: 'The rice has a beautiful aroma and cooks perfectly fluffy. My biryani has never tasted better!', date: '2024-03-25', helpful: 32 },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001', customerId: 'u1', customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com', customerPhone: '+91 98765 43210',
    address: { line1: '123 MG Road', line2: 'Apt 4B', city: 'Bangalore', state: 'Karnataka', pincode: '560001' },
    items: [
      { productId: 'p1', productName: 'Organic Alphonso Mangoes', price: 599, quantity: 2, image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100&q=80' },
      { productId: 'p7', productName: 'Himalayan Pink Salt Almonds', price: 349, quantity: 1, image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=100&q=80' },
    ],
    subtotal: 1547, discount: 100, deliveryCharge: 49, total: 1496,
    status: 'delivered', paymentMethod: 'upi', paymentStatus: 'paid',
    couponCode: 'SAVE100', createdAt: '2024-04-10', updatedAt: '2024-04-13',
  },
  {
    id: 'ORD-002', customerId: 'u1', customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com', customerPhone: '+91 98765 43210',
    address: { line1: '123 MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001' },
    items: [
      { productId: 'p8', productName: 'Cold Brew Coffee Concentrate', price: 299, quantity: 2, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&q=80' },
    ],
    subtotal: 598, discount: 0, deliveryCharge: 49, total: 647,
    status: 'shipped', paymentMethod: 'cod', paymentStatus: 'pending',
    createdAt: '2024-04-18', updatedAt: '2024-04-19',
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210',
    avatar: 'https://i.pravatar.cc/100?img=1', role: 'customer',
    addresses: [
      { id: 'addr1', line1: '123 MG Road', line2: 'Apt 4B', city: 'Bangalore', state: 'Karnataka', pincode: '560001', isDefault: true },
    ],
    createdAt: '2024-01-15',
  },
  {
    id: 'admin1', name: 'Admin User', email: 'admin@shopease.com', phone: '+91 90000 00001',
    role: 'admin', addresses: [], createdAt: '2024-01-01',
  },
];

export const coupons = [
  { code: 'WELCOME10', type: 'percentage' as const, value: 10, minOrder: 200, description: '10% off on orders above ₹200' },
  { code: 'SAVE100', type: 'fixed' as const, value: 100, minOrder: 500, description: '₹100 off on orders above ₹500' },
  { code: 'FIRST50', type: 'fixed' as const, value: 50, minOrder: 150, description: '₹50 off on your first order' },
  { code: 'FLAT20', type: 'percentage' as const, value: 20, minOrder: 800, description: '20% off on orders above ₹800' },
];

export const testimonials = [
  { id: 1, name: 'Priya Sharma', role: 'Regular Customer', avatar: 'https://i.pravatar.cc/60?img=1', rating: 5, comment: 'ShopEase has completely changed how I grocery shop! Fresh produce delivered right to my door within hours. The quality is outstanding and prices are very competitive.', location: 'Bangalore' },
  { id: 2, name: 'Rajesh Kumar', role: 'Home Chef', avatar: 'https://i.pravatar.cc/60?img=2', rating: 5, comment: 'As a passionate home chef, quality ingredients are everything. ShopEase consistently delivers the freshest, highest quality products. Their organic section is exceptional!', location: 'Mumbai' },
  { id: 3, name: 'Anjali Nair', role: 'Fitness Enthusiast', avatar: 'https://i.pravatar.cc/60?img=3', rating: 5, comment: 'Love the health-focused product range! Finding quality superfoods, organic produce, and healthy snacks all in one place is a game changer for my fitness journey.', location: 'Chennai' },
  { id: 4, name: 'Vikram Patel', role: 'Business Owner', avatar: 'https://i.pravatar.cc/60?img=4', rating: 4, comment: 'Reliable, fast delivery and excellent customer service. The WhatsApp ordering system makes it incredibly easy. Great experience every single time!', location: 'Ahmedabad' },
  { id: 5, name: 'Meera Reddy', role: 'Nutritionist', avatar: 'https://i.pravatar.cc/60?img=5', rating: 5, comment: 'I recommend ShopEase to all my clients. The organic and natural product range is extensive, sourcing is transparent, and the freshness is unmatched.', location: 'Hyderabad' },
];

export const salesData = [
  { month: 'Jan', revenue: 42000, orders: 180 },
  { month: 'Feb', revenue: 56000, orders: 210 },
  { month: 'Mar', revenue: 48000, orders: 195 },
  { month: 'Apr', revenue: 72000, orders: 280 },
  { month: 'May', revenue: 65000, orders: 245 },
  { month: 'Jun', revenue: 89000, orders: 320 },
  { month: 'Jul', revenue: 95000, orders: 355 },
  { month: 'Aug', revenue: 78000, orders: 298 },
  { month: 'Sep', revenue: 102000, orders: 380 },
  { month: 'Oct', revenue: 118000, orders: 425 },
  { month: 'Nov', revenue: 135000, orders: 490 },
  { month: 'Dec', revenue: 158000, orders: 560 },
];

export const socialProofItems = [
  { user: 'Priya S.', product: 'Organic Alphonso Mangoes', location: 'Bangalore', time: '2 mins ago' },
  { user: 'Rahul M.', product: 'Cold Brew Coffee', location: 'Mumbai', time: '5 mins ago' },
  { user: 'Anjali K.', product: 'Greek Yogurt', location: 'Chennai', time: '8 mins ago' },
  { user: 'Vijay R.', product: 'Himalayan Pink Salt Almonds', location: 'Hyderabad', time: '12 mins ago' },
  { user: 'Deepa N.', product: 'Premium Basmati Rice', location: 'Pune', time: '15 mins ago' },
  { user: 'Suresh P.', product: 'Darjeeling Green Tea', location: 'Delhi', time: '20 mins ago' },
  { user: 'Meera L.', product: 'Artisan Sourdough Bread', location: 'Kolkata', time: '25 mins ago' },
];
