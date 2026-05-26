import { cn } from '@/lib/utils'

type SkeletonVariant = 'text' | 'card' | 'circular'

interface SkeletonProps {
  variant?: SkeletonVariant
  className?: string
  width?: string | number
  height?: string | number
}

function SkeletonBase({ className, width, height }: Omit<SkeletonProps, 'variant'>) {
  return (
    <div
      className={cn(
        'animate-pulse-soft rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer',
        className
      )}
      style={{ width, height }}
    />
  )
}

export default function Skeleton({
  variant = 'text',
  className,
  width,
  height,
}: SkeletonProps) {
  if (variant === 'circular') {
    return (
      <SkeletonBase
        className={cn('rounded-full', className)}
        width={width ?? height ?? 48}
        height={height ?? width ?? 48}
      />
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={cn('overflow-hidden rounded-2xl bg-white shadow-card p-4', className)}
        style={{ width: width ?? '100%' }}
      >
        <SkeletonBase
          className="mb-3"
          width="100%"
          height={height ?? 140}
        />
        <SkeletonBase className="mb-2" width="60%" height={16} />
        <SkeletonBase className="mb-3" width="80%" height={12} />
        <div className="flex items-center justify-between">
          <SkeletonBase width={60} height={20} />
          <SkeletonBase width={32} height={32} className="!rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <SkeletonBase
      className={cn('h-4', className)}
      width={width}
      height={height}
    />
  )
}

Skeleton.Text = function SkeletonText(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="text" {...props} />
}

Skeleton.Card = function SkeletonCard(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="card" {...props} />
}

Skeleton.Circular = function SkeletonCircular(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="circular" {...props} />
}
