import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Instagram, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { toast.error('Please enter a valid email.'); return; }
    toast.success('🎉 Subscribed! Welcome to ShopEase.');
    setEmail('');
  };

  const shopLinks = [
    { label: 'Fresh Fruits', path: '/products?category=cat1' },
    { label: 'Vegetables', path: '/products?category=cat2' },
    { label: 'Dairy & Eggs', path: '/products?category=cat3' },
    { label: 'Bakery', path: '/products?category=cat4' },
    { label: 'Beverages', path: '/products?category=cat5' },
    { label: 'Snacks', path: '/products?category=cat6' },
  ];

  const helpLinks = [
    { label: 'My Account', path: '/account' },
    { label: 'My Orders', path: '/account/orders' },
    { label: 'Wishlist', path: '/account/wishlist' },
    { label: 'Track Order', path: '/account/orders' },
    { label: 'Returns & Refunds', path: '/' },
    { label: 'Contact Us', path: '/' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">ShopEase</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted neighbourhood store online. Premium products, fresh produce, and instant delivery to your doorstep.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400 flex-shrink-0" /><span>+91 90000 00001</span></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-400 flex-shrink-0" /><span>hello@shopease.in</span></div>
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" /><span>123 Commerce Street, Bangalore, Karnataka 560001</span></div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-base">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-primary-300 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-base">Help</h3>
            <ul className="space-y-2.5">
              {helpLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-primary-300 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-white mb-5 text-base">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">Get exclusive deals, seasonal offers, and fresh arrivals straight to your inbox.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2 mb-6">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button type="submit" id="newsletter-submit" className="p-2.5 bg-primary-500 hover:bg-primary-400 rounded-xl transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">© 2024 ShopEase. All rights reserved. Made with ❤️ in India.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
          </div>
          {/* Payment icons */}
          <div className="flex items-center gap-2">
            {['UPI', 'COD', 'Razorpay'].map(p => (
              <span key={p} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400 font-medium">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
