import { motion } from 'motion/react';
import { Plus, Heart, Star } from 'lucide-react';
import { useState, forwardRef } from 'react';
import React from 'react'
// FoodItem shape (for reference, no TS needed):
// { id, name, price, category, image, description, rating }

const FoodCard = forwardRef(function FoodCard(
  { item, onAddToCart, isFavorite, onToggleFavorite },
  ref
) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggleFavorite(item.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        />
      </motion.button>

      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(item.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({item.rating})</span>
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${item.price.toFixed(2)}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isAdding}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 flex items-center gap-2"
          >
            <motion.div
              animate={isAdding ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent" />
      </div>
    </motion.div>
  );
});

export default FoodCard;
