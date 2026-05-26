import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  X,
  UtensilsCrossed,
  SlidersHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { dishes, getDishesByCategory, searchDishes, type Dish } from '@/data/dishes'
import { categories } from '@/data/categories'
import Modal from '@/components/common/Modal'
import StarRating from '@/components/common/StarRating'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { formatPrice, debounce } from '@/utils/formatPrice'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'sales' | 'rating'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格升序' },
  { value: 'price-desc', label: '价格降序' },
  { value: 'sales', label: '销量最高' },
  { value: 'rating', label: '评分最高' },
]

function DishCard({
  dish,
  onClick,
}: {
  dish: Dish
  onClick: (dish: Dish) => void
}) {
  const addItem = useCartStore((s) => s.addItem)
  const addToast = useToastStore((s) => s.addToast)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(dish)
    addToast(`已将「${dish.name}」加入购物车`, 'success')
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick(dish)}
      className="group cursor-pointer card-base"
    >
      <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {dish.isNew && (
            <span className="badge bg-accent-500 text-white shadow-sm">NEW</span>
          )}
          {dish.salesCount > 2000 && (
            <span className="badge bg-red-500 text-white shadow-sm">HOT</span>
          )}
        </div>
        {dish.originalPrice && (
          <div className="absolute right-2.5 top-2.5 badge bg-dark-800/70 text-white backdrop-blur-sm">
            省{formatPrice(dish.originalPrice - dish.price)}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-dark-700 line-clamp-1">{dish.name}</h3>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {dish.description}
        </p>

        <StarRating rating={dish.rating} size="sm" showValue />

        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(dish.price)}
            </span>
            {dish.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(dish.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={cn(
              'flex items-center gap-1 rounded-full bg-primary-500 px-3 py-2',
              'text-sm font-medium text-white transition-all duration-200',
              'hover:bg-primary-600 hover:shadow-button active:scale-95',
              'min-h-[44px] min-w-[44px]'
            )}
            aria-label={`加入购物车：${dish.name}`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">加入购物车</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function DishDetailModal({
  dish,
  isOpen,
  onClose,
}: {
  dish: Dish | null
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const addToast = useToastStore((s) => s.addToast)

  useEffect(() => {
    if (dish && isOpen) {
      const defaults: Record<string, string> = {}
      dish.specifications?.forEach((spec) => {
        defaults[spec.name] = spec.options[0].name
      })
      setSelectedSpecs(defaults)
      setQuantity(1)
    }
  }, [dish, isOpen])

  const specExtraPrice = useMemo(() => {
    if (!dish?.specifications) return 0
    return dish.specifications.reduce((total, spec) => {
      const opt = spec.options.find((o) => o.name === selectedSpecs[spec.name])
      return total + (opt?.price ?? 0)
    }, 0)
  }, [dish, selectedSpecs])

  const totalPrice = dish ? (dish.price + specExtraPrice) * quantity : 0

  const handleAddToCart = () => {
    if (!dish) return
    for (let i = 0; i < quantity; i++) {
      addItem(dish, selectedSpecs)
    }
    addToast(
      `已将 ${quantity} 份「${dish.name}」${Object.keys(selectedSpecs).length > 0 ? `（${Object.values(selectedSpecs).join(' / ')}）` : ''}加入购物车`,
      'success'
    )
    onClose()
  }

  if (!dish) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-5">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full rounded-xl object-cover aspect-video"
        />

        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-dark-700">{dish.name}</h2>
              <div className="mt-1 flex items-center gap-3">
                <StarRating rating={dish.rating} size="md" showValue />
                <span className="text-sm text-gray-500">
                  已售 {dish.salesCount.toLocaleString()} 份
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(totalPrice)}
              </div>
              {quantity > 1 && (
                <div className="text-xs text-gray-400">
                  {formatPrice(dish.price + specExtraPrice)} × {quantity}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">{dish.description}</p>

        {dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {dish.tags.map((tag) => (
              <span key={tag} className="badge bg-primary-50 text-primary-600">
                {tag}
              </span>
            ))}
          </div>
        )}

        {dish.specifications && dish.specifications.length > 0 && (
          <div className="space-y-4 divide-y divide-gray-100">
            {dish.specifications.map((spec) => (
              <div key={spec.name} className="pt-4 first:pt-0">
                <h4 className="mb-2.5 text-sm font-semibold text-dark-700">
                  {spec.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {spec.options.map((option) => {
                    const isSelected = selectedSpecs[spec.name] === option.name
                    return (
                      <button
                        key={option.name}
                        onClick={() =>
                          setSelectedSpecs((prev) => ({
                            ...prev,
                            [spec.name]: option.name,
                          }))
                        }
                        className={cn(
                          'rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 min-h-[44px]',
                          isSelected
                            ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                            : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50/50'
                        )}
                      >
                        {option.name}
                        {option.price > 0 && (
                          <span className="ml-1 text-primary-600">
                            +{formatPrice(option.price)}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <span className="text-sm font-medium text-gray-600">数量</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors min-h-[44px] min-w-[44px]',
                quantity <= 1
                  ? 'cursor-not-allowed border-gray-200 text-gray-300'
                  : 'border-gray-300 text-gray-600 hover:border-primary-400 hover:text-primary-600'
              )}
              aria-label="减少数量"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-[2rem] text-center text-lg font-semibold text-dark-700">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-full rounded-full border-2 border-primary-200 text-primary-600 transition-colors hover:border-primary-500 hover:bg-primary-50 min-h-[44px] min-w-[44px]"
              aria-label="增加数量"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary w-full py-4 text-base"
        >
          <ShoppingCart className="h-5 w-5" />
          加入购物车 · {formatPrice(totalPrice)}
        </button>
      </div>
    </Modal>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-50">
        <UtensilsCrossed className="h-12 w-12 text-primary-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-dark-700">
        未找到相关菜品
      </h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500">
        换个关键词试试，或者浏览其他分类
      </p>
      <button
        onClick={onClear}
        className="btn-secondary"
      >
        <SlidersHorizontal className="h-4 w-4" />
        清除筛选
      </button>
    </motion.div>
  )
}

export default function Menu() {
  const { category: urlCategory } = useParams<{ category?: string }>()
  const navigate = useNavigate()

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (urlCategory) {
      const match = categories.find((c) => c.id === urlCategory)
      setActiveCategory(match ? urlCategory : 'all')
    }
  }, [urlCategory])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const debouncedSearch = useMemo(
    () =>
      debounce((q: string) => {
        setDebouncedQuery(q)
      }, 300),
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchQuery(val)
    debouncedSearch(val)
  }

  const filteredDishes = useMemo(() => {
    let result: Dish[]

    if (debouncedQuery.trim()) {
      result = searchDishes(debouncedQuery.trim())
    } else if (activeCategory === 'all') {
      result = [...dishes]
    } else {
      result = getDishesByCategory(activeCategory)
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'sales':
        result.sort((a, b) => b.salesCount - a.salesCount)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [activeCategory, debouncedQuery, sortBy])

  const handleCategoryClick = useCallback(
    (catId: string) => {
      setActiveCategory(catId)
      setSearchQuery('')
      setDebouncedQuery('')
      if (catId === 'all') {
        navigate('/menu', { replace: true })
      } else {
        navigate(`/menu/${catId}`, { replace: true })
      }
    },
    [navigate]
  )

  const handleClearFilters = useCallback(() => {
    setActiveCategory('all')
    setSearchQuery('')
    setDebouncedQuery('')
    setSortBy('default')
    navigate('/menu', { replace: true })
  }, [navigate])

  const tabCategories: { id: string; name: string; icon?: string }[] = [
    { id: 'all', name: '全部', icon: undefined },
    ...categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon })),
  ]

  if (isLoading) {
    return (
      <div className="container-custom min-h-screen pb-12 pt-6">
        <div className="mb-6 space-y-4">
          <div className="h-12 animate-pulse rounded-2xl bg-gray-200" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-20 shrink-0 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
          <div className="h-12 w-40 animate-pulse rounded-xl bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-3 rounded-2xl bg-white p-4 shadow-card">
              <div className="aspect-[4/3] rounded-xl bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="flex justify-between">
                <div className="h-6 w-16 rounded bg-gray-200" />
                <div className="h-10 w-24 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom min-h-screen pb-16 pt-6">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索菜品名称、描述或标签..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="input-field pl-12 pr-4"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setDebouncedQuery('')
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="input-field cursor-pointer appearance-none bg-white pr-10 sm:w-auto"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23636E72' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <div className="-mb-4 overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-2">
              {tabCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 min-h-[44px]',
                    activeCategory === cat.id
                      ? 'bg-primary-500 text-white shadow-button'
                      : 'bg-white text-gray-600 shadow-sm hover:bg-primary-50 hover:text-primary-600'
                  )}
                >
                  <span className="mr-1.5 inline-block">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            共{' '}
            <span className="font-semibold text-primary-600">
              {filteredDishes.length}
            </span>{' '}
            道菜品
          </p>
          {(activeCategory !== 'all' || debouncedQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-primary-500 hover:text-primary-700 transition-colors"
            >
              清除筛选
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredDishes.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${debouncedQuery}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <DishCard dish={dish} onClick={setSelectedDish} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState onClear={handleClearFilters} />
        )}
      </AnimatePresence>

      <DishDetailModal
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  )
}
