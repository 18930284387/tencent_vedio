import type { Banner, ContentSection, Video } from '../types/video'

export const tabs = ['首页', '电影', '电视剧', '动漫', '综艺']

export const categories = ['全部', '电影', '电视剧', '动漫', '综艺']

export const banners: Banner[] = [
  {
    id: 1,
    title: '流浪地球2',
    subtitle: '科幻巨制震撼来袭，探索宇宙深处的人类文明',
    image:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=400&fit=crop',
  },
  {
    id: 2,
    title: '狂飙',
    subtitle: '扫黑除恶题材力作，正邪较量扣人心弦',
    image:
      'https://images.unsplash.com/photo-1489599904472-af26e84af57b?w=1200&h=400&fit=crop',
  },
  {
    id: 3,
    title: '鬼灭之刃',
    subtitle: '热血动漫经典，刀剑与意志的终极对决',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop',
  },
]

export const videos: Video[] = [
  {
    id: 1,
    title: '流浪地球2',
    cover:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop',
    category: '电影',
    rating: 8.3,
    isVip: true,
    description: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。',
  },
  {
    id: 2,
    title: '狂飙',
    cover:
      'https://images.unsplash.com/photo-1489599904472-af26e84af57b?w=300&h=400&fit=crop',
    category: '电视剧',
    episode: '39集全',
    rating: 8.5,
    description: '京海市一线刑警安欣与黑恶势力展开长达二十年的正邪较量。',
  },
  {
    id: 3,
    title: '鬼灭之刃',
    cover:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
    category: '动漫',
    episode: '26集全',
    rating: 9.1,
    description: '少年炭治郎为了拯救变成鬼的妹妹，踏上了斩鬼之路。',
  },
  {
    id: 4,
    title: '奔跑吧兄弟',
    cover:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=400&fit=crop',
    category: '综艺',
    episode: '更新至12期',
    rating: 7.2,
    description: '明星户外竞技真人秀，欢乐与挑战并存。',
  },
  {
    id: 5,
    title: '满江红',
    cover:
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=300&h=400&fit=crop',
    category: '电影',
    rating: 7.8,
    description: '南宋绍兴年间，一场围绕岳飞遗言的悬疑故事展开。',
  },
  {
    id: 6,
    title: '三体',
    cover:
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=400&fit=crop',
    category: '电视剧',
    episode: '30集全',
    rating: 8.7,
    isVip: true,
    description: '科幻小说改编，揭开三体文明与地球文明碰撞的序幕。',
  },
  {
    id: 7,
    title: '铃芽之旅',
    cover:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop',
    category: '动漫',
    rating: 8.1,
    isVip: true,
    description: '少女铃芽与青年草太一起踏上关闭灾难之门的旅程。',
  },
  {
    id: 8,
    title: '向往的生活',
    cover:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=400&fit=crop',
    category: '综艺',
    episode: '更新至14期',
    rating: 7.8,
    description: '田园生活慢综艺，展现自然与友情的治愈力量。',
  },
]

export const contentSections: ContentSection[] = [
  {
    title: '热门电影',
    category: '电影',
    accentClassName: 'from-blue-500 to-cyan-400',
  },
  {
    title: '热播剧集',
    category: '电视剧',
    accentClassName: 'from-green-500 to-emerald-400',
  },
  {
    title: '热门动漫',
    category: '动漫',
    accentClassName: 'from-pink-500 to-rose-400',
  },
  {
    title: '精选综艺',
    category: '综艺',
    accentClassName: 'from-purple-500 to-violet-400',
  },
]
