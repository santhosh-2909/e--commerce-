import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, ClipboardList, Heart, LogOut, Edit2, Save, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { mockOrders } from '../data/mockData';

export default function AccountPage() {
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const { setAuthModalOpen } = useUIStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-primary-300" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign in to your account</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Access your orders, wishlist, and saved addresses.</p>
          <button onClick={() => setAuthModalOpen(true, 'login')} id="account-signin-btn" className="btn-primary px-8 py-3">Sign In / Sign Up</button>
        </div>
      </div>
    );
  }

  const userOrders = mockOrders.filter(o => o.customerId === user!.id);

  const handleSave = () => { updateUser(form); setEditing(false); };

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
    delivered: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card text-center">
              <div className="relative inline-block mb-4">
                {user!.avatar ? (
                  <img src={user!.avatar} alt={user!.name} className="w-20 h-20 rounded-full object-cover mx-auto" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-primary text-white text-2xl font-bold flex items-center justify-center mx-auto">
                    {user!.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">{user!.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user!.email}</p>
              <p className="text-xs text-gray-400 mt-1">Member since {new Date(user!.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

              <div className="grid grid-cols-2 gap-3 mt-5 text-center">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="font-bold text-xl text-primary-600 dark:text-primary-400">{userOrders.length}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                  <p className="font-bold text-xl text-primary-600 dark:text-primary-400">{user!.addresses.length}</p>
                  <p className="text-xs text-gray-500">Addresses</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
              {[
                { to: '/account/orders', icon: ClipboardList, label: 'My Orders' },
                { to: '/account/wishlist', icon: Heart, label: 'Wishlist' },
              ].map(({ to, icon: Icon, label }) => (
                <Link key={to} to={to} className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <Icon className="w-4 h-4 text-primary-500" />
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </Link>
              ))}
              <button onClick={logout} id="logout-btn"
                className="flex items-center gap-3 px-5 py-4 w-full text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600">
                <LogOut className="w-4 h-4" />
                <span className="font-medium text-sm">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Edit */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">Profile Details</h3>
                {!editing ? (
                  <button onClick={() => setEditing(true)} id="edit-profile-btn" className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} id="save-profile-btn" className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700">
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', placeholder: 'Your name' },
                  { label: 'Phone Number', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
                  { label: 'Email Address', key: 'email', placeholder: 'you@example.com' },
                ].map(f => (
                  <div key={f.key} className={f.key === 'email' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">{f.label}</label>
                    {editing ? (
                      <input value={form[f.key as keyof typeof form]} onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))}
                        className="input-field" placeholder={f.placeholder} id={`profile-${f.key}`} />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium text-sm py-2.5 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        {form[f.key as keyof typeof form] || <span className="text-gray-400 italic">Not set</span>}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">Recent Orders</h3>
                <Link to="/account/orders" className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">View All</Link>
              </div>
              {userOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No orders yet. Start shopping!</p>
                </div>
              ) : userOrders.map(order => (
                <div key={order.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors mb-2 border border-gray-100 dark:border-gray-700">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">#{order.id}</p>
                      <span className={`badge text-xs ${statusColor[order.status]}`}>{order.status}</span>
                    </div>
                    <p className="text-xs text-gray-500">{order.items.length} items · ₹{order.total}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved Addresses */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" /> Saved Addresses
              </h3>
              {user!.addresses.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-sm">No saved addresses yet.</div>
              ) : user!.addresses.map((addr, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-3">
                  {addr.isDefault && <span className="badge bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-2">Default</span>}
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                  <p className="text-sm text-gray-500">{addr.city}, {addr.state} — {addr.pincode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
