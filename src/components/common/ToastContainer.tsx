import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToastStore } from '@/store/toastStore'
import type { Toast } from '@/store/toastStore'

const typeConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-accent-50',
    border: 'border-accent-200',
    text: 'text-accent-700',
    iconColor: 'text-accent-500',
    progressBar: 'bg-accent-500',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    iconColor: 'text-red-500',
    progressBar: 'bg-red-500',
  },
  info: {
    icon: Info,
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    iconColor: 'text-primary-500',
    progressBar: 'bg-primary-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    iconColor: 'text-amber-500',
    progressBar: 'bg-amber-500',
  },
}

function ToastItem({ toast }: { toast: Toast }) {
  const [isVisible, setIsVisible] = useState(true)
  const { removeToast } = useToastStore()
  const config = typeConfig[toast.type]
  const Icon = config.icon
  const duration = toast.duration ?? 3000

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => removeToast(toast.id), 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, toast.id, removeToast])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex w-80 items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm',
        config.bg,
        config.border
      )}
    >
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconColor)} />
      <p className={cn('flex-1 text-sm font-medium', config.text)}>
        {toast.message}
      </p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => removeToast(toast.id), 300)
        }}
        className={cn(
          'shrink-0 rounded-md p-0.5 transition-colors hover:bg-black/5',
          config.text
        )}
        aria-label="关闭通知"
      >
        <X className="h-4 w-4" />
      </button>
      {duration > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={cn(
            'absolute bottom-0 left-0 h-1 origin-left rounded-b-xl',
            config.progressBar
          )}
        />
      )}
    </motion.div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToastStore()

  return (
    <AnimatePresence>
      {toasts.length > 0 && (
        <div className="fixed right-4 top-4 z-[100] flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}
