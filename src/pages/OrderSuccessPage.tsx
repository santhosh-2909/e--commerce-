import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, Home, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { orderData?: { name: string }; total?: number; paymentMethod?: string } | null;

  useEffect(() => {
    if (!state?.orderData) { navigate('/'); return; }
    // Trigger confetti
    const fire = (particleRatio: number, opts: object) => {
      confetti({ origin: { y: 0.7 }, ...opts, particleCount: Math.floor(200 * particleRatio) });
    };
    setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    }, 300);
  }, []);

  if (!state?.orderData) return null;

  const orderId = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
        className="max-w-lg w-full">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-primary p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-11 h-11 text-primary-500" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="font-display text-2xl font-black text-white mb-2">Order Confirmed! 🎉</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-white/80 text-sm">Thank you, {state.orderData.name}! Your order has been received.</motion.p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Order ID & Total */}
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                <p className="font-bold text-gray-900 dark:text-white font-mono text-sm">#{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Amount Paid</p>
                <p className="font-black text-primary-600 dark:text-primary-400 text-xl">₹{state.total}</p>
              </div>
            </div>

            {/* Payment method */}
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <span className="text-2xl">{state.paymentMethod === 'cod' ? '💵' : state.paymentMethod === 'upi' ? '📱' : '💳'}</span>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-300 text-sm">
                  {state.paymentMethod === 'cod' ? 'Cash on Delivery' : state.paymentMethod === 'upi' ? 'UPI Payment' : 'Card / Net Banking'}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Payment {state.paymentMethod === 'cod' ? 'due on delivery' : 'received'}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">What happens next?</h3>
              {[
                { icon: '✅', title: 'Order Received', desc: 'Your order details sent to WhatsApp', done: true },
                { icon: '📦', title: 'Order Processing', desc: 'We\'re preparing your items', done: false },
                { icon: '🚚', title: 'Out for Delivery', desc: 'Your order is on the way', done: false },
                { icon: '🎉', title: 'Delivered!', desc: 'Enjoy your purchase', done: false },
              ].map((step, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${step.done ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700/30'}`}>
                  <span className="text-lg flex-shrink-0">{step.icon}</span>
                  <div>
                    <p className={`font-semibold text-sm ${step.done ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>{step.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
                  </div>
                  {step.done && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto flex-shrink-0 mt-0.5" />}
                </div>
              ))}
            </div>

            {/* WhatsApp note */}
            <div className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-4">
              <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0" />
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Your order details have been sent to our WhatsApp. We'll confirm via WhatsApp within 5–10 minutes.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Link to="/" id="back-to-home-btn"
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 transition-all">
                <Home className="w-4 h-4" /> Home
              </Link>
              <Link to="/products" id="continue-shopping-success-btn"
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-sm">
                Shop More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
