import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { setAuthModalOpen } = useUIStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Heart className="w-16 h-16 text-rose-300 mb-4" />
        <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist awaits</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm text-center">Sign in to save and view your favourite products.</p>
        <button onClick={() => setAuthModalOpen(true, 'login')} className="btn-primary px-8 py-3">Sign In to View Wishlist</button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-rose-300" />
          </div>
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Save items you love by tapping the heart icon.</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" /> Wishlist
            <span className="text-gray-400 font-normal text-lg">({items.length})</span>
          </h1>
          <button onClick={() => { items.forEach(p => addItem(p)); toast.success('All items added to cart! 🛒'); }}
            id="add-all-to-cart-btn"
            className="btn-outline text-sm py-2 px-4 hidden sm:flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> Add All to Cart
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product, i) => (
            <motion.div key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card group">
              <Link to={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-sand-100 dark:bg-gray-700">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {product.comparePrice && (
                  <span className="absolute top-3 left-3 badge bg-rose-500 text-white">
                    {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
                  </span>
                )}
              </Link>
              <div className="p-4">
                <p className="text-xs text-primary-500 font-medium mb-1">{product.category}</p>
                <Link to={`/products/${product.slug}`} className="font-semibold text-sm text-gray-900 dark:text-white hover:text-primary-600 transition-colors line-clamp-2 mb-2 block">
                  {product.name}
                </Link>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                  {product.comparePrice && <span className="text-xs text-gray-400 line-through">₹{product.comparePrice}</span>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { addItem(product); toast.success(`${product.name} added to cart! 🛒`); }}
                    id={`wishlist-cart-${product.id}`}
                    className="flex-1 btn-primary text-sm py-2.5 flex items-center justify-center gap-1.5">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                  <button onClick={() => { removeItem(product.id); toast.success('Removed from wishlist'); }}
                    id={`wishlist-remove-${product.id}`}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
