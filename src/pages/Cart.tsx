import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { formatPrice } from '@/utils/formatPrice';
import { FREE_DELIVERY_THRESHOLD } from '@/store/cartStore';

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    getItemCount,
  } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null);

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getTotal() - discount;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FOOD2026') {
      setDiscount(10);
      setPromoApplied(true);
      addToast('优惠码已应用，立减 ¥10！', 'success');
    } else if (promoCode.trim() === '') {
      addToast('请输入优惠码', 'warning');
    } else {
      setDiscount(0);
      setPromoApplied(false);
      addToast('无效的优惠码', 'error');
    }
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    setDiscount(0);
    setPromoApplied(false);
    setPromoCode('');
    addToast('购物车已清空', 'info');
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    setShowDeleteId(null);
    addToast('商品已移除', 'info');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-100 pt-8 pb-24">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 px-4"
          >
            <div className="w-32 h-32 rounded-full bg-primary-50 flex items-center justify-center mb-8">
              <ShoppingBag className="w-16 h-16 text-primary-300" />
            </div>
            <h2 className="text-2xl font-bold text-dark-700 mb-3 font-display">
              购物车还是空的
            </h2>
            <p className="text-dark-600/60 text-lg mb-10 text-center max-w-sm">
              发现美味佳肴，开启美食之旅
            </p>
            <button onClick={() => navigate('/menu')} className="btn-primary px-12 py-4 text-lg">
              去逛逛
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 pt-8 pb-36 lg:pb-8">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary-500" />
            <h1 className="text-2xl md:text-3xl font-bold font-display text-dark-800">
              我的购物车
              <span className="ml-2 text-base md:text-lg font-medium text-dark-500">
                ({itemCount} 件商品)
              </span>
            </h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              清空购物车
            </button>

            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-modal p-4 w-64 border border-gray-100"
                >
                  <p className="text-sm text-dark-700 mb-4">确定要清空购物车吗？此操作不可撤销。</p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-4 py-2 text-sm font-medium text-dark-500 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      确认清空
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => {
                const unitPrice = item.totalPrice / item.quantity;
                const specsText = Object.entries(item.selectedSpecs)
                  .filter(([, value]) => value && value !== '无')
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(' | ');

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      layout: { duration: 0.25 },
                    }}
                    className="bg-white rounded-2xl shadow-card p-4 md:p-5 relative overflow-hidden"
                  >
                    {/* Delete confirmation overlay */}
                    <AnimatePresence>
                      {showDeleteId === item.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-center gap-4 rounded-2xl"
                        >
                          <span className="text-dark-700 font-medium">确认删除该商品？</span>
                          <button
                            onClick={() => setShowDeleteId(null)}
                            className="px-4 py-1.5 text-sm text-dark-500 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            取消
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="px-4 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                          >
                            删除
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => navigate('/menu')}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold text-dark-800 text-base md:text-lg cursor-pointer hover:text-primary-500 transition-colors truncate"
                          onClick={() => navigate('/menu')}
                        >
                          {item.dish.name}
                        </h3>
                        {specsText && (
                          <p className="text-xs md:text-sm text-dark-500 mt-1 line-clamp-1">
                            {specsText}
                          </p>
                        )}
                        <p className="text-primary-600 font-semibold mt-1 text-sm md:text-base">
                          {formatPrice(unitPrice)}/份
                        </p>

                        {/* Quantity & Actions */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-dark-600 hover:bg-white hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-dark-800 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-dark-600 hover:bg-white hover:shadow-sm transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-bold text-dark-800 text-base md:text-lg">
                              {formatPrice(item.totalPrice)}
                            </span>
                            <button
                              onClick={() => setShowDeleteId(item.id)}
                              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[380px] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:sticky lg:top-8 space-y-4"
            >
              {/* Promo Code */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-primary-500" />
                  <span className="font-semibold text-dark-800 text-sm">
                    优惠码
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      if (promoApplied) {
                        setDiscount(0);
                        setPromoApplied(false);
                      }
                    }}
                    placeholder="输入优惠码"
                    className="input-field flex-1 text-sm py-2.5"
                    disabled={promoApplied}
                  />
                  {!promoApplied ? (
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-primary-50 text-primary-600 font-semibold text-sm rounded-xl hover:bg-primary-100 transition-colors whitespace-nowrap"
                    >
                      应用
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setDiscount(0);
                        setPromoApplied(false);
                        setPromoCode('');
                      }}
                      className="px-3 py-2.5 bg-accent-50 text-accent-600 font-semibold text-sm rounded-xl flex items-center gap-1 hover:bg-accent-100 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      已用
                    </button>
                  )}
                </div>
                {promoApplied && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 text-sm text-accent-600 font-medium"
                  >
                    ✓ 已享受 ¥{discount} 优惠
                  </motion.p>
                )}
                <p className="mt-2 text-xs text-dark-400">
                  试试输入：FOOD2026
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-card p-5 space-y-4">
                <h3 className="font-bold text-lg text-dark-800 font-display">
                  订单摘要
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-500">商品小计</span>
                    <span className="font-medium text-dark-700">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-dark-500">配送费</span>
                    <span
                      className={`font-medium ${
                        isFreeDelivery ? 'text-accent-600' : 'text-dark-700'
                      }`}
                    >
                      {isFreeDelivery ? '已免运费' : formatPrice(deliveryFee)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between"
                    >
                      <span className="text-accent-600">优惠</span>
                      <span className="font-medium text-accent-600">
                        -{formatPrice(discount)}
                      </span>
                    </motion.div>
                  )}

                  {!isFreeDelivery && (
                    <p className="text-xs text-primary-500 pt-1">
                      再买 {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} 免运费
                    </p>
                  )}

                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-dark-800 font-semibold">
                        实付金额
                      </span>
                      <span className="text-2xl font-bold text-primary-600 font-display">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full py-4 text-base mt-2"
                >
                  去结算
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
