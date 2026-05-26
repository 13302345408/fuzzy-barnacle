import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
} from 'lucide-react';

const quickLinks = [
  { path: '/', label: '首页' },
  { path: '/menu', label: '菜单' },
  { path: '/cart', label: '购物车' },
];

const supportLinks = [
  { path: '#', label: '配送说明' },
  { path: '#', label: '退换政策' },
  { path: '#', label: '常见问题' },
  { path: '#', label: '联系我们' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-dark-800 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-5">
              <span className="text-2xl">🍽️</span>
              <span className="font-display text-xl font-bold text-white">
                美味达
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              美味达致力于为您带来最优质的美食体验。精选食材，匠心烹饪，让每一餐都成为美好的回忆。
            </p>
            <div className="flex gap-3">
              {['微信', '微博', '小红书'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300 text-xs font-medium"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-5">快速链接</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-5">帮助支持</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-5">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin strokeWidth={1.5} className="w-4 h-4 mt-0.5 shrink-0 text-primary-400" />
                <span>北京市朝阳区美食街 88 号</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone strokeWidth={1.5} className="w-4 h-4 shrink-0 text-primary-400" />
                <span>400-888-9999</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail strokeWidth={1.5} className="w-4 h-4 shrink-0 text-primary-400" />
                <span>hello@meiweida.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock strokeWidth={1.5} className="w-4 h-4 shrink-0 text-primary-400" />
                <span>每日 09:00 - 22:00</span>
              </li>
            </ul>

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6"
            >
              <label htmlFor="newsletter-email" className="block text-sm text-gray-400 mb-2">
                订阅优惠信息
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入您的邮箱"
                  className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  aria-label="订阅"
                  className="px-3 py-2.5 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200"
                >
                  <Send strokeWidth={2} className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 美味达. 保留所有权利.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200">
              隐私政策
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
