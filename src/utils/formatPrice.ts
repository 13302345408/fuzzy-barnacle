export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatDiscount = (original: number, current: number): number => {
  return Math.round(((original - current) / original) * 100);
};

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FOOD${timestamp}${random}`;
};

export const estimateDeliveryTime = (): string => {
  const min = 25;
  const max = 45;
  const time = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${time}-${time + 10}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.8) return 'text-accent-500';
  if (rating >= 4.5) return 'text-primary-500';
  if (rating >= 4.0) return 'text-yellow-500';
  return 'text-gray-400';
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
