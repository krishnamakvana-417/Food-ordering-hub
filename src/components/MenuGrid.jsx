import { motion, AnimatePresence } from 'motion/react';
import FoodCard from './FoodCard';
import React from 'react'
// MenuGrid renders the food grid and handles:
// - Filtered list of items
// - Empty state with reset button

function MenuGrid({ items, favorites, onAddToCart, onToggleFavorite, onClearFilters }) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {items.length > 0 ? (
          items.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              isFavorite={favorites.has(item.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearFilters}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MenuGrid;
