// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  tags: string[];
  specifications: { key: string; value: string }[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  description: string;
}

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'upi' | 'razorpay';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface Address {
  id?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lng?: number;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
}

// Filter Types
export interface ProductFilters {
  search: string;
  categoryId: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  sortBy: 'newest' | 'popular' | 'price-asc' | 'price-desc';
}

// Analytics Types
export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  ordersChange: number;
  revenueChange: number;
}

export interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
}
