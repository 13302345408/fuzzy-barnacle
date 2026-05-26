export interface SpecOption {
  name: string;
  price: number;
}

export interface Specification {
  name: string;
  options: SpecOption[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  salesCount: number;
  tags: string[];
  isRecommended: boolean;
  isNew: boolean;
  specifications?: Specification[];
}

export const dishes: Dish[] = [
  // 中式美食
  {
    id: '1',
    name: '宫保鸡丁',
    description: '经典川菜，鸡肉鲜嫩，花生酥脆，麻辣适中，配以干辣椒和花椒，口感丰富层次分明',
    price: 38,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1603073163308-9c339c7bc86e?w=800&auto=format&fit=crop',
    category: 'chinese',
    rating: 4.8,
    salesCount: 2580,
    tags: ['招牌', '微辣'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '规格',
        options: [
          { name: '小份', price: 0 },
          { name: '中份', price: 8 },
          { name: '大份', price: 15 },
        ],
      },
      {
        name: '辣度',
        options: [
          { name: '不辣', price: 0 },
          { name: '微辣', price: 0 },
          { name: '中辣', price: 0 },
          { name: '特辣', price: 2 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '麻婆豆腐',
    description: '正宗四川麻婆豆腐，豆腐嫩滑入味，肉末香浓，麻辣鲜香，下饭神器',
    price: 28,
    image: 'https://images.unsplash.com/photo-1582576163682-e9da3a12d7a7?w=800&auto=format&fit=crop',
    category: 'chinese',
    rating: 4.7,
    salesCount: 3200,
    tags: ['人气', '麻辣'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '规格',
        options: [
          { name: '小份', price: 0 },
          { name: '大份', price: 10 },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '红烧肉',
    description: '精选五花肉，慢火炖煮两小时，肥而不腻，入口即化，酱香浓郁',
    price: 48,
    originalPrice: 58,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
    category: 'chinese',
    rating: 4.9,
    salesCount: 1890,
    tags: ['招牌', '推荐'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '规格',
        options: [
          { name: '小份（250g）', price: 0 },
          { name: '中份（400g）', price: 18 },
          { name: '大份（550g）', price: 32 },
        ],
      },
    ],
  },
  {
    id: '4',
    name: '糖醋排骨',
    description: '外酥里嫩，酸甜可口，色泽红亮，老少皆宜的经典家常菜',
    price: 52,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop',
    category: 'chinese',
    rating: 4.6,
    salesCount: 1650,
    tags: ['酸甜', '儿童喜爱'],
    isRecommended: false,
    isNew: false,
  },
  {
    id: '5',
    name: '鱼香肉丝',
    description: '鱼香调味，肉丝滑嫩，木耳脆爽，笋丝清香，酸甜咸辣兼备',
    price: 35,
    image: 'https://images.unsplash.com/photo-1569050467447-ce54d3e0d2a3?w=800&auto=format&fit=crop',
    category: 'chinese',
    rating: 4.5,
    salesCount: 1420,
    tags: ['经典', '下饭'],
    isRecommended: false,
    isNew: true,
  },

  // 西式料理
  {
    id: '6',
    name: '意式肉酱面',
    description: '手工意面搭配慢炖牛肉番茄酱，帕玛森芝士碎点缀，浓郁地道意式风味',
    price: 42,
    originalPrice: 50,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop',
    category: 'western',
    rating: 4.8,
    salesCount: 2100,
    tags: ['招牌', '主厨推荐'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '面条类型',
        options: [
          { name: '意大利细面', price: 0 },
          { name: '宽扁面', price: 0 },
          { name: '通心粉', price: 0 },
        ],
      },
    ],
  },
  {
    id: '7',
    name: '黑椒牛排',
    description: '澳洲进口牛肉，厚切煎制，黑胡椒汁香浓，搭配时蔬和薯条',
    price: 88,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop',
    category: 'western',
    rating: 4.9,
    salesCount: 1680,
    tags: ['高端', '精选'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '熟度',
        options: [
          { name: '三分熟', price: 0 },
          { name: '五分熟', price: 0 },
          { name: '七分熟', price: 0 },
          { name: '全熟', price: 0 },
        ],
      },
      {
        name: '分量',
        options: [
          { name: '200g', price: 0 },
          { name: '300g', price: 25 },
          { name: '400g', price: 48 },
        ],
      },
    ],
  },
  {
    id: '8',
    name: '凯撒沙拉',
    description: '新鲜罗马生菜、面包丁、培根碎、帕玛森芝士，特制凯撒酱汁',
    price: 32,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    category: 'western',
    rating: 4.6,
    salesCount: 2340,
    tags: ['轻食', '健康'],
    isRecommended: false,
    isNew: false,
    specifications: [
      {
        name: '添加蛋白质',
        options: [
          { name: '无', price: 0 },
          { name: '鸡胸肉', price: 12 },
          { name: '虾仁', price: 18 },
          { name: '三文鱼', price: 25 },
        ],
      },
    ],
  },
  {
    id: '9',
    name: '奶油蘑菇汤',
    description: '新鲜蘑菇与淡奶油完美融合，香浓顺滑，撒上欧芹碎和黑胡椒',
    price: 26,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop',
    category: 'western',
    rating: 4.5,
    salesCount: 1890,
    tags: ['汤品', '温暖'],
    isRecommended: false,
    isNew: false,
  },

  // 甜点饮品
  {
    id: '10',
    name: '提拉米苏',
    description: '经典意式甜品，马斯卡彭芝士与浓缩咖啡的完美结合，可可粉撒面',
    price: 36,
    originalPrice: 42,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop',
    category: 'dessert',
    rating: 4.9,
    salesCount: 2760,
    tags: ['招牌', '必点'],
    isRecommended: true,
    isNew: false,
  },
  {
    id: '11',
    name: '芒果班戟',
    description: '新鲜芒果包裹在薄如蝉翼的饼皮中，搭配轻盈奶油，热带风情',
    price: 32,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop',
    category: 'dessert',
    rating: 4.7,
    salesCount: 1980,
    tags: ['人气', '清爽'],
    isRecommended: true,
    isNew: false,
  },
  {
    id: '12',
    name: '抹茶千层蛋糕',
    description: '二十层超薄饼皮层层叠叠，宇治抹茶奶油清新不腻，精致诱人',
    price: 38,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&auto=format&fit=crop',
    category: 'dessert',
    rating: 4.8,
    salesCount: 2150,
    tags: ['新品', '抹茶控'],
    isRecommended: true,
    isNew: true,
  },
  {
    id: '13',
    name: '珍珠奶茶',
    description: '锡兰红茶配鲜奶，Q弹黑糖珍珠，甜度可调，暖心暖胃',
    price: 22,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&auto=format&fit=crop',
    category: 'dessert',
    rating: 4.6,
    salesCount: 3520,
    tags: ['畅销', '奶茶'],
    isRecommended: false,
    isNew: false,
    specifications: [
      {
        name: '甜度',
        options: [
          { name: '无糖', price: 0 },
          { name: '三分糖', price: 0 },
          { name: '五分糖', price: 0 },
          { name: '七分糖', price: 0 },
          { name: '全糖', price: 0 },
        ],
      },
      {
        name: '温度',
        options: [
          { name: '去冰', price: 0 },
          { name: '少冰', price: 0 },
          { name: '正常冰', price: 0 },
          { name: '热饮', price: 0 },
        ],
      },
    ],
  },
  {
    id: '14',
    name: '草莓奶昔',
    description: '新鲜草莓与香草冰淇淋打成绵密奶昔，顶部鲜奶油和整颗草莓装饰',
    price: 28,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop',
    category: 'dessert',
    rating: 4.7,
    salesCount: 1780,
    tags: ['季节限定', '水果'],
    isRecommended: false,
    isNew: true,
  },

  // 日韩料理
  {
    id: '15',
    name: '日式鳗鱼饭',
    description: '蒲烧鳗鱼软嫩多汁，秘制酱汁反复刷烤，搭配日式米饭和味噌汤',
    price: 68,
    originalPrice: 78,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&auto=format&fit=crop',
    category: 'japanese',
    rating: 4.9,
    salesCount: 1450,
    tags: ['招牌', '高端'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '套餐',
        options: [
          { name: '单点', price: 0 },
          { name: '套餐（+味噌汤+小菜）', price: 15 },
          { name: '豪华套餐（+刺身拼盘）', price: 48 },
        ],
      },
    ],
  },
  {
    id: '16',
    name: '韩式石锅拌饭',
    description: '五彩蔬菜配半熟鸡蛋，韩国辣椒酱拌匀，锅巴焦香，营养均衡',
    price: 38,
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&auto=format&fit=crop',
    category: 'japanese',
    rating: 4.7,
    salesCount: 2320,
    tags: ['人气', '韩式'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '添加肉类',
        options: [
          { name: '素食', price: 0 },
          { name: '牛肉', price: 10 },
          { name: '猪肉', price: 8 },
          { name: '鸡腿肉', price: 12 },
        ],
      },
    ],
  },
  {
    id: '17',
    name: '寿司拼盘',
    description: '三文鱼、金枪鱼、虾、鳗鱼等精选食材，师傅手握，新鲜直达',
    price: 88,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    category: 'japanese',
    rating: 4.8,
    salesCount: 1280,
    tags: ['新鲜', '日料'],
    isRecommended: false,
    isNew: false,
  },
  {
    id: '18',
    name: '韩式炸鸡',
    description: '外皮酥脆，肉质多汁，甜辣酱/蒜香酱油两种口味可选',
    price: 45,
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=800&auto=format&fit=crop',
    category: 'japanese',
    rating: 4.6,
    salesCount: 2680,
    tags: ['炸物', '追剧必备'],
    isRecommended: false,
    isNew: false,
    specifications: [
      {
        name: '口味',
        options: [
          { name: '甜辣味', price: 0 },
          { name: '蒜香酱油', price: 0 },
          { name: '蜂蜜黄油', price: 0 },
          { name: '超级辣', price: 0 },
        ],
      },
    ],
  },

  // 小吃快餐
  {
    id: '19',
    name: '香酥鸡腿堡',
    description: '现炸酥脆鸡腿肉，新鲜生菜番茄，秘制酱料，松软汉堡胚',
    price: 26,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    category: 'snacks',
    rating: 4.5,
    salesCount: 4200,
    tags: ['快餐', '超值'],
    isRecommended: false,
    isNew: false,
    specifications: [
      {
        name: '套餐',
        options: [
          { name: '单点', price: 0 },
          { name: '套餐（+薯条+可乐）', price: 12 },
          { name: '全家桶套餐', price: 48 },
        ],
      },
    ],
  },
  {
    id: '20',
    name: '墨西哥牛肉卷',
    description: '墨西哥薄饼卷入香煎牛肉、玉米片、莎莎酱、酸奶油和奶酪丝',
    price: 35,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop',
    category: 'snacks',
    rating: 4.6,
    salesCount: 1860,
    tags: ['异国风味', '饱腹'],
    isRecommended: false,
    isNew: true,
  },
  {
    id: '21',
    name: '炸薯条（大份）',
    description: '金黄酥脆粗薯条，海盐调味，搭配番茄酱或芥末酱',
    price: 18,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop',
    category: 'snacks',
    rating: 4.4,
    salesCount: 3100,
    tags: ['小吃', '分享装'],
    isRecommended: false,
    isNew: false,
  },
  {
    id: '22',
    name: '披萨（9寸）',
    description: '马苏里拉奶酪拉丝，可选多种配料，薄底烘烤，边缘酥脆',
    price: 58,
    originalPrice: 68,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
    category: 'snacks',
    rating: 4.7,
    salesCount: 1950,
    tags: ['分享', '芝士控'],
    isRecommended: true,
    isNew: false,
    specifications: [
      {
        name: '口味',
        options: [
          { name: '玛格丽特', price: 0 },
          { name: '意大利腊肠', price: 8 },
          { name: '海鲜至尊', price: 15 },
          { name: '四季水果', price: 12 },
        ],
      },
    ],
  },

  // 健康轻食
  {
    id: '23',
    name: '牛油果鸡肉沙拉',
    description: '成熟牛油果、低温慢煮鸡胸肉、混合生菜、小番茄、坚果粒，油醋汁',
    price: 45,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.8,
    salesCount: 1680,
    tags: ['健身餐', '低卡'],
    isRecommended: true,
    isNew: false,
  },
  {
    id: '24',
    name: '三文鱼波奇饭',
    description: '烤三文鱼块盖饭，毛豆、玉米、海苔丝、牛油果，日式照烧酱',
    price: 52,
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.7,
    salesCount: 1340,
    tags: ['高蛋白', 'Omega-3'],
    isRecommended: false,
    isNew: true,
  },
  {
    id: '25',
    name: '藜麦蔬菜碗',
    description: '三色藜麦打底，烤南瓜、鹰嘴豆、羽衣甘蓝、甜菜根，柠檬 tahini 酱',
    price: 38,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    category: 'healthy',
    rating: 4.6,
    salesCount: 1120,
    tags: ['素食', '超级食物'],
    isRecommended: false,
    isNew: false,
    specifications: [
      {
        name: '蛋白质',
        options: [
          { name: '纯素', price: 0 },
          { name: '+鹰嘴豆', price: 5 },
          { name: '+水煮蛋', price: 6 },
          { name: '+鸡胸肉', price: 12 },
        ],
      },
    ],
  },
];

export const getDishesByCategory = (categoryId: string): Dish[] => {
  return dishes.filter((dish) => dish.category === categoryId);
};

export const getDishById = (id: string): Dish | undefined => {
  return dishes.find((dish) => dish.id === id);
};

export const getRecommendedDishes = (): Dish[] => {
  return dishes.filter((dish) => dish.isRecommended).slice(0, 8);
};

export const searchDishes = (query: string): Dish[] => {
  const lowerQuery = query.toLowerCase();
  return dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(lowerQuery) ||
      dish.description.toLowerCase().includes(lowerQuery) ||
      dish.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
