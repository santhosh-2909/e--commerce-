import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3,
  Tag, Menu, X, ChevronRight, LogOut, Bell, Settings, ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const NAV = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/categories', icon: Tag, label: 'Categories' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to) && to !== '/admin'
      ? true : location.pathname === to;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800">
        <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-display font-bold text-white text-sm">ShopEase</p>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, icon: Icon, label, exact }) => (
          <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
            id={`admin-nav-${label.toLowerCase()}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive(to, exact)
                ? 'bg-primary-500 text-white shadow-primary'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}>
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">{label}</span>
            {isActive(to, exact) && <ChevronRight className="w-4 h-4 ml-auto" />}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-2">
        <Link to="/" target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm">
          <ExternalLink className="w-4 h-4" /> View Store
        </Link>
        <button onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-colors w-full text-sm">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-xl mt-2">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name || 'Admin'}</p>
            <p className="text-gray-500 text-[10px] truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 flex flex-col lg:hidden shadow-2xl">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} id="admin-menu-toggle"
            className="lg:hidden p-2 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs text-gray-500 font-medium">
              {NAV.find(n => isActive(n.to, n.exact))?.label || 'Admin'} / Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors" id="admin-notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
            <button className="p-2 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors" id="admin-settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-950 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
