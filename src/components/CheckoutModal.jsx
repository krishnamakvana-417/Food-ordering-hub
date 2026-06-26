import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, MapPin, User, Phone, CheckCircle } from 'lucide-react';

function CheckoutModal({ isOpen, onClose, total, itemCount }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Format card number: spaces after every 4 digits
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    // Format expiry: MM/YY
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    // CVV: only numbers, max 3
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = 'Valid phone required';
    if (!form.address.trim()) newErrors.address = 'Address required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Valid card number required';
    if (form.expiry.length < 5) newErrors.expiry = 'Valid expiry required';
    if (form.cvv.length < 3) newErrors.cvv = 'Valid CVV required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setForm({ name: '', phone: '', address: '', cardNumber: '', expiry: '', cvv: '' });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

              {step === 1 ? (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {itemCount} items · Total: <span className="font-semibold text-orange-500">${total.toFixed(2)}</span>
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Delivery Info */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Delivery Details
                      </h3>
                      <div className="space-y-3">
                        {/* Name */}
                        <div>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              value={form.name}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                                errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                              }`}
                            />
                          </div>
                          {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              value={form.phone}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                                errors.phone ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                              }`}
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                        </div>

                        {/* Address */}
                        <div>
                          <textarea
                            name="address"
                            placeholder="Delivery Address"
                            value={form.address}
                            onChange={handleChange}
                            rows={2}
                            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${
                              errors.address ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                            }`}
                          />
                          {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Payment Details
                      </h3>
                      <div className="space-y-3">
                        {/* Card Number */}
                        <div>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="cardNumber"
                              placeholder="Card Number"
                              value={form.cardNumber}
                              onChange={handleChange}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                                errors.cardNumber ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                              }`}
                            />
                          </div>
                          {errors.cardNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cardNumber}</p>}
                        </div>

                        {/* Expiry + CVV */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              name="expiry"
                              placeholder="MM/YY"
                              value={form.expiry}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                                errors.expiry ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                              }`}
                            />
                            {errors.expiry && <p className="text-red-500 text-xs mt-1 ml-1">{errors.expiry}</p>}
                          </div>
                          <div>
                            <input
                              type="text"
                              name="cvv"
                              placeholder="CVV"
                              value={form.cvv}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                                errors.cvv ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                              }`}
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Subtotal</span>
                        <span>${(total - total * 0.1 - 3.99).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span>Tax (10%)</span>
                        <span>${(total * 0.1 / 1.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Delivery Fee</span>
                        <span>$3.99</span>
                      </div>
                      <div className="border-t border-orange-200 dark:border-orange-800 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span className="text-orange-500">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 text-lg"
                    >
                      🎉 Place Order · ${total.toFixed(2)}
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Success Screen */
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Order Placed! 🎉
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Thank you, <span className="font-semibold text-orange-500">{form.name}</span>!
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Your order of <span className="font-semibold">${total.toFixed(2)}</span> is confirmed and will be delivered to you shortly. 🚀
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg"
                    >
                      Back to Menu
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CheckoutModal;