import { dishes } from './dishes';

export const recommendedDishes = dishes
  .filter((dish) => dish.isRecommended)
  .slice(0, 8)
  .map((dish) => ({
    ...dish,
    recommendationReason:
      dish.rating >= 4.8 ? '超高评分' : dish.salesCount > 2000 ? '销量爆款' : '主厨推荐',
  }));
