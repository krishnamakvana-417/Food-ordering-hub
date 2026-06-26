import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Moon, Sun, Search, X, Filter, Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';

// ─── Food Data ────────────────────────────────────────────────────────────────
const foodItems = [
  {
    id: '1',
    name: 'Gourmet Burger',
    price: 12.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZGVsaWNpb3VzfGVufDF8fHx8MTc4MjQyNTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Juicy beef patty with premium toppings and special sauce',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 14.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBmcmVzaHxlbnwxfHx8fDE3ODIzNTIyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh mozzarella, basil, and tomato sauce on crispy crust',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Sushi Platter',
    price: 24.99,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXIlMjBqYXBhbmVzZXxlbnwxfHx8fDE3ODIzODIyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Assorted fresh sushi and sashimi with wasabi and ginger',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Caesar Salad',
    price: 9.99,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZCUyMGhlYWx0aHl8ZW58MXx8fHwxNzgyNDI1Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Crisp romaine lettuce with parmesan and Caesar dressing',
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Pasta Carbonara',
    price: 13.99,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMGNyZWFteXxlbnwxfHx8fDE3ODI0MjU3ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Creamy pasta with pancetta, eggs, and parmesan cheese',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Tacos al Pastor',
    price: 11.99,
    category: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc4MjM5NzE3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Marinated pork tacos with pineapple, cilantro, and onions',
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Ramen Bowl',
    price: 15.99,
    category: 'Asian',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2wlMjBub29kbGVzfGVufDF8fHx8MTc4MjIzNTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich broth with noodles, egg, pork, and vegetables',
    rating: 4.9,
  },
  {
    id: '8',
    name: 'Grilled Steak',
    price: 22.99,
    category: 'Steaks',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGdyaWxsZWQlMjBtZWF0fGVufDF8fHx8MTc4MjI4MTY1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Prime cut steak grilled to perfection with herb butter',
    rating: 4.7,
  },
  {
    id: '9',
    name: 'Chocolate Cake',
    price: 7.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3ODIzOTI5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich chocolate cake with ganache frosting',
    rating: 4.8,
  },
  {
    id: '10',
    name: 'Ice Cream Sundae',
    price: 6.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMHN1bmRhZXxlbnwxfHx8fDE3ODIzMTA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Vanilla ice cream with chocolate sauce and sprinkles',
    rating: 4.6,
  },
  {
    id: '11',
    name: 'Crispy Wings',
    price: 10.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBjcmlzcHl8ZW58MXx8fHwxNzgyNDI1NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Crispy chicken wings with your choice of sauce',
    rating: 4.7,
  },
  {
    id: '12',
    name: 'Smoothie Bowl',
    price: 8.99,
    category: 'Healthy',
    image: 'https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2wlMjBhY2FpfGVufDF8fHx8MTc4MjQyNTc5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Acai smoothie bowl topped with fresh fruits and granola',
    rating: 4.5,
  },
];

const categories = [
  'All', 'Burgers', 'Pizza', 'Asian', 'Salads', 'Pasta',
  'Mexican', 'Steaks', 'Desserts', 'Appetizers', 'Healthy',
];

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [isDark, setIsDark] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedTheme) setIsDark(savedTheme === 'dark');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Filter items
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || favorites.has(item.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        toast.success(`Added another ${item.name} to cart!`);
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        toast.success(`${item.name} added to cart!`);
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    toast.error(`${item?.name} removed from cart`);
  };

  const handleClearCart = () => {
    setCartItems([]);
    toast.error('Cart cleared');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast('Removed from favorites', { icon: '💔' });
      } else {
        next.add(id);
        toast('Added to favorites!', { icon: '❤️' });
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setShowFavoritesOnly(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = totalPrice + totalPrice * 0.1 + (totalPrice > 0 ? 3.99 : 0);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Toaster position="top-center" richColors />

        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="text-4xl">🍔</div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    FoodHub
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Delicious food delivered</p>
                </div>
              </motion.div>

              {/* Desktop Search */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  {searchQuery && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDark(!isDark)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`p-3 rounded-xl transition-colors ${
                    showFavoritesOnly
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      showFavoritesOnly
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Category Filter */}
        <div className="sticky top-[73px] md:top-[89px] z-20 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {showFavoritesOnly
                ? 'Your Favorites'
                : selectedCategory === 'All'
                ? 'All Dishes'
                : selectedCategory}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
            </p>
          </motion.div>

          <MenuGrid
            items={filteredItems}
            favorites={favorites}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onClearFilters={handleClearFilters}
          />
        </main>

        {/* Cart Sidebar */}
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
          onClearCart={handleClearCart}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={handleCheckoutComplete}
          total={finalTotal}
          itemCount={totalItems}
        />
      </div>
    </div>
  );
}

export default App;