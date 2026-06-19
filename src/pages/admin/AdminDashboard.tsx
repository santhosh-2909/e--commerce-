import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ShoppingBag, DollarSign, Package, Users, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { products, mockOrders, mockUsers, salesData } from '../../data/mockData';

function MetricCard({ title, value, change, icon: Icon, color, prefix = '' }: {
  title: string; value: number | string; change: number; icon: React.ElementType; color: string; prefix?: string;
}) {
  const isUp = change >= 0;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="font-display text-2xl font-bold text-white mb-2">{prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}</p>
      <div className={`flex items-center gap-1 text-xs font-semibold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        {Math.abs(change)}% vs last month
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 5);
  const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);

  const metrics = [
    { title: 'Total Orders', value: mockOrders.length + 142, change: 12.5, icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'Total Revenue', value: totalRevenue + 48000, change: 18.2, icon: DollarSign, color: 'bg-primary-500', prefix: '₹' },
    { title: 'Total Products', value: products.length, change: 5.1, icon: Package, color: 'bg-purple-500' },
    { title: 'Total Customers', value: mockUsers.length + 340, change: -2.3, icon: Users, color: 'bg-amber-500' },
  ];

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400', confirmed: 'text-blue-400',
    shipped: 'text-purple-400', delivered: 'text-green-400', cancelled: 'text-red-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back! Here's what's happening.</p>
        </div>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <MetricCard {...m} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-white">Revenue Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Monthly revenue for 2024</p>
            </div>
            <span className="text-xs text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full font-semibold">↑ 18.2% this year</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#004741" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#004741" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }}
                formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#004741" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#004741' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-display font-bold text-white mb-1">Orders</h2>
          <p className="text-xs text-gray-500 mb-5">Monthly orders trend</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }} />
              <Line type="monotone" dataKey="orders" stroke="#F0EDE4" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition-colors">
                <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-4 h-4 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">#{order.id}</p>
                  <p className="text-xs text-gray-500 truncate">{order.customerName} · {order.items.length} items</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">₹{order.total}</p>
                  <p className={`text-xs font-semibold capitalize ${statusColors[order.status]}`}>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-white">Top Products</h2>
            <Link to="/admin/products" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="space-y-3">
            {products.filter(p => p.isBestseller).slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600 w-4 text-center">{i + 1}</span>
                <img src={p.images[0]} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.reviewCount} reviews</p>
                </div>
                <p className="text-xs font-bold text-primary-400 flex-shrink-0">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
