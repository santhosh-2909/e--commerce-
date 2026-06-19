import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Minus, Plus, Share2, Shield, Truck, RotateCcw, Zap } from 'lucide-react';
import { products, reviews } from '../data/mockData';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/product/ProductCard';
import toast from 'react-hot-toast';
import { useNavigate as useNav } from 'react-router-dom';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <Link to="/products" className="btn-primary inline-block mt-4">Browse Products</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in ordering:\n${product.name} x ${quantity}\nPrice: ₹${product.price * quantity}\nPlease confirm availability.`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.categoryId}`} className="hover:text-primary-600">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-sand-100 dark:bg-gray-800 cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
              />
              {discount > 0 && <span className="absolute top-4 left-4 badge bg-rose-500 text-white text-sm px-3 py-1">{discount}% OFF</span>}
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-primary-500 shadow-md' : 'border-transparent hover:border-gray-300'}`}>
                    <img src={img} alt={`${product.name} ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link to={`/products?category=${product.categoryId}`} className="tag">{product.category}</Link>
                {product.isBestseller && <span className="badge bg-amber-500 text-white">🔥 Bestseller</span>}
                {product.isNew && <span className="badge bg-primary-500 text-white">New</span>}
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />)}</div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-gray-900 dark:text-white">₹{product.price}</span>
              {product.comparePrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.comparePrice}</span>
                  <span className="text-green-600 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">You save ₹{product.comparePrice - product.price}</span>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.shortDescription}</p>

            {/* Stock */}
            <div className={`flex items-center gap-2 font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
              <Zap className="w-4 h-4" />
              {product.stock > 10 ? 'In Stock — Ready to ship' : product.stock > 0 ? `Low Stock — Only ${product.stock} left!` : 'Out of Stock'}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900 dark:text-white">Quantity:</span>
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" id="qty-decrease"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-bold text-gray-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q+1))} className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" id="qty-increase"><Plus className="w-4 h-4" /></button>
              </div>
              <span className="text-sm text-gray-500">Max: {product.stock}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} disabled={product.stock === 0} id="add-to-cart-detail"
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button onClick={handleBuyNow} disabled={product.stock === 0} id="buy-now-btn"
                className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                Buy Now
              </button>
              <button onClick={() => { toggleItem(product); toast.success(inWishlist ? 'Removed from wishlist' : '❤️ Added to wishlist!'); }}
                id="wishlist-detail-btn"
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${inWishlist ? 'border-rose-500 bg-rose-50 text-rose-500 dark:bg-rose-900/20' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-rose-300'}`}>
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Order */}
            <a href={`https://wa.me/919999999999?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" id="whatsapp-order-btn"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background: '#25D366' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Order via WhatsApp
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              {[
                { Icon: Truck, text: 'Free Delivery', sub: 'On orders ₹999+' },
                { Icon: Shield, text: 'Quality Assured', sub: '100% guarantee' },
                { Icon: RotateCcw, text: 'Easy Returns', sub: '24h return policy' },
              ].map(({ Icon, text, sub }) => (
                <div key={text} className="text-center">
                  <Icon className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{text}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-8">
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                id={`tab-${tab}`}
                className={`px-6 py-3 font-semibold text-sm capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                {tab === 'reviews' ? `Reviews (${productReviews.length})` : tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {activeTab === 'description' && (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{product.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                  </div>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className={`flex px-6 py-4 ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-750'}`}>
                      <span className="w-40 font-semibold text-gray-600 dark:text-gray-400 text-sm flex-shrink-0">{spec.key}</span>
                      <span className="text-gray-900 dark:text-white text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {productReviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No reviews yet. Be the first to review!</div>
                  ) : productReviews.map(r => (
                    <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
                      <div className="flex items-start gap-4">
                        <img src={r.userAvatar} alt={r.userName} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm">{r.userName}</span>
                            <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex mb-2">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />)}</div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{r.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex gap-3 shadow-2xl">
        <button onClick={handleAddToCart} disabled={product.stock === 0} id="mobile-add-to-cart"
          className="flex-1 btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-50">
          <ShoppingCart className="w-5 h-5" /> Add to Cart — ₹{product.price * quantity}
        </button>
        <button onClick={() => { toggleItem(product); }}
          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center ${inWishlist ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-gray-200 text-gray-500'}`}>
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}
