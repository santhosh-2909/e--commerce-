import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { products } from '../../data/mockData';
import toast from 'react-hot-toast';

export default function QuickViewModal() {
  const { quickViewProductId, setQuickViewProductId } = useUIStore();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const product = products.find(p => p.id === quickViewProductId);
  const inWishlist = product ? isInWishlist(product.id) : false;

  const close = () => { setQuickViewProductId(null); setQuantity(1); setActiveImg(0); };

  if (!product) return null;

  return (
    <AnimatePresence>
      {quickViewProductId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <button onClick={close} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Images */}
              <div className="relative bg-sand-100 dark:bg-gray-800 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden aspect-square">
                <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
                {product.images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {product.images.map((_, i) => (
                        <button key={i} onClick={() => setActiveImg(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${i === activeImg ? 'bg-primary-500' : 'bg-white/60'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col">
                <span className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-2">{product.category}</span>
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />)}</div>
                  <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                  {product.comparePrice && <span className="text-gray-400 line-through">₹{product.comparePrice}</span>}
                  {product.comparePrice && <span className="text-rose-500 text-sm font-semibold">{Math.round((1 - product.price / product.comparePrice) * 100)}% off</span>}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{product.shortDescription}</p>

                {/* Stock */}
                <p className={`text-xs font-semibold mb-5 ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
                  {product.stock > 10 ? '✓ In Stock' : product.stock > 0 ? `⚡ Only ${product.stock} left` : '✗ Out of Stock'}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Qty:</span>
                  <div className="flex items-center gap-0 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    disabled={product.stock === 0}
                    onClick={() => { addItem(product, quantity); toast.success(`${product.name} added to cart! 🛒`); close(); }}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={() => { toggleItem(product); toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist ❤️'); }}
                    className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all ${inWishlist ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-rose-300 hover:text-rose-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link to={`/products/${product.slug}`} onClick={close} className="mt-3 text-center text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  View full details →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
