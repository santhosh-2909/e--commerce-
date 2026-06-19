import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { mockOrders } from '../data/mockData';
import type { OrderStatus } from '../types';

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  confirmed: 'bg-blue-100   text-blue-700   dark:bg-blue-900/20   dark:text-blue-400',
  shipped:   'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  delivered: 'bg-green-100  text-green-700  dark:bg-green-900/20  dark:text-green-400',
  cancelled: 'bg-red-100    text-red-700    dark:bg-red-900/20    dark:text-red-400',
};

export default function OrderHistoryPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { setAuthModalOpen } = useUIStore();
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Package className="w-16 h-16 text-primary-300 mb-4" />
        <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">View your orders</h2>
        <p className="text-gray-500 mb-6 text-sm">Sign in to access your order history.</p>
        <button onClick={() => setAuthModalOpen(true, 'login')} className="btn-primary px-8 py-3">Sign In</button>
      </div>
    );
  }

  const orders = mockOrders.filter(o => o.customerId === user!.id);

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Package className="w-16 h-16 text-primary-300 mb-4" />
        <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6 text-sm">Looks like you haven't placed any orders.</p>
        <Link to="/products" className="btn-primary px-8 py-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
              {/* Order header */}
              <button onClick={() => setOpenOrder(openOrder === order.id ? null : order.id)}
                id={`order-${order.id}`}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">#{order.id}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">₹{order.total}</p>
                    <p className="text-xs text-gray-500">{order.items.length} items</p>
                  </div>
                  <span className={`badge ${STATUS_COLORS[order.status]} capitalize`}>{order.status}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openOrder === order.id ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Order details */}
              {openOrder === order.id && (
                <div className="border-t border-gray-100 dark:border-gray-700 p-5 space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  {/* Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 text-sm space-y-1.5">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
                    {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−₹{order.discount}</span></div>}
                    <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span>₹{order.deliveryCharge}</span></div>
                    <div className="flex justify-between font-bold text-base border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                      <span>Total</span><span className="text-primary-600 dark:text-primary-400">₹{order.total}</span>
                    </div>
                  </div>
                  {/* Delivery address */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Delivery Address</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{order.address.line1}, {order.address.city}, {order.address.state} — {order.address.pincode}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`badge capitalize ${STATUS_COLORS[order.status]}`}>Status: {order.status}</span>
                    <span className="badge bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 capitalize">Payment: {order.paymentMethod}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
