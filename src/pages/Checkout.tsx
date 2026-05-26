import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Banknote,
  Smartphone,
  Lock,
  ShieldCheck,
  Truck,
  Loader2,
  MapPin,
  User,
  Phone,
  FileText,
  CircleDot,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import {
  formatPrice,
  generateOrderId,
  estimateDeliveryTime,
} from '@/utils/formatPrice';

interface FormData {
  name: string;
  phone: string;
  address: string;
  note: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

const isValidPhone = (phone: string): boolean => {
  return /^1[3-9]\d{9}$/.test(phone);
};

const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

const PAYMENT_METHODS = [
  { id: 'online', label: '在线支付', icon: CreditCard, recommended: true },
  { id: 'cod', label: '货到付款', icon: Banknote, recommended: false },
  { id: 'wechat', label: '微信支付', icon: Smartphone, recommended: false },
  { id: 'alipay', label: '支付宝支付', icon: CreditCard, recommended: false },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart, getSubtotal, getDeliveryFee, getTotal, getItemCount } =
    useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [processing, setProcessing] = useState(false);
  const [orderExpanded, setOrderExpanded] = useState(true);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const itemCount = getItemCount();

  useEffect(() => {
    if (items.length === 0 && !processing) {
      navigate('/cart');
    }
  }, [items.length, navigate, processing]);

  useEffect(() => {
    const savedAddress = localStorage.getItem('checkout-address');
    if (savedAddress) {
      try {
        const parsed = JSON.parse(savedAddress);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const validateField = (field: keyof FormData): string | undefined => {
    const value = formData[field];
    switch (field) {
      case 'name':
        if (!isRequired(value)) return '请输入收货人姓名';
        break;
      case 'phone':
        if (!isRequired(value)) return '请输入联系电话';
        if (!isValidPhone(value)) return '请输入有效的手机号码';
        break;
      case 'address':
        if (!isRequired(value)) return '请输入收货地址';
        break;
      default:
        break;
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateForm = (): boolean => {
    const fields: (keyof FormData)[] = ['name', 'phone', 'address'];
    const newErrors: FormErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      phone: true,
      address: true,
      note: touched.note,
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      addToast('请填写完整的配送信息', 'error');
      return;
    }

    setProcessing(true);

    localStorage.setItem(
      'checkout-address',
      JSON.stringify({ name: formData.name, phone: formData.phone, address: formData.address })
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = generateOrderId();
    clearCart();
    addToast('订单提交成功！', 'success');
    navigate(`/order/success?orderId=${orderId}`, { replace: true });
  };

  const deliveryTime = estimateDeliveryTime();

  if (items.length === 0 && !processing) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-100 pt-8 pb-12">
      <div className="container-custom max-w-5xl mx-auto">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-gray-200 text-dark-500 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <span className="text-sm font-medium hidden sm:inline">购物车</span>
            </button>

            <div className="w-8 md:w-16 h-0.5 bg-gray-200" />

            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shadow-button">
                2
              </span>
              <span className="text-sm font-bold text-primary-600 hidden sm:inline">
                确认订单
              </span>
            </div>

            <div className="w-8 md:w-16 h-0.5 bg-gray-200" />

            <div className="flex items-center gap-2 text-dark-400">
              <span className="w-8 h-8 rounded-full bg-gray-200 text-dark-500 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <span className="text-sm font-medium hidden sm:inline">支付</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Order Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="bg-white rounded-2xl shadow-card overflow-hidden"
            >
              <button
                onClick={() => setOrderExpanded(!orderExpanded)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
              >
                <h2 className="font-bold text-lg text-dark-800 font-display flex items-center gap-2">
                  订单商品
                  <span className="text-sm font-normal text-dark-400">
                    ({itemCount} 件)
                  </span>
                </h2>
                {orderExpanded ? (
                  <ChevronUp className="w-5 h-5 text-dark-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-dark-400" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {orderExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3 divide-y divide-gray-100">
                      {items.map((item) => {
                        const specsText = Object.entries(item.selectedSpecs)
                          .filter(([, v]) => v && v !== '无')
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' | ');

                        return (
                          <div key={item.id} className="flex gap-3 pt-3 first:pt-0">
                            <img
                              src={item.dish.image}
                              alt={item.dish.name}
                              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-dark-800 text-sm truncate">
                                {item.dish.name}
                              </h4>
                              {specsText && (
                                <p className="text-xs text-dark-400 mt-0.5 line-clamp-1">
                                  {specsText}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-1.5">
                                <span className="text-xs text-dark-500">
                                  x{item.quantity}
                                </span>
                                <span className="text-sm font-semibold text-dark-700">
                                  {formatPrice(item.totalPrice)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-card p-5 md:p-6"
            >
              <h2 className="font-bold text-lg text-dark-800 font-display flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-primary-500" />
                配送信息
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    收货人姓名
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="请输入姓名"
                      className={`input-field pl-11 ${
                        errors.name && touched.name
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                          : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && touched.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1.5 text-xs text-red-500"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    联系电话
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="请输入手机号"
                      maxLength={11}
                      className={`input-field pl-11 ${
                        errors.phone && touched.phone
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                          : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.phone && touched.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1.5 text-xs text-red-500"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    收货地址
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    placeholder="请输入详细地址（省、市、区、街道、门牌号等）"
                    rows={3}
                    className={`input-field resize-none ${
                      errors.address && touched.address
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                        : ''
                    }`}
                  />
                  <AnimatePresence>
                    {errors.address && touched.address && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-1.5 text-xs text-red-500"
                      >
                        {errors.address}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1 text-dark-400" />
                    备注说明
                    <span className="text-dark-400 font-normal ml-1">(选填)</span>
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleChange('note', e.target.value)}
                    placeholder="如：不要辣、多放醋、送货前打电话等"
                    rows={2}
                    className="input-field resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-card p-5 md:p-6"
            >
              <h2 className="font-bold text-lg text-dark-800 font-display flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-primary-500" />
                支付方式
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-primary-400 bg-primary-50/50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          isSelected ? 'text-primary-500' : 'text-dark-400'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? 'text-primary-700' : 'text-dark-600'
                        }`}
                      >
                        {method.label}
                      </span>
                      {isSelected && (
                        <CircleDot className="w-5 h-5 text-primary-500 absolute right-3 top-1/2 -translate-y-1/2" />
                      )}
                      {method.recommended && (
                        <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          推荐
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 py-4 lg:hidden"
            >
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <Lock className="w-4 h-4 text-accent-500" />
                安全支付保障
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <ShieldCheck className="w-4 h-4 text-accent-500" />
                支持随时退款
              </div>
              <div className="flex items-center gap-2 text-sm text-dark-500">
                <Truck className="w-4 h-4 text-accent-500" />
                准时达承诺
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:w-[380px] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="lg:sticky lg:top-8 space-y-4"
            >
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-card p-5 md:p-6 space-y-4">
                <h3 className="font-bold text-lg text-dark-800 font-display">
                  订单详情
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
                    <span className="font-medium text-dark-700">
                      {deliveryFee === 0 ? '免运费' : formatPrice(deliveryFee)}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-dark-800 font-semibold">
                        实付金额
                      </span>
                      <span className="text-2xl font-bold text-primary-600 font-display">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-accent-50 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent-600 flex-shrink-0" />
                  <span className="text-sm text-accent-700 font-medium">
                    预计 {deliveryTime} 分钟送达
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={processing}
                  className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    <>提交订单 {formatPrice(total)}</>
                  )}
                </button>
              </div>

              {/* Desktop Trust Indicators */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-card p-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-dark-600">
                  <Lock className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  <span>安全支付保障</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-dark-600">
                  <ShieldCheck className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  <span>支持随时退款</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-dark-600">
                  <Truck className="w-5 h-5 text-accent-500 flex-shrink-0" />
                  <span>准时达承诺</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
