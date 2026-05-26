export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: 'chinese',
    name: '中式美食',
    icon: '🥢',
    color: '#FF6B35',
    count: 12,
  },
  {
    id: 'western',
    name: '西式料理',
    icon: '🍝',
    color: '#E17055',
    count: 8,
  },
  {
    id: 'dessert',
    name: '甜点饮品',
    icon: '🍰',
    color: '#FDCB6E',
    count: 10,
  },
  {
    id: 'japanese',
    name: '日韩料理',
    icon: '🍱',
    color: '#00B894',
    count: 7,
  },
  {
    id: 'snacks',
    name: '小吃快餐',
    icon: '🍟',
    color: '#FAB1A0',
    count: 9,
  },
  {
    id: 'healthy',
    name: '健康轻食',
    icon: '🥗',
    color: '#55EFC4',
    count: 6,
  },
];
