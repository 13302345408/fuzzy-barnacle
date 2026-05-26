import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../../store/toastStore';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: {
    bg: 'bg-accent-50 border-accent-200 text-accent-700',
    icon: 'text-accent-500',
  },
  error: {
    bg: 'bg-red-50 border-red-200 text-red-700',
    icon: 'text-red-500',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200 text-blue-700',
    icon: 'text-blue-500',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    icon: 'text-yellow-500',
  },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          const colors = colorMap[toast.type];

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-card ${colors.bg}`}
            >
              <Icon strokeWidth={2} className={`w-5 h-5 mt-0.5 shrink-0 ${colors.icon}`} />
              <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-0.5 rounded-md hover:bg-black/5 transition-colors duration-150"
                aria-label="关闭"
              >
                <X strokeWidth={2} className="w-3.5 h-3.5 opacity-50" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
