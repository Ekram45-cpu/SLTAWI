import React, { useState, useEffect } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { Coffee, Search, Flame, ArrowLeft, ArrowRight, Eye, ChevronLeft, ChevronRight, DollarSign, Filter, Grid3X3, RefreshCw } from 'lucide-react';

export default function MenuView() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'views'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [isPopularOnly, setIsPopularOnly] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Active Selected Detail Item (Overlay)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Load Menu Items from server-side paginated API
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        category: selectedCategory,
        isPopular: isPopularOnly ? 'true' : 'false',
        search: searchQuery,
        sortBy,
        sortOrder
      });

      const response = await fetch(`/api/menu?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
        setTotalPages(data.totalPages);
        setTotalItems(data.total);
      } else {
        console.error('Failed to fetch menu items');
      }
    } catch (err) {
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [page, selectedCategory, isPopularOnly, sortBy, sortOrder]);

  // Handle Search Trigger (Triggered when query changes, with reset of page to 1)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMenuItems();
  };

  // Increment view count dynamically in backend when an item is selected
  const handleItemDetailClick = async (item: MenuItem) => {
    setSelectedItem(item);
    setCarouselIndex(0);
    
    try {
      const res = await fetch(`/api/menu/${item.id}/view`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        // Update views count locally for instant visual feedback
        setItems((prevItems) =>
          prevItems.map((m) => (m.id === item.id ? { ...m, views: data.views } : m))
        );
        setSelectedItem((prev) => (prev ? { ...prev, views: data.views } : null));
      }
    } catch (err) {
      console.error('Error logging view event:', err);
    }
  };

  const handleNextImage = () => {
    if (!selectedItem) return;
    setCarouselIndex((prev) => (prev === selectedItem.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    if (!selectedItem) return;
    setCarouselIndex((prev) => (prev === 0 ? selectedItem.images.length - 1 : prev - 1));
  };

  const categories: string[] = ['All', 'Food', 'Drinks', 'Desserts', 'Starters'];

  return (
    <div id="digital-menu-view" className="space-y-20 pt-32 pb-20">
      
      {/* 1. SECTION HEADER */}
      <section id="menu-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-wider">
          <Coffee className="w-4 h-4 text-orange-500 animate-spin-slow" /> Advanced Showcase
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-slate-950 tracking-tight leading-none">
          Digital Menu System Demo
        </h1>
        <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base">
          This showcases Siltawi's proprietary **SmartMenu** full-stack engine. Experience smooth filtering, client view attribution counters, server-side pagination, and rich multi-image detailed pages.
        </p>
      </section>

      {/* 2. DYNAMIC CONTROLS & FILTER GRID */}
      <section id="menu-filters-controls" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
          
          {/* Main Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Search Input Box (Col span 5) */}
            <form onSubmit={handleSearchSubmit} className="md:col-span-5 flex relative">
              <input
                type="text"
                placeholder="Search menu items (e.g. Tibs, Coffee, Platter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-20 py-3 border border-slate-200 rounded-xl text-slate-900 bg-slate-50 text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
              <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Search
              </button>
            </form>

            {/* Sort Dropdown (Col span 3) */}
            <div className="md:col-span-3 flex items-center gap-2.5">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                  setPage(1);
                }}
                className="w-full px-3.5 py-3 border border-slate-200 rounded-xl text-slate-900 bg-slate-50 text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="name-asc">Alphabetical (A-Z)</option>
                <option value="name-desc">Alphabetical (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="views-desc">Most Viewed</option>
                <option value="views-asc">Least Viewed</option>
              </select>
            </div>

            {/* Popular Filter Checkbox (Col span 2) */}
            <div className="md:col-span-2 flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={isPopularOnly}
                  onChange={(e) => {
                    setIsPopularOnly(e.target.checked);
                    setPage(1);
                  }}
                  className="rounded border-slate-300 text-orange-500 focus:ring-orange-500 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                  Popular
                </span>
              </label>
            </div>

            {/* Refresh / Reset Button (Col span 2) */}
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSortBy('name');
                  setSortOrder('asc');
                  setIsPopularOnly(false);
                  setPage(1);
                  fetchMenuItems();
                }}
                className="w-full sm:w-auto px-4.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="border-t border-slate-100 pt-5 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MENU ITEMS GRID */}
      <section id="menu-items-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <RefreshCw className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-slate-500 font-medium">Synchronizing with live backend db.json...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-semibold">No items matched your specific filter metrics.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setIsPopularOnly(false);
                setPage(1);
              }}
              className="mt-4 px-4.5 py-2.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600"
            >
              Clear Filter State
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                id={`menu-item-card-${item.id}`}
                onClick={() => handleItemDetailClick(item)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </div>
                    {item.isPopular && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white p-1.5 rounded-full shadow-md flex items-center justify-center animate-bounce-slow">
                        <Flame className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-orange-500 transition-colors leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-lg font-extrabold text-orange-600 flex items-center gap-0.5">
                        {item.price} <span className="text-[11px] font-bold text-slate-500 tracking-wider">ETB</span>
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-xs font-medium text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>{item.views || 0} Views</span>
                  </div>
                  <span className="font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                    View Details & Photos →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. SERVER-SIDE PAGINATION DISPLAY */}
      {totalPages > 1 && !loading && (
        <section id="menu-pagination" className="flex items-center justify-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            id="menu-pagination-prev"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`p-2.5 rounded-xl border border-slate-200 flex items-center justify-center transition-all ${
              page === 1 ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Page <span className="font-bold text-slate-950">{page}</span> of {totalPages} <span className="text-xs text-slate-400 font-normal">({totalItems} total items)</span>
          </span>

          <button
            id="menu-pagination-next"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className={`p-2.5 rounded-xl border border-slate-200 flex items-center justify-center transition-all ${
              page === totalPages ? 'opacity-50 cursor-not-allowed bg-slate-100' : 'bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      )}

      {/* 5. MENU ITEM DETAIL PAGE OVERLAY (CAROUSEL VIEW) */}
      {selectedItem && (
        <div id="menu-item-detail-modal" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in relative grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-slate-100">
            
            {/* Close Button */}
            <button
              id="close-menu-detail-btn"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100/90 hover:bg-orange-500 hover:text-white text-slate-800 rounded-full transition-all z-20"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Left Image Carousel (Col span 6) */}
            <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:h-[550px] bg-slate-950 flex items-center justify-center select-none">
              <img
                src={selectedItem.images[carouselIndex]}
                alt={`${selectedItem.name} photo`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent"></div>

              {/* Multi-image indicators/navigator */}
              {selectedItem.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 p-2 bg-black/60 hover:bg-orange-500 text-white rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 p-2 bg-black/60 hover:bg-orange-500 text-white rounded-full transition-colors"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-slate-950/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {selectedItem.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          carouselIndex === idx ? 'w-4 bg-orange-500' : 'bg-slate-400'
                        }`}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Information Section (Col span 6) */}
            <div className="md:col-span-6 p-8 flex flex-col justify-between h-[500px] md:h-[550px] overflow-y-auto">
              <div className="space-y-6">
                
                {/* Meta details */}
                <div className="flex items-center justify-between">
                  <span className="bg-orange-100 text-orange-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Eye className="w-4 h-4 text-orange-500" />
                    <span className="font-bold">{selectedItem.views || 0} Views recorded</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight leading-tight">
                    {selectedItem.name}
                  </h2>
                  <div className="text-2xl font-extrabold text-orange-600">
                    {selectedItem.price} <span className="text-xs font-bold text-slate-500">ETB</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Description</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.isPopular && (
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center gap-3">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                    <div className="text-xs font-semibold text-orange-950">
                      Top Choice! This is one of the most frequently ordered items in Addis Ababa.
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <div className="text-xs text-slate-400 font-medium">
                  * Note: In a production setup, this scans directly to order systems.
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all text-center"
                  >
                    Back to Menu List
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
