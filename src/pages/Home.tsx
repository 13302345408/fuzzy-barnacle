import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShoppingCart, ChevronRight, Zap, UtensilsCrossed, DollarSign, ShieldCheck, ArrowDown } from 'lucide-react'
import StarRating from '@/components/common/StarRating'
import { categories } from '@/data/categories'
import { recommendedDishes } from '@/data/recommendations'
import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import { formatPrice, formatDiscount } from '@/utils/formatPrice'

const foodEmojis = ['🍜', '🍕', '🍣', '🥗', '🍰', '🍔', '🌮', '🍱', '🥘', '🧁', '🍝', '🍛']

const stats = [
  { value: '1000+', label: '道菜品' },
  { value: '50+', label: '合作餐厅' },
  { value: '98%', label: '好评率' },
]

const features = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: '极速配送',
    description: '平均30分钟送达，新鲜热乎送到家',
    color: '#FF6B35',
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    title: '精选品质',
    description: '严格筛选每一家餐厅，品质有保障',
    color: '#E17055',
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: '超值优惠',
    description: '新用户立减20元，天天有惊喜',
    color: '#FDCB6E',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: '品质保障',
    description: '不满意随时退款，放心享用每一餐',
    color: '#00B894',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

function FloatingEmoji({ emoji, delay, x, y }: { emoji: string; delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute text-4xl md:text-5xl pointer-events-none select-none opacity-20 md:opacity-15"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -25, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] via-[#FF8C5A] to-[#FFA07A]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

      <div className="absolute inset-0 overflow-hidden">
        {foodEmojis.map((emoji, i) => (
          <FloatingEmoji
            key={i}
            emoji={emoji}
            delay={i * 0.4}
            x={10 + (i * 8) % 80}
            y={10 + (i * 13) % 70}
          />
        ))}
      </div>

      <div className="relative z-10 container-custom text-center py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            美味直达
            <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-yellow-100 to-orange-200 bg-clip-text text-transparent">
              鲜食到家
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            精选美食，30分钟极速送达，让每一餐都值得期待
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 bg-white text-[#FF6B35] font-bold px-10 py-4 rounded-full text-lg shadow-2xl shadow-black/20 hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              立即点餐
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center justify-center gap-8 md:gap-14 mt-14 flex-wrap"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm md:text-base text-white/75 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-6 h-6 text-white/60" />
      </motion.div>
    </section>
  )
}

function CategoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-[#FFF9F5]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">探索美食分类</h2>
          <p className="text-gray-500 text-lg">发现你钟爱的味道</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={`/menu/${category.id}`}
                className="group block bg-white rounded-2xl p-5 md:p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.count} 道菜品</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function DishCard({ dish }: { dish: typeof recommendedDishes[0] }) {
  const addItem = useCartStore((state) => state.addItem)
  const addToast = useToastStore((state) => state.addToast)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(dish)
    addToast(`已将「${dish.name}」加入购物车`, 'success')
  }

  return (
    <motion.div variants={itemVariants} className="flex-shrink-0 w-[280px] md:w-auto">
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FF6B35] text-white shadow-sm">
              {dish.recommendationReason}
            </span>
            {dish.isNew && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
                新品
              </span>
            )}
          </div>
          {dish.originalPrice && (
            <div className="absolute top-3 right-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
              -{formatDiscount(dish.originalPrice, dish.price)}%
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-800 text-base mb-1.5 line-clamp-1">{dish.name}</h3>
          <div className="flex items-center gap-2 mb-2.5">
            <StarRating rating={dish.rating} size="sm" showValue />
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {dish.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-[#FF6B35]">{formatPrice(dish.price)}</span>
              {dish.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(dish.originalPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-[#FF6B35] hover:bg-[#e55a28] text-white font-semibold px-3.5 py-2 rounded-xl text-sm transition-colors duration-200 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RecommendedSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">🔥 今日推荐</h2>
            <p className="text-gray-500 text-lg mt-2">精心挑选，不容错过</p>
          </div>
          <Link
            to="/menu"
            className="hidden md:inline-flex items-center gap-1.5 text-[#FF6B35] font-semibold hover:gap-3 transition-all duration-300"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="md:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {recommendedDishes.map((dish) => (
              <div key={dish.id} className="snap-start">
                <DishCard dish={dish} />
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {recommendedDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </motion.div>

        <div className="md:hidden text-center mt-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-[#FF6B35] font-semibold"
          >
            查看全部 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-[#FFF9F5]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">为什么选择我们</h2>
          <p className="text-gray-500 text-lg">用心服务每一位美食爱好者</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTABannerSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6B35] via-[#FF8C5A] to-[#FFA07A] p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full bg-white/5"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/85 text-base md:text-lg mb-3 font-medium"
            >
              新用户专享
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-3xl md:text-5xl font-extrabold text-white mb-8"
            >
              首单立减{' '}
              <span className="text-yellow-200">¥20</span>
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#FF6B35] font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              立即领取优惠
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <RecommendedSection />
      <FeaturesSection />
      <CTABannerSection />
    </main>
  )
}
