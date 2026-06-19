import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Leaf, Clock, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { products, categories, testimonials } from '../data/mockData';

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[85vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      {/* Glowing orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-sand-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Fresh Arrivals · Free Delivery above ₹999
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Premium Quality,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand-300 to-sand-100">
              Doorstep Delivery.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
            Shop the freshest produce, artisan foods, and everyday essentials. Quality guaranteed, delivered in hours.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4">
            <button onClick={() => navigate('/products')} id="hero-shop-now"
              className="group flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-sand-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/products?featured=true')} id="hero-featured"
              className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200">
              Featured Deals
            </button>
          </motion.div>
          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-6 mt-10">
            {[{ icon: '⭐', text: '4.8/5 Rating' }, { icon: '🚚', text: 'Same-day Delivery' }, { icon: '🔒', text: 'Secure Payments' }].map(b => (
              <div key={b.text} className="flex items-center gap-2 text-white/70 text-sm">
                <span className="text-lg">{b.icon}</span> {b.text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — hero image collage */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block">
          <div className="relative">
            <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=640&q=80" alt="Fresh produce" className="w-full h-full object-cover" />
            </div>
            {/* Floating cards */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🥭</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Alphonso Mango</p>
                <p className="text-primary-600 font-semibold text-xs">₹599 / dozen</p>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-xs font-semibold text-gray-900">4.8/5 Rating</p>
              <p className="text-xs text-gray-500">2,400+ reviews</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

// ─── Category Grid ─────────────────────────────────────────────────────────
function CategorySection() {
  return (
    <section className="py-16 bg-sand-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="tag">Shop by Category</span>
          <h2 className="section-title mt-3">Find What You Need</h2>
          <p className="section-subtitle">Browse our curated categories of fresh and quality products.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to={`/products?category=${cat.id}`} id={`cat-${cat.id}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary-500 dark:hover:bg-primary-600 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors text-center leading-tight">{cat.name}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 group-hover:text-white/70 transition-colors">{cat.productCount} items</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Products ─────────────────────────────────────────────────────
function FeaturedSection() {
  const featured = products.filter(p => p.isFeatured).slice(0, 4);
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="tag">Handpicked for You</span>
            <h2 className="section-title mt-3">Featured Products</h2>
          </div>
          <Link to="/products?featured=true" className="hidden sm:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/products?featured=true" className="btn-outline inline-flex items-center gap-2">View All Featured <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

// ─── Bestsellers ──────────────────────────────────────────────────────────
function BestSellersSection() {
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
  return (
    <section className="py-16 bg-sand-50 dark:bg-gray-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="tag">🔥 Most Popular</span>
            <h2 className="section-title mt-3">Best Sellers</h2>
          </div>
          <Link to="/products?sort=popular" className="hidden sm:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ─────────────────────────────────────────────────────────
function WhySection() {
  const reasons = [
    { icon: <Leaf className="w-6 h-6" />, title: 'Farm Fresh', desc: 'Sourced directly from trusted farms and producers. Delivered at peak freshness.' },
    { icon: <Truck className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Same-day delivery within city limits. Free shipping on orders above ₹999.' },
    { icon: <Shield className="w-6 h-6" />, title: 'Quality Guaranteed', desc: '100% quality assurance on every product. Full refund if not satisfied.' },
    { icon: <Clock className="w-6 h-6" />, title: '24/7 Support', desc: 'WhatsApp support available round the clock. We\'re always here to help.' },
  ];
  return (
    <section className="py-16 bg-gradient-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Why Choose ShopEase?</h2>
          <p className="text-white/70 text-lg">We're not just a store — we're your trusted grocery partner.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">{r.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{r.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="tag">❤️ Loved by Customers</span>
          <h2 className="section-title mt-3">What People Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card p-6 flex flex-col">
              <div className="flex mb-3">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />)}</div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-4">"{t.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'How quickly do you deliver?', a: 'We offer same-day delivery within city limits for orders placed before 2 PM. Standard delivery takes 1-2 business days for other areas.' },
    { q: 'What is your return policy?', a: 'We offer a 24-hour return policy on all products. If you\'re not satisfied with the freshness or quality, contact us on WhatsApp for an immediate replacement or refund.' },
    { q: 'Do you offer bulk ordering for businesses?', a: 'Yes! We cater to restaurants, cafes, offices, and supermarkets. Contact us on WhatsApp for bulk pricing and special business rates.' },
    { q: 'What payment methods do you accept?', a: 'We accept Cash on Delivery (COD), UPI (PhonePe, GPay, Paytm), and credit/debit cards via Razorpay. All payments are 100% secure.' },
    { q: 'Are your organic products certified?', a: 'Yes, our organic products carry USDA Organic and India Organic certifications. Each product page mentions the specific certifications applicable.' },
    { q: 'Can I order via WhatsApp?', a: 'Absolutely! Our WhatsApp ordering system makes it super easy. Just tap the WhatsApp button, share your requirements, and we\'ll confirm your order instantly.' },
  ];
  return (
    <section className="py-16 bg-sand-50 dark:bg-gray-800/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="tag">Questions & Answers</span>
          <h2 className="section-title mt-3">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card">
              <button onClick={() => setOpen(open === i ? null : i)} id={`faq-${i}`}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-primary-500 flex-shrink-0">
                  <ChevronDown className="w-5 h-5" />
                </motion.span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="px-6 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────
function CTABanner() {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-hero text-white p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-black mb-4">Start Shopping Today!</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 10,000+ happy customers. First order? Get ₹50 off with code <span className="bg-white/20 px-2 py-0.5 rounded font-mono text-sm">FIRST50</span></p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('/products')} id="cta-shop-now"
                className="bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-sand-100 transition-all hover:-translate-y-1 shadow-xl">
                Shop Now 🛒
              </button>
              <a href={`https://wa.me/919999999999?text=${encodeURIComponent('Hi! I want to place an order.')}`} target="_blank" rel="noopener noreferrer" id="cta-whatsapp"
                className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1">
                📱 Order via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Instagram Feed ────────────────────────────────────────────────────────
function InstagramSection() {
  const images = [
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&q=80',
    'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=300&q=80',
    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
    'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&q=80',
  ];
  return (
    <section className="py-16 bg-sand-50 dark:bg-gray-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Follow Us on Instagram</h2>
          <p className="section-subtitle">@shopease.store — Share your orders with #ShopEase</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {images.map((img, i) => (
            <motion.a key={i} href="#" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="relative aspect-square rounded-2xl overflow-hidden group block">
              <img src={img} alt={`Instagram ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-all duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main HomePage ─────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <BestSellersSection />
      <WhySection />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
      <InstagramSection />
    </>
  );
}
