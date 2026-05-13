import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Play, ChevronLeft, ChevronRight, Crown, Star, X, Volume2, VolumeX, Maximize, Pause, SkipBack, SkipForward, Lock, LogOut, Eye, EyeOff } from 'lucide-react';

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

interface LoginUser {
  username: string;
  nickname: string;
  avatar?: string;
}

interface LoginForm {
  username: string;
  password: string;
}

interface LoginErrors {
  username?: string;
  password?: string;
  general?: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('aurora_user');
    return !!saved;
  });
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(() => {
    const saved = localStorage.getItem('aurora_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const banners = [
    { id: 1, title: '流浪地球3', subtitle: '2025年度科幻巨制震撼来袭', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1400&h=500' },
    { id: 2, title: '复仇者联盟：终局之战', subtitle: '漫威英雄终极对决', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1400&h=500' },
    { id: 3, title: '阿凡达：水之道', subtitle: '视觉盛宴再度升级', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1400&h=500' },
  ];

  const tabs = ['首页', '电视剧', '电影', '综艺', '动漫', '纪录片'];
  const categories = ['全部', '热门', '最新', '好评', '免费', 'VIP'];

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

  const filteredVideos = videos.filter(video => {
    if (activeCategory === '全部') return true;
    if (activeCategory === 'VIP') return video.isVip;
    if (activeCategory === '免费') return !video.isVip;
    if (activeCategory === '热门') return video.rating && video.rating >= 9;
    if (activeCategory === '最新') return video.id > 5;
    if (activeCategory === '好评') return video.rating && video.rating >= 8.5;
    return true;
  });

  const searchedVideos = searchQuery 
    ? videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const categoryVideos = (category: string) => videos.filter(v => v.category === category).slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showUserMenu) return;
    const handleClickOutside = () => setShowUserMenu(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const validateLoginForm = (): boolean => {
    const errors: LoginErrors = {};
    if (!loginForm.username.trim()) {
      errors.username = '请输入用户名';
    } else if (loginForm.username.trim().length < 2) {
      errors.username = '用户名至少2个字符';
    }
    if (!loginForm.password) {
      errors.password = '请输入密码';
    } else if (loginForm.password.length < 6) {
      errors.password = '密码至少6位';
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = () => {
    if (!validateLoginForm()) return;
    const mockUsers: Record<string, { password: string; nickname: string }> = {
      admin: { password: 'admin123', nickname: '管理员' },
      demo: { password: 'demo123', nickname: '演示用户' },
    };
    const mockUser = mockUsers[loginForm.username.trim()];
    if (mockUser && mockUser.password === loginForm.password) {
      const user: LoginUser = {
        username: loginForm.username.trim(),
        nickname: mockUser.nickname,
      };
      localStorage.setItem('aurora_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ username: '', password: '' });
      setLoginErrors({});
    } else if (loginForm.password.length >= 6) {
      const user: LoginUser = {
        username: loginForm.username.trim(),
        nickname: loginForm.username.trim(),
      };
      localStorage.setItem('aurora_user', JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ username: '', password: '' });
      setLoginErrors({});
    } else {
      setLoginErrors({ general: '用户名或密码错误' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aurora_user');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  const openLoginModal = () => {
    setLoginForm({ username: '', password: '' });
    setLoginErrors({});
    setShowLoginModal(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const VideoCard: React.FC<{ video: Video }> = ({ video }) => (
    <div
      className="relative group cursor-pointer flex-shrink-0"
      onClick={() => setSelectedVideo(video)}
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
            <div className="space-y-4">
              <p className="text-white text-lg">正在播放: {video.title}</p>
              <div className="bg-white rounded-full p-4 animate-pulse">
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

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowLoginModal(false)}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white text-xl font-bold">登录极光视频</h2>
          </div>
          <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {loginErrors.general && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {loginErrors.general}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">用户名</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, username: e.target.value });
                  if (loginErrors.username) setLoginErrors({ ...loginErrors, username: undefined });
                }}
                placeholder="请输入用户名"
                className="w-full bg-gray-800/80 text-white text-sm px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all placeholder-gray-500"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {loginErrors.username && <p className="text-red-400 text-xs mt-1.5">{loginErrors.username}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">密码</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, password: e.target.value });
                  if (loginErrors.password) setLoginErrors({ ...loginErrors, password: undefined });
                }}
                placeholder="请输入密码"
                className="w-full bg-gray-800/80 text-white text-sm px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all placeholder-gray-500"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-300 absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {loginErrors.password && <p className="text-red-400 text-xs mt-1.5">{loginErrors.password}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            登录
          </button>

          <div className="text-center">
            <p className="text-gray-500 text-xs">
              演示账号：admin / admin123 或 demo / demo123
            </p>
            <p className="text-gray-600 text-xs mt-1">
              也可输入任意用户名 + 6位以上密码自动注册登录
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-950 to-transparent z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              极光视频
            </h1>
            <nav className="flex gap-6">
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
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索电影、电视剧..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
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
                        setSelectedVideo(video);
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
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-sm px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-xl">
              <Crown className="w-4 h-4" /> VIP会员
            </button>
            {isLoggedIn && currentUser ? (
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); }}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {currentUser.nickname.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{currentUser.nickname}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl z-50">
                    <div className="p-3 border-b border-gray-700">
                      <p className="text-white text-sm font-medium">{currentUser.nickname}</p>
                      <p className="text-gray-500 text-xs">@{currentUser.username}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
                    >
                      <LogOut className="w-4 h-4" /> 退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <User className="w-5 h-5" />
                <span>登录</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20" onClick={() => setShowSearchResults(false)}>
        {/* Banner Carousel */}
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
                    <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                      {banner.title}
                    </h2>
                    <p className="text-gray-300 text-xl mb-8">{banner.subtitle}</p>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl">
                        <Play className="w-6 h-6 fill-current" /> 立即播放
                      </button>
                      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105">
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-10 bg-gradient-to-r from-blue-400 to-cyan-400' : 'w-4 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-8 pb-12">
          {/* 当前分类内容 */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeCategory === '全部' ? '热播推荐' : 
                 activeCategory === 'VIP' ? 'VIP精选' :
                 activeCategory === '免费' ? '免费专区' :
                 activeCategory === '热门' ? '热门排行' :
                 activeCategory === '最新' ? '最新上线' : '高分佳作'}
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

          {/* 电影专区 */}
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

          {/* 电视剧专区 */}
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

          {/* 动漫专区 */}
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

          {/* 综艺专区 */}
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

          {/* VIP专区 */}
          <section className="mb-10">
            <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-amber-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">VIP尊享专区</h2>
                    <p className="text-amber-300 text-sm">精选内容，会员专享</p>
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

      {/* Footer */}
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

      {/* Video Player Modal */}
      {selectedVideo && <VideoModal video={selectedVideo} />}
      {showLoginModal && <LoginModal />}
    </div>
  );
};

export default App;