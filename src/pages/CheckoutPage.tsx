import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Navigation, CreditCard, Smartphone, Truck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  line1: z.string().min(5, 'Enter a complete address'),
  city: z.string().min(2, 'Enter your city'),
  state: z.string().min(2, 'Enter your state'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
});
type FormData = z.infer<typeof schema>;

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: <Truck className="w-5 h-5" />, desc: 'Pay when your order arrives' },
  { id: 'upi', label: 'UPI Payment', icon: <Smartphone className="w-5 h-5" />, desc: 'PhonePe, GPay, Paytm, BHIM' },
  { id: 'razorpay', label: 'Card / Net Banking', icon: <CreditCard className="w-5 h-5" />, desc: 'Powered by Razorpay — 100% secure' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, getDiscount, getTotal, deliveryCharge, coupon, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'razorpay'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const freeDelivery = subtotal - discount >= 999;
  const delivery = freeDelivery ? 0 : deliveryCharge;
  const total = getTotal();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone?.replace(/\D/g, '').slice(-10) || '',
    },
  });

  const detectLocation = () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const addr = data.address;
          setValue('line1', `${addr.road || addr.pedestrian || ''} ${addr.neighbourhood || addr.suburb || ''}`.trim());
          setValue('city', addr.city || addr.town || addr.village || '');
          setValue('state', addr.state || '');
          setValue('pincode', addr.postcode?.replace(/\s/g, '') || '');
          toast.success('📍 Location detected!');
        } catch {
          toast.error('Could not fetch address. Please enter manually.');
        }
        setLocationLoading(false);
      },
      () => { toast.error('Location access denied. Please enable location permission.'); setLocationLoading(false); }
    );
  };

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) { toast.error('Your cart is empty!'); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate processing

    // Build WhatsApp message
    const itemLines = items.map(i => `• ${i.product.name} × ${i.quantity} — ₹${i.product.price * i.quantity}`).join('\n');
    const msg = `🛒 *New Order — ShopEase*\n\n*Customer Details:*\nName: ${data.name}\nPhone: +91${data.phone}\nEmail: ${data.email}\nAddress: ${data.line1}, ${data.city}, ${data.state} - ${data.pincode}\n\n*Ordered Products:*\n${itemLines}\n\n*Order Summary:*\nSubtotal: ₹${subtotal}\nDiscount: −₹${discount}${coupon ? ` (${coupon.code})` : ''}\nDelivery: ₹${delivery}\n*Total: ₹${total}*\n\nPayment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Card/Net Banking'}\nOrder ID: #ORD-${Date.now().toString().slice(-6)}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919999999999?text=${encoded}`, '_blank');

    clearCart();
    setIsSubmitting(false);
    navigate('/order-success', { state: { orderData: data, total, paymentMethod } });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
          {['Cart', 'Checkout', 'Confirmation'].map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${i === 1 ? 'bg-primary-500 text-white' : i < 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                {i < 1 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span>{i + 1}</span>} {step}
              </div>
              {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5">Customer Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-name">Full Name *</label>
                  <input id="checkout-name" {...register('name')} placeholder="Priya Sharma" className="input-field" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-phone">Mobile Number *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+91</span>
                    <input id="checkout-phone" {...register('phone')} placeholder="9876543210" className="input-field pl-12" maxLength={10} />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-email">Email Address *</label>
                  <input id="checkout-email" {...register('email')} placeholder="priya@example.com" className="input-field" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Delivery Address</h2>
                <button type="button" onClick={detectLocation} disabled={locationLoading} id="detect-location-btn"
                  className="flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 disabled:opacity-50 transition-colors">
                  <Navigation className={`w-4 h-4 ${locationLoading ? 'animate-spin' : ''}`} />
                  {locationLoading ? 'Detecting...' : 'Use my location'}
                </button>
              </div>

              {/* Map placeholder */}
              <div className="w-full h-40 rounded-xl mb-4 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Map will display your delivery location</p>
                  <p className="text-xs text-gray-400 mt-1">Click "Use my location" or enter address below</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-line1">Address Line 1 *</label>
                  <input id="checkout-line1" {...register('line1')} placeholder="House/Flat No., Street, Area" className="input-field" />
                  {errors.line1 && <p className="text-xs text-red-500 mt-1">{errors.line1.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-city">City *</label>
                    <input id="checkout-city" {...register('city')} placeholder="Bangalore" className="input-field" />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-state">State *</label>
                    <input id="checkout-state" {...register('state')} placeholder="Karnataka" className="input-field" />
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="checkout-pincode">Pincode *</label>
                    <input id="checkout-pincode" {...register('pincode')} placeholder="560001" className="input-field" maxLength={6} />
                    {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id} htmlFor={`payment-${m.id}`} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === m.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}>
                    <input type="radio" id={`payment-${m.id}`} name="payment" value={m.id} checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id as typeof paymentMethod)} className="accent-primary-500" />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === m.id ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                      {m.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{m.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {paymentMethod === 'upi' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                  <input placeholder="Enter UPI ID (e.g. 9876543210@upi)" id="upi-id-input" className="input-field" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card sticky top-24">
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white flex-shrink-0">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>₹{subtotal}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−₹{discount}</span></div>}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery</span><span className={freeDelivery ? 'text-green-600' : ''}>{freeDelivery ? 'FREE' : `₹${delivery}`}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span><span className="text-primary-600">₹{total}</span>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} id="place-order-btn"
                className="w-full btn-primary mt-5 flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70">
                {isSubmitting ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5" /> Place Order — ₹{total}</>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                📱 Order details will be sent to WhatsApp
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
