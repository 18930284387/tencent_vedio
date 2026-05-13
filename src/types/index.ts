export interface Video {
  id: number;
  title: string;
  cover: string;
  category: string;
  rating?: number;
  episode?: string;
  isVip?: boolean;
  description?: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export const tabs = ['首页', '电视剧', '电影', '综艺', '动漫', '纪录片'] as const;
export const categories = ['全部', '热门', '最新', '好评', '免费', 'VIP'] as const;

export type Tab = typeof tabs[number];
export type Category = typeof categories[number];
