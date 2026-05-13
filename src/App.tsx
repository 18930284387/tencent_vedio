import React, { useEffect, useState } from 'react';
import {
  Search,
  Bell,
  User,
  Play,
  ChevronLeft,
  ChevronRight,
  Crown,
  Star,
  X,
  Volume2,
  VolumeX,
  Maximize,
  Pause,
  SkipBack,
  SkipForward,
  LogIn,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

interface Video {
  id: number;
  title: string;
  cover: string;
  category: string;
  rating?: number;
  episode?: string;
  isVip?: boolean;
  description?: string;
}

interface AuthUser {
  username: string;
  displayName: string;
  loginAt: string;
}

interface LoginForm {
  identifier: string;
  password: string;
}

interface LoginErrors {
  identifier?: string;
  password?: string;
  submit?: string;
}

interface MockAccount {
  username: string;
  email: string;
  phone: string;
  password: string;
  displayName: string;
}

const AUTH_STORAGE_KEY = 'aurora-video-auth-user';

const banners = [
  { id: 1, title: '流浪地球3', subtitle: '2025年度科幻巨制震撼来袭', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1400&h=500' },
  { id: 2, title: '复仇者联盟：终局之战', subtitle: '漫威英雄终极对决', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1400&h=500' },
  { id: 3, title: '阿凡达：水之道', subtitle: '视觉盛宴再度升级', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1400&h=500' },
];

const tabs = ['首页', '电视剧', '电影', '综艺', '动漫', '纪录片'];
const categories = ['全部', '热门', '最新', '好评', '免费', 'VIP'];

const mockAccounts: MockAccount[] = [
  {
    username: 'aurora',
    email: 'aurora@example.com',
    phone: '13800000000',
    password: '123456',
    displayName: '极光观影官',
  },
  {
    username: 'demo',
    email: 'demo@example.com',
    phone: '13900000000',
    password: 'demo123',
    displayName: '演示用户',
  },
];

const videos: Video[] = [
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

const getStoredAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(storedUser) as AuthUser;

    if (parsedUser.username && parsedUser.displayName && parsedUser.loginAt) {
      return parsedUser;
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getStoredAuthUser());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ identifier: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [loginHint, setLoginHint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredVideos = videos.filter((video) => {
    if (activeTab !== '首页' && video.category !== activeTab) return false;
    if (activeCategory === '全部') return true;
    if (activeCategory === 'VIP') return video.isVip;
    if (activeCategory === '免费') return !video.isVip;
    if (activeCategory === '热门') return video.rating && video.rating >= 9;
    if (activeCategory === '最新') return video.id > 5;
    if (activeCategory === '好评') return video.rating && video.rating >= 8.5;
    return true;
  });

  const searchedVideos = searchQuery
    ? videos.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const categoryVideos = (category: string) => videos.filter((video) => video.category === category).slice(0, 6);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (authUser) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [authUser]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const resetLoginState = () => {
    setLoginForm({ identifier: '', password: '' });
    setLoginErrors({});
    setLoginHint('');
    setIsSubmitting(false);
  };

  const openLoginModal = (hint = '') => {
    setShowLoginModal(true);
    setLoginHint(hint);
    setLoginErrors({});
    setLoginForm({ identifier: '', password: '' });
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    resetLoginState();
  };

  const validateLoginForm = () => {
    const errors: LoginErrors = {};
    const identifier = loginForm.identifier.trim();
    const password = loginForm.password.trim();

    if (!identifier) {
      errors.identifier = '请输入用户名、邮箱或手机号';
    } else if (identifier.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      errors.identifier = '邮箱格式不正确';
    } else if (/^1\d{10}$/.test(identifier) === false && identifier.length < 3 && !identifier.includes('@')) {
      errors.identifier = '账号至少 3 个字符';
    }

    if (!password) {
      errors.password = '请输入密码';
    } else if (password.length < 6) {
      errors.password = '密码至少 6 位';
    }

    return errors;
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateLoginForm();

    if (errors.identifier || errors.password) {
      setLoginErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setLoginErrors({});

    await new Promise((resolve) => window.setTimeout(resolve, 500));

    const identifier = loginForm.identifier.trim();
    const password = loginForm.password.trim();

    const matchedAccount = mockAccounts.find((account) => {
      const matchesIdentifier =
        account.username === identifier || account.email === identifier || account.phone === identifier;

      return matchesIdentifier && account.password === password;
    });

    if (!matchedAccount) {
      setIsSubmitting(false);
      setLoginErrors({ submit: '账号或密码不正确，请使用演示账号登录' });
      return;
    }

    setAuthUser({
      username: matchedAccount.username,
      displayName: matchedAccount.displayName,
      loginAt: new Date().toISOString(),
    });
    setIsSubmitting(false);
    closeLoginModal();
  };

  const handleLogout = () => {
    setAuthUser(null);
    setSelectedVideo(null);
    setIsPlaying(false);
    setIsMuted(false);
    closeLoginModal();
  };

  const handleOpenVideo = (video: Video) => {
    if (!authUser && video.isVip) {
      openLoginModal(`登录后即可观看《${video.title}》等 VIP 内容`);
      return;
    }

    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const handlePrimaryBannerAction = () => {
    if (!authUser) {
      openLoginModal('登录后可同步观影状态，并解锁更多会员内容');
      return;
    }

    handleOpenVideo(videos[0]);
  };

  const formatLoginTime = (loginAt: string) => {
    const date = new Date(loginAt);

    return `${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
    <div
      className="relative group cursor-pointer flex-shrink-0"
      onClick={() => handleOpenVideo(video)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={video.cover}
          alt={video.title}
          className="w-40 h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <button className="bg-white rounded-full p-3 transform hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-gray-800 fill-current" />
          </button>
        </div>
        {video.isVip && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Crown className="w-3 h-3" /> VIP
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.episode}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-white font-semibold text-sm truncate">{video.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-400 text-xs">{video.category}</span>
          {video.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-amber-400 text-xs">{video.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const VideoModal: React.FC<{ video: Video }> = ({ video }) => (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedVideo(null)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-xl font-bold">{video.title}</h2>
        </div>
        <button
          onClick={() => setSelectedVideo(null)}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative bg-black">
        <img
          src={video.cover}
          alt={video.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-full p-5 transform transition shadow-xl hover:scale-110"
            >
              <Play className="w-12 h-12 text-white fill-current" />
            </button>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-white text-lg">正在播放: {video.title}</p>
              <div className="bg-white rounded-full p-4 animate-pulse inline-flex">
                <Play className="w-8 h-8 text-blue-500 fill-current" />
              </div>
              <p className="text-gray-400 text-sm">视频演示模式</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black px-6 py-4">
          <div className="w-full bg-gray-700 rounded-full h-1 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1 rounded-full w-1/4"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-white text-sm">25:00 / 120:00</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">{video.episode}</span>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-900 max-h-64 overflow-y-auto">
        <div className="flex items-start gap-6">
          <img
            src={video.cover}
            alt={video.title}
            className="w-32 h-44 object-cover rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-white text-2xl font-bold">{video.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-gray-400 text-sm bg-gray-800 px-2 py-1 rounded">{video.category}</span>
              {video.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 font-bold">{video.rating}</span>
                </div>
              )}
              <span className="text-gray-400 text-sm">{video.episode}</span>
              {video.isVip && (
                <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Crown className="w-3 h-3" /> VIP专享
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-4 leading-relaxed">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginModal: React.FC = () => (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl overflow-hidden border border-cyan-400/20 bg-gray-900 shadow-2xl">
        <div className="relative px-6 py-6 border-b border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10"></div>
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-cyan-300 text-sm mb-2">轻量前端模拟登录</p>
              <h2 className="text-white text-2xl font-bold">登录极光视频</h2>
              <p className="text-gray-400 text-sm mt-2">当前项目未接入后端，登录状态将保存到 localStorage。</p>
            </div>
            <button
              onClick={closeLoginModal}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleLoginSubmit} className="p-6 space-y-5">
          {loginHint && (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              {loginHint}
            </div>
          )}

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100 space-y-1">
            <p>演示账号 1：aurora / aurora@example.com / 13800000000</p>
            <p>密码：123456</p>
            <p>演示账号 2：demo / demo@example.com / 13900000000</p>
            <p>密码：demo123</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">用户名 / 邮箱 / 手机号</label>
            <input
              type="text"
              value={loginForm.identifier}
              onChange={(event) => {
                setLoginForm((prev) => ({ ...prev, identifier: event.target.value }));
                setLoginErrors((prev) => ({ ...prev, identifier: undefined, submit: undefined }));
              }}
              placeholder="请输入登录账号"
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            {loginErrors.identifier && <p className="text-sm text-rose-400">{loginErrors.identifier}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">密码</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(event) => {
                setLoginForm((prev) => ({ ...prev, password: event.target.value }));
                setLoginErrors((prev) => ({ ...prev, password: undefined, submit: undefined }));
              }}
              placeholder="请输入密码"
              className="w-full rounded-2xl border border-gray-700 bg-gray-800/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            {loginErrors.password && <p className="text-sm text-rose-400">{loginErrors.password}</p>}
          </div>

          {loginErrors.submit && (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {loginErrors.submit}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>登录成功后自动持久化保存</span>
            </div>
            <span>无后端依赖</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={closeLoginModal}
              className="flex-1 rounded-2xl border border-gray-700 bg-gray-800/80 px-4 py-3 text-white transition hover:bg-gray-700"
            >
              稍后再说
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-blue-600 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? '登录中...' : '立即登录'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-950 to-transparent z-40">
        <div className="flex items-center justify-between px-6 py-4 gap-4">
          <div className="flex items-center gap-8 min-w-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
              极光视频
            </h1>
            <nav className="hidden lg:flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setActiveCategory('全部');
                  }}
                  className={`text-sm font-medium transition-all relative ${
                    activeTab === tab
                      ? 'text-white scale-105'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="搜索电影、电视剧..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setShowSearchResults(event.target.value.length > 0);
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                className="bg-gray-800/80 backdrop-blur text-white text-sm px-4 py-2 pl-10 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {showSearchResults && searchedVideos.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                  {searchedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => {
                        handleOpenVideo(video);
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                    >
                      <img
                        src={video.cover}
                        alt={video.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{video.title}</p>
                        <p className="text-gray-400 text-xs">{video.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showSearchResults && searchQuery && searchedVideos.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
                  <p className="text-gray-400 text-sm">未找到相关内容</p>
                </div>
              )}
            </div>
            <button className="text-gray-400 hover:text-white transition-colors relative hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => {
                if (!authUser) {
                  openLoginModal('登录后可查看会员权益与专属片单');
                }
              }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-sm px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              <Crown className="w-4 h-4" /> {authUser ? '会员中心' : 'VIP会员'}
            </button>
            {authUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" /> 已登录
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800/80 px-4 py-2 text-sm text-white">
                  <User className="w-4 h-4 text-cyan-300" />
                  <span className="max-w-24 truncate">{authUser.displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/80 px-4 py-2 text-sm text-gray-200 transition hover:border-gray-500 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">退出</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/20"
              >
                <LogIn className="w-4 h-4" /> 登录
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-20" onClick={() => setShowSearchResults(false)}>
        <div className="relative h-96 overflow-hidden group">
          <div
            className="flex transition-transform duration-500 h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="min-w-full h-full relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
                  <div className="flex flex-col justify-center h-full max-w-7xl mx-auto px-8">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                      {banner.title}
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-3">{banner.subtitle}</p>
                    <p className="text-sm md:text-base text-gray-400 mb-8 max-w-xl">
                      {authUser ? `${authUser.displayName}，当前已登录，可继续观看并保留本地登录状态。` : '登录后即可体验前端模拟登录、状态持久化与 VIP 内容拦截。'}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      <button
                        onClick={handlePrimaryBannerAction}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl"
                      >
                        <Play className="w-6 h-6 fill-current" />
                        {authUser ? '继续观看' : '立即登录'}
                      </button>
                      <button
                        onClick={() => handleOpenVideo(videos[0])}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-400 to-cyan-400'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <section className="mb-8">
            <div className="rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-900/70 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm text-cyan-300 mb-2">当前项目登录状态</p>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {authUser ? `欢迎回来，${authUser.displayName}` : '你当前还未登录'}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  {authUser
                    ? `登录时间：${formatLoginTime(authUser.loginAt)}，刷新页面后仍会从 localStorage 恢复登录状态。`
                    : '点击右上角登录入口，使用演示账号即可体验输入校验、登录状态切换与退出登录。'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {authUser ? (
                  <>
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> 本地登录已生效
                    </div>
                    <button
                      onClick={handleLogout}
                      className="rounded-2xl border border-gray-700 bg-gray-800/80 px-5 py-3 text-sm text-white transition hover:bg-gray-700"
                    >
                      退出登录
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => openLoginModal('请先完成登录，再体验完整播放流程')}
                    className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-600 hover:to-cyan-500"
                  >
                    打开登录表单
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="flex gap-3 overflow-x-auto pb-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeCategory === '全部'
                  ? activeTab === '首页'
                    ? '热播推荐'
                    : `${activeTab}精选`
                  : activeCategory === 'VIP'
                    ? 'VIP精选'
                    : activeCategory === '免费'
                      ? '免费专区'
                      : activeCategory === '热门'
                        ? '热门排行'
                        : activeCategory === '最新'
                          ? '最新上线'
                          : '高分佳作'}
              </h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                查看更多 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></span>
                电影分集
              </h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                查看更多 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {categoryVideos('电影').map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-400 rounded-full"></span>
                热门剧集
              </h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                查看更多 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {categoryVideos('电视剧').map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-400 rounded-full"></span>
                动漫二次元
              </h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                查看更多 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {categoryVideos('动漫').map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-400 rounded-full"></span>
                热播综艺
              </h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                查看更多 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {categoryVideos('综艺').map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-amber-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">VIP尊享专区</h2>
                    <p className="text-amber-300 text-sm">
                      {authUser ? '已登录，可直接查看会员专享内容' : '未登录时点击会员内容会先拉起登录表单'}
                    </p>
                  </div>
                </div>
                <button className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 transition-colors">
                  查看更多 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                {videos.filter((video) => video.isVip).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900/80 border-t border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                极光视频
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                为您提供高清、流畅的视频播放体验，海量内容随心看。
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
                  文
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
                  博
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
                  B
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">产品服务</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">VIP会员</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">极光TV</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">视频彩铃</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">极光云游戏</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">帮助中心</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">会员服务</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">使用帮助</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">意见反馈</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">投诉举报</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">下载APP</h4>
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded flex items-center justify-center text-gray-800 text-sm">
                  二维码
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2 text-center">扫码下载APP</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-xs">
              <a href="#" className="hover:text-gray-400 transition-colors">用户协议</a>
              <a href="#" className="hover:text-gray-400 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-gray-400 transition-colors">版权声明</a>
              <a href="#" className="hover:text-gray-400 transition-colors">反盗版与盗链声明</a>
              <a href="#" className="hover:text-gray-400 transition-colors">未成年人用户协议</a>
            </div>
            <p className="text-gray-600 text-xs">
              © 2025 极光视频 版权所有 | 京ICP备XXXXXXXX号
            </p>
          </div>
        </div>
      </footer>

      {selectedVideo && <VideoModal video={selectedVideo} />}
      {showLoginModal && <LoginModal />}
    </div>
  );
};

export default App;
