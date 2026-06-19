import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { products, categories } from '../data/mockData';
import type { ProductFilters } from '../types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function FilterSidebar({ filters, onChange, onClose }: { filters: ProductFilters; onChange: (f: Partial<ProductFilters>) => void; onClose?: () => void }) {
  const maxP = Math.max(...products.map(p => p.price));
  return (
    <div className="space-y-6">
      {onClose && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-display font-bold text-lg">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
        </div>
      )}

      {/* Category */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="cat" checked={filters.categoryId === ''} onChange={() => onChange({ categoryId: '' })} className="accent-primary-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">All Categories</span>
          </label>
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <input type="radio" name="cat" checked={filters.categoryId === cat.id} onChange={() => onChange({ categoryId: cat.id })} className="accent-primary-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 transition-colors">{cat.name}</span>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{cat.productCount}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Price Range</h4>
        <div className="space-y-3">
          <input type="range" min={0} max={maxP} value={filters.maxPrice} onChange={e => onChange({ maxPrice: Number(e.target.value) })} className="w-full" />
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>₹{filters.minPrice}</span>
            <span className="font-semibold text-primary-600 dark:text-primary-400">Up to ₹{filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={filters.inStock} onChange={e => onChange({ inStock: e.target.checked })} className="accent-primary-500 rounded" />
          <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
        </label>
      </div>

      {/* Reset */}
      <button onClick={() => onChange({ categoryId: '', minPrice: 0, maxPrice: maxP, inStock: false, search: '' })}
        className="w-full py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 transition-colors">
        Reset Filters
      </button>
    </div>
  );
}

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const maxP = Math.max(...products.map(p => p.price));

  const [filters, setFilters] = useState<ProductFilters>({
    search: searchParams.get('search') || '',
    categoryId: searchParams.get('category') || '',
    minPrice: 0,
    maxPrice: maxP,
    inStock: false,
    sortBy: 'newest',
  });

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    setFilters(f => ({ ...f, search, categoryId: category }));
  }, [searchParams]);

  const updateFilter = (updates: Partial<ProductFilters>) => setFilters(f => ({ ...f, ...updates }));

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.search) list = list.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.category.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.categoryId) list = list.filter(p => p.categoryId === filters.categoryId);
    if (filters.inStock) list = list.filter(p => p.stock > 0);
    list = list.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'popular') list.sort((a, b) => b.reviewCount - a.reviewCount);
    else list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{filtered.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="product-search"
                  value={filters.search}
                  onChange={e => updateFilter({ search: e.target.value })}
                  placeholder="Search products..."
                  className="input-field pl-9 py-2.5 text-sm"
                />
                {filters.search && <button onClick={() => updateFilter({ search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
              </div>
              {/* Sort */}
              <div className="relative">
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={e => updateFilter({ sortBy: e.target.value as ProductFilters['sortBy'] })}
                  className="appearance-none input-field py-2.5 pr-8 text-sm cursor-pointer"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilter(true)}
                id="mobile-filter-btn"
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-2 border-primary-500 text-primary-600 rounded-xl text-sm font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card sticky top-24">
            <h3 className="font-display font-bold text-lg mb-6 text-gray-900 dark:text-white">Filters</h3>
            <FilterSidebar filters={filters} onChange={updateFilter} />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto shadow-2xl">
            <FilterSidebar filters={filters} onChange={updateFilter} onClose={() => setShowMobileFilter(false)} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
