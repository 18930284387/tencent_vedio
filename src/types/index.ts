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

export interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}
