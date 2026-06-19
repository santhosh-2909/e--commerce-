import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye, Zap, TrendingUp } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import type { Product } from '../../types';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { setQuickViewProductId } = useUIStore();
  const inWishlist = isInWishlist(product.id);
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    addItem(product);
    toast.success(`${product.name} added to cart!`, { icon: '🛒' });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist ❤️');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="card overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden bg-sand-100 dark:bg-gray-700 aspect-square">
            {!imageLoaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {discount > 0 && (
                <span className="badge bg-rose-500 text-white">{discount}% OFF</span>
              )}
              {product.isBestseller && (
                <span className="badge bg-amber-500 text-white flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> Bestseller
                </span>
              )}
              {product.isNew && <span className="badge bg-primary-500 text-white">New</span>}
              {product.stock === 0 && <span className="badge bg-gray-500 text-white">Out of Stock</span>}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              id={`wishlist-${product.id}`}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${inWishlist ? 'bg-rose-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose-50 hover:text-rose-500'} shadow-md`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Quick Actions Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <button
                onClick={(e) => { e.preventDefault(); setQuickViewProductId(product.id); }}
                id={`quickview-${product.id}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold shadow-md hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> Quick View
              </button>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4 flex flex-col flex-1">
            <p className="text-xs text-primary-500 dark:text-primary-400 font-medium mb-1">{product.category}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4 mt-auto">
              <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
              {product.comparePrice && (
                <span className="text-sm text-gray-400 line-through">₹{product.comparePrice}</span>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              id={`add-to-cart-${product.id}`}
              disabled={product.stock === 0}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                product.stock === 0
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-primary hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : (
                <><ShoppingCart className="w-4 h-4" /><span>Add to Cart</span></>
              )}
            </button>

            {/* Stock indicator */}
            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-center text-xs text-amber-500 font-medium mt-2 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3" /> Only {product.stock} left!
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
