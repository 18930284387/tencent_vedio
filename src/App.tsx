import React, { useState, useEffect } from 'react';
import { ChevronRight, Crown } from 'lucide-react';
import { Video } from './types';
import { banners, tabs, categories, videos } from './data';
import VideoCard from './components/VideoCard';
import VideoModal from './components/VideoModal';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [showSearchResults, setShowSearchResults] = useState(false);

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

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case '全部': return '热播推荐';
      case 'VIP': return 'VIP精选';
      case '免费': return '免费专区';
      case '热门': return '热门排行';
      case '最新': return '最新上线';
      case '好评': return '高分佳作';
      default: return '热播推荐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Header
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
        searchedVideos={searchedVideos}
        setSelectedVideo={setSelectedVideo}
      />

      <main className="pt-20" onClick={() => setShowSearchResults(false)}>
        <BannerCarousel
          banners={banners}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

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

        <div className="max-w-7xl mx-auto px-8 pb-12">
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {getCategoryTitle()}
              </h2>
              <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                查看更多 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
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
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
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
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
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
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
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
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
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
                    <p className="text-amber-300 text-sm">精选内容，会员专享</p>
                  </div>
                </div>
                <button className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 transition-colors">
                  查看更多 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                {videos.filter((video) => video.isVip).map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      )}
    </div>
  );
};

export default App;
