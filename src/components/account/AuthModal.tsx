import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Eye, EyeOff, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import toast from 'react-hot-toast';

export default function AuthModal() {
  const { isAuthModalOpen, authModalTab, setAuthModalOpen } = useUIStore();
  const [tab, setTab] = useState<'login' | 'signup'>(authModalTab);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuthStore();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) { toast.success(result.message); setAuthModalOpen(false); }
    else toast.error(result.message);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) { toast.error('Please fill all fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    const result = await signup(form.name, form.email, form.phone, form.password);
    setLoading(false);
    if (result.success) { toast.success(result.message + ' 🎉'); setAuthModalOpen(false); }
    else toast.error(result.message);
  };

  const close = () => setAuthModalOpen(false);

  // Demo credentials helper
  const fillDemo = () => { setForm(f => ({ ...f, email: 'priya@example.com', password: 'password123' })); };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={close}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-primary p-6 text-center relative">
              <button onClick={close} id="auth-modal-close"
                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-primary-500" />
              </div>
              <h2 className="font-display text-xl font-bold text-white">
                {tab === 'login' ? 'Welcome back!' : 'Create account'}
              </h2>
              <p className="text-white/70 text-sm mt-1">
                {tab === 'login' ? 'Sign in to your ShopEase account' : 'Join thousands of happy shoppers'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-800">
              {(['login', 'signup'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} id={`auth-tab-${t}`}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-gray-500 hover:text-gray-700'}`}>
                  {t === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {tab === 'login' ? (
                  <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="login-email">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="login-email" type="email" value={form.email} onChange={e => set('email', e.target.value)}
                          placeholder="you@example.com" className="input-field pl-10" autoComplete="email" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="login-password">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="login-password" type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                          placeholder="••••••••" className="input-field pl-10 pr-10" autoComplete="current-password" />
                        <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" id="login-submit" disabled={loading}
                      className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-70">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                    </button>
                    <button type="button" onClick={fillDemo} className="w-full text-xs text-primary-600 dark:text-primary-400 hover:underline">
                      Use demo credentials (priya@example.com)
                    </button>
                  </motion.form>
                ) : (
                  <motion.form key="signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="signup-name">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="signup-name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Priya Sharma" className="input-field pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="signup-email">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="signup-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" className="input-field pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="signup-phone">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-500">+91</span>
                        <input id="signup-phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" className="input-field pl-16" maxLength={10} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="signup-password">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="signup-password" type={showPw ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)}
                          placeholder="Min. 6 characters" className="input-field pl-10 pr-10" />
                        <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" id="signup-submit" disabled={loading}
                      className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-70">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
