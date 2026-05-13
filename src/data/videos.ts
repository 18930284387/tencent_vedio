import type { Video, Banner } from '../types/video';

export const banners: Banner[] = [
  { id: 1, title: '流浪地球3', subtitle: '2025年度科幻巨制震撼来袭', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1400&h=500' },
  { id: 2, title: '复仇者联盟：终局之战', subtitle: '漫威英雄终极对决', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1400&h=500' },
  { id: 3, title: '阿凡达：水之道', subtitle: '视觉盛宴再度升级', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1400&h=500' },
];

export const tabs = ['首页', '电视剧', '电影', '综艺', '动漫', '纪录片'];

export const categories = ['全部', '热门', '最新', '好评', '免费', 'VIP'];

export const videos: Video[] = [
  { id: 1, title: '流浪地球3', cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=300&h=420', category: '电影', rating: 9.5, episode: '高清', isVip: true, description: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。面对前所未有的危机，主人公刘培强将再次踏上拯救地球的征程。' },
  { id: 2, title: '星际穿越', cover: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=300&h=420', category: '电影', rating: 9.4, episode: '高清', isVip: false, description: '一队探险家利用他们针对虫洞的新发现，超越人类太空旅行的极限，从而开始在广袤的宇宙中进行星际航行的故事。' },
  { id: 3, title: '盗墓笔记', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300&h=420', category: '电视剧', rating: 8.8, episode: '更新至24集', isVip: true, description: '五十年前，一群长沙土夫子挖到了一件战国古墓，从此开启了一段惊心动魄的盗墓之旅。' },
  { id: 4, title: '狂飙', cover: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=300&h=420', category: '电视剧', rating: 9.1, episode: '全39集', isVip: false, description: '讲述了以刑警安欣为代表的正义力量，与黑恶势力及其保护伞展开长达二十年的生死较量。' },
  { id: 5, title: '海贼王', cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300&h=420', category: '动漫', rating: 9.7, episode: '更新1089集', isVip: true, description: '路飞与他的伙伴们踏上寻找one piece的大冒险旅程。' },
  { id: 6, title: '奔跑吧', cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300&h=420', category: '综艺', rating: 8.5, episode: '更新至第8期', isVip: false, description: '全新一季跑男团再度集结，带来更多欢笑与挑战。' },
  { id: 7, title: '冰雪奇缘', cover: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=300&h=420', category: '动漫', rating: 9.0, episode: '高清', isVip: false, description: '讲述了小国阿伦黛尔的公主艾莎，天生具有制造冰雪的能力，她与妹妹安娜一起拯救王国的故事。' },
  { id: 8, title: '极限挑战', cover: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80&w=300&h=420', category: '综艺', rating: 8.9, episode: '更新至第10期', isVip: true, description: '全新极限男人帮，挑战不可能完成的任务！' },
  { id: 9, title: '地球脉动', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=300&h=420', category: '纪录片', rating: 9.8, episode: '全11集', isVip: true, description: 'BBC经典纪录片，带你领略地球上最壮观的自然景观。' },
  { id: 10, title: '舌尖上的中国', cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300&h=420', category: '纪录片', rating: 9.3, episode: '全7集', isVip: false, description: '探索中国各地的美食文化，感受舌尖上的中国。' },
  { id: 11, title: '盗梦空间', cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=300&h=420', category: '电影', rating: 9.3, episode: '高清', isVip: true, description: '道姆·柯布是一位经验老道的窃贼，他在梦境中偷取别人思维中的秘密。' },
  { id: 12, title: '鬼灭之刃', cover: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&q=80&w=300&h=420', category: '动漫', rating: 9.6, episode: '更新至26集', isVip: true, description: '为了拯救被鬼杀死的家人和变成鬼的妹妹，炭治郎踏上了斩鬼的道路。' },
];