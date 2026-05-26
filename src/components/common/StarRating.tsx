import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type StarSize = 'sm' | 'md' | 'lg'

interface StarRatingProps {
  rating: number
  size?: StarSize
  showValue?: boolean
  className?: string
}

const sizeConfig: Record<StarSize, { star: string; text: string }> = {
  sm: { star: 'h-3.5 w-3.5', text: 'text-xs' },
  md: { star: 'h-5 w-5', text: 'text-sm' },
  lg: { star: 'h-6 w-6', text: 'text-base' },
}

function getRatingColor(rating: number): string {
  if (rating >= 4.5) return 'text-accent-500'
  if (rating >= 3.5) return 'text-primary-500'
  if (rating >= 2.5) return 'text-amber-500'
  return 'text-gray-400'
}

function StarIcon({
  fillLevel,
  size,
  color,
}: {
  fillLevel: 'full' | 'half' | 'empty'
  size: StarSize
  color: string
}) {
  const starSize = sizeConfig[size].star

  if (fillLevel === 'full') {
    return <Star className={cn(starSize, color, 'fill-current')} />
  }

  if (fillLevel === 'half') {
    return (
      <div className={cn('relative', starSize)}>
        <Star className={cn(starSize, 'text-gray-200', 'absolute inset-0')} />
        <svg
          className={cn(starSize, 'relative')}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="halfClip">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          <path
            clipPath="url(#halfClip)"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            className={color.replace('text-', 'fill-')}
            fill="currentColor"
          />
        </svg>
      </div>
    )
  }

  return <Star className={cn(starSize, 'text-gray-200')} />
}

export default function StarRating({
  rating,
  size = 'md',
  showValue = false,
  className,
}: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(5, rating))
  const color = getRatingColor(clampedRating)
  const fullStars = Math.floor(clampedRating)
  const hasHalfStar = clampedRating - fullStars >= 0.25 && clampedRating - fullStars <= 0.75
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} fillLevel="full" size={size} color={color} />
        ))}
        {hasHalfStar && (
          <StarIcon key="half" fillLevel="half" size={size} color={color} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon key={`empty-${i}`} fillLevel="empty" size={size} color={color} />
        ))}
      </div>
      {showValue && (
        <span className={cn('font-semibold text-dark-700 ml-1', sizeConfig[size].text)}>
          {clampedRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
