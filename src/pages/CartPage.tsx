import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, Tag, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, coupon, applyCoupon, removeCoupon, getSubtotal, getDiscount, getTotal, deliveryCharge } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const freeDelivery = subtotal - discount >= 999;
  const delivery = freeDelivery ? 0 : deliveryCharge;
  const total = getTotal();

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
    setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-28 h-28 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-14 h-14 text-primary-300" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/products" id="continue-shopping-btn" className="btn-primary inline-flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart <span className="text-gray-400 font-normal text-lg">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div key={item.product.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20, height: 0 }} transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card flex gap-4">
                  <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 rounded-xl object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-primary-500 dark:text-primary-400 font-medium">{item.product.category}</p>
                        <Link to={`/products/${item.product.slug}`} className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors line-clamp-2 text-sm mt-0.5">
                          {item.product.name}
                        </Link>
                      </div>
                      <button onClick={() => { removeItem(item.product.id); toast.success('Item removed'); }}
                        id={`remove-${item.product.id}`}
                        className="flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} id={`dec-${item.product.id}`}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center font-semibold text-sm text-gray-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} id={`inc-${item.product.id}`}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          disabled={item.quantity >= item.product.stock}>
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">₹{item.product.price * item.quantity}</p>
                        {item.quantity > 1 && <p className="text-xs text-gray-400">₹{item.product.price} each</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/products" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium text-sm hover:gap-3 transition-all mt-4">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-500" /> Apply Coupon
              </h3>
              {coupon ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-2.5">
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">{coupon.code}</p>
                    <p className="text-xs text-green-600 dark:text-green-500">{coupon.description}</p>
                  </div>
                  <button onClick={removeCoupon} id="remove-coupon-btn" className="text-red-500 hover:text-red-700 text-xs font-semibold">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={couponInput} onChange={e => setCouponInput(e.target.value.toUpperCase())} placeholder="Enter coupon code" id="coupon-input"
                    className="input-field flex-1 py-2.5 text-sm uppercase" onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()} />
                  <button onClick={handleApplyCoupon} id="apply-coupon-btn" className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">Apply</button>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">Try: WELCOME10 · SAVE100 · FIRST50 · FLAT20</p>
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span><span className="font-medium text-gray-900 dark:text-white">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({coupon?.code})</span><span>−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Delivery</span>
                  <span className={freeDelivery ? 'text-green-600 font-medium' : 'font-medium text-gray-900 dark:text-white'}>
                    {freeDelivery ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>
                {!freeDelivery && (
                  <p className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-2 rounded-lg">
                    Add ₹{999 - (subtotal - discount)} more for free delivery!
                  </p>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-primary-600 dark:text-primary-400">₹{total}</span>
                </div>
              </div>
              <button onClick={() => navigate('/checkout')} id="proceed-to-checkout-btn"
                className="w-full btn-primary mt-5 flex items-center justify-center gap-2 py-4 text-base">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>🔒</span> Secure, encrypted checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
