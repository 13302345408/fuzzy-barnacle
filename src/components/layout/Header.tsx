import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/menu', label: '菜单' },
  { path: '/cart', label: '购物车' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const itemCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-effect shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-18">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl transition-transform group-hover:scale-110 duration-300">
                🍽️
              </span>
              <span className="font-display text-xl font-bold text-dark-800">
                美味达
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-dark-600 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="relative p-2 rounded-full text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                aria-label="购物车"
              >
                <ShoppingCart strokeWidth={2} className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-primary-500 text-white text-[10px] font-bold rounded-full"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-dark-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                aria-label="打开菜单"
              >
                <Menu strokeWidth={2} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-modal md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 h-18 border-b border-gray-100">
                  <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl">🍽️</span>
                    <span className="font-display text-lg font-bold text-dark-800">
                      美味达
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-dark-500 hover:text-dark-700 hover:bg-gray-100 transition-colors duration-200"
                    aria-label="关闭菜单"
                  >
                    <X strokeWidth={2} className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col px-4 py-6 gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                          location.pathname === link.path
                            ? 'text-primary-600 bg-primary-50 font-semibold'
                            : 'text-dark-600 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                        {link.path === '/cart' && itemCount > 0 && (
                          <span className="ml-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary-500 text-white text-xs font-bold rounded-full">
                            {itemCount > 99 ? '99+' : itemCount}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto px-6 py-6 border-t border-gray-100">
                  <p className="text-sm text-gray-400 text-center">
                    感谢选择美味达 🍽️
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
