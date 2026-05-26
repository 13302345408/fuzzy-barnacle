import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Copy,
  Check,
  Home,
  ClipboardList,
  UtensilsCrossed,
  AlertTriangle,
  Clock,
  CreditCard,
  Phone,
  ChefHat,
  Truck,
  Package,
  CircleCheck,
  Timer,
  PartyPopper,
} from 'lucide-react';
import { useToastStore } from '@/store/toastStore';
import { estimateDeliveryTime, formatPrice } from '@/utils/formatPrice';

const TIMELINE_STEPS = [
  {
    icon: CircleCheck,
    title: '订单已确认',
    description: '您的订单已成功提交',
    status: 'completed' as const,
  },
  {
    icon: ChefHat,
    title: '商家正在准备',
    description: '厨师正在精心制作您的美食',
    status: 'pending' as const,
  },
  {
    icon: Truck,
    title: '骑手配送中',
    description: '骑手正在快马加鞭赶来',
    status: 'pending' as const,
  },
  {
    icon: Package,
    title: '等待收货',
    description: '请保持电话畅通，准备收货',
    status: 'pending' as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const addToast = useToastStore((s) => s.addToast);

  const orderId = searchParams.get('orderId');
  const totalAmount = searchParams.get('total');
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const deliveryTime = estimateDeliveryTime();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).replace(/\//g, '年').replace(/,/, '').replace(/ /, ' ').replace(/:/g, ':');
      const parts = formatted.split(' ');
      if (parts.length >= 2) {
        const datePart = parts[0].replace(/年/g, (m, i) => i === 4 ? '日' : '年');
        setCurrentTime(datePart + ' ' + parts.slice(1).join(' '));
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyOrderId = async () => {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      addToast('订单编号已复制到剪贴板', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('复制失败，请手动复制', 'error');
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-accent-50 via-white to-cream-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center"
          >
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="text-2xl font-bold text-dark-800 mb-3"
          >
            未找到订单信息
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="text-dark-500 mb-8 leading-relaxed"
          >
            抱歉，无法获取到订单信息。请返回首页重新下单。
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            onClick={() => navigate('/')}
            className="btn-primary px-10 py-3.5"
          >
            <Home className="w-5 h-5" />
            返回首页
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50/60 via-accent-50/30 to-cream-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="confetti-piece absolute w-2 h-2 rounded-full bg-accent-400/20 top-[10%] left-[15%]" style={{ animationDelay: '0s' }} />
        <div className="confetti-piece absolute w-3 h-3 rounded-full bg-primary-300/20 top-[20%] left-[80%]" style={{ animationDelay: '0.5s' }} />
        <div className="confetti-piece absolute w-2 h-2 bg-accent-300/25 top-[40%] left-[10%]" style={{ animationDelay: '1s', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="confetti-piece absolute w-2.5 h-2.5 rounded-full bg-yellow-400/20 top-[60%] left-[85%]" style={{ animationDelay: '1.5s' }} />
        <div className="confetti-piece absolute w-2 h-2 bg-accent-400/20 top-[75%] left-[25%]" style={{ animationDelay: '2s', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="confetti-piece absolute w-3 h-3 rounded-full bg-primary-200/30 top-[15%] left-[60%]" style={{ animationDelay: '0.8s' }} />
        <div className="confetti-piece absolute w-2 h-2 rounded-full bg-accent-500/15 top-[85%] left-[70%]" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="relative z-10 container-custom max-w-lg mx-auto px-4 py-10 md:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                  delay: 0.1,
                }}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/30"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <CheckCircle2 className="w-14 h-14 md:w-16 md:h-16 text-white" strokeWidth={2.5} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 10 }}
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2"
              >
                <PartyPopper className="w-8 h-8 md:w-9 md:h-9 text-yellow-400" />
              </motion.div>

              <div className="absolute inset-0 rounded-full bg-accent-400/20 animate-ping-slow" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div variants={fadeUpVariants} className="text-center space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-dark-800">
              🎉 订单提交成功！
            </h1>
            <p className="text-dark-500 text-base md:text-lg leading-relaxed">
              感谢您的订购，我们正在为您准备美食
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            variants={fadeUpVariants}
            className="bg-white rounded-2xl shadow-card p-5 md:p-6 space-y-5"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <ClipboardList className="w-5 h-5 text-accent-500" />
              <h2 className="font-bold text-lg text-dark-800">订单详情</h2>
            </div>

            {/* Order ID */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-dark-500">订单编号</label>
              <button
                onClick={handleCopyOrderId}
                className="group w-full flex items-center justify-between gap-2 bg-accent-50 hover:bg-accent-100 rounded-xl px-4 py-3 transition-colors cursor-pointer"
              >
                <span className="font-mono text-base md:text-lg font-semibold text-dark-800 tracking-wide break-all">
                  {orderId}
                </span>
                <span className="flex items-center gap-1.5 flex-shrink-0 text-sm font-medium text-accent-600 group-hover:text-accent-700 transition-colors">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Order Time */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-dark-500">
                <Clock className="w-4.5 h-4.5" />
                <span className="text-sm">下单时间</span>
              </div>
              <span className="text-sm font-medium text-dark-700">{currentTime}</span>
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-dark-500">
                <Timer className="w-4.5 h-4.5" />
                <span className="text-sm">预计送达时间</span>
              </div>
              <span className="text-sm font-bold text-accent-600">{deliveryTime} 分钟</span>
            </div>

            {/* Payment Status */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-dark-500">
                <CreditCard className="w-4.5 h-4.5" />
                <span className="text-sm">支付状态</span>
              </div>
              <span className={`badge ${totalAmount ? 'badge-accent' : 'badge-primary'}`}>
                {totalAmount ? '已支付' : '待支付'}
              </span>
            </div>

            {/* Total Amount */}
            {totalAmount && (
              <div className="bg-accent-50 rounded-xl px-4 py-3 flex items-center justify-between mt-2">
                <span className="text-sm font-medium text-accent-700">订单金额</span>
                <span className="text-xl font-bold text-accent-600 font-display">
                  {formatPrice(Number(totalAmount))}
                </span>
              </div>
            )}
          </motion.div>

          {/* Timeline */}
          <motion.div
            variants={fadeUpVariants}
            className="bg-white rounded-2xl shadow-card p-5 md:p-6"
          >
            <h2 className="font-bold text-lg text-dark-800 mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-500" />
              订单进度
            </h2>

            <div className="space-y-0">
              {TIMELINE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isLast = index === TIMELINE_STEPS.length - 1;

                return (
                  <div key={step.title} className="flex gap-3 md:gap-4">
                    {/* Timeline line and icon */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 250, damping: 15 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-gradient-to-br from-accent-400 to-accent-600 shadow-md shadow-accent-500/25'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-dark-400'}`}
                        />
                      </motion.div>
                      {!isLast && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                          className={`w-0.5 flex-1 min-h-[24px] mt-1.5 ${
                            isCompleted ? 'bg-accent-300' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-5 md:pb-6 last:pb-0 min-w-0">
                      <p
                        className={`font-semibold text-sm md:text-base ${
                          isCompleted ? 'text-dark-800' : 'text-dark-400'
                        }`}
                      >
                        {isCompleted && <span className="mr-1">✅</span>}
                        {!isCompleted && <span className="mr-1">⏳</span>}
                        {step.title}
                      </p>
                      <p className="text-xs md:text-sm text-dark-400 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                      {isCompleted && (
                        <motion.span
                          initial={{ width: 0 }}
                          animate={{ width: '48px' }}
                          transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                          className="inline-block h-1 bg-accent-400 rounded-full mt-2"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="space-y-3"
          >
            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full py-4 text-base"
            >
              <Home className="w-5 h-5" />
              返回首页
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                disabled
                className="btn-secondary w-full py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ClipboardList className="w-4.5 h-4.5" />
                查看订单详情
              </button>
              <button
                onClick={() => navigate('/menu')}
                className="bg-accent-50 text-accent-700 font-semibold px-6 py-3.5 rounded-full
                         border-2 border-accent-200 hover:border-accent-400 hover:bg-accent-100
                         transition-all duration-300 ease-out inline-flex items-center justify-center gap-2 text-sm"
              >
                <UtensilsCrossed className="w-4.5 h-4.5" />
                继续点餐
              </button>
            </div>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            variants={fadeUpVariants}
            className="text-center pt-2 pb-4 space-y-1.5"
          >
            <p className="text-xs md:text-sm text-dark-400 flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              如有问题请联系客服：
              <span className="font-semibold text-dark-600">400-123-4567</span>
            </p>
            <p className="text-xs text-dark-400">
              客服时间：08:00-22:00
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .confetti-piece {
          animation: confetti-fall 4s ease-in-out infinite;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(80vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: pingSlow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pingSlow {
          75%, 100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
