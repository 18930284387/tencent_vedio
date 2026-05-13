import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { Video } from './types';
import { videos } from './data/mock';
import Header from './components/Header';
import Banner from './components/Banner';
import CategoryFilter from './components/CategoryFilter';
import ContentSection from './components/ContentSection';
import VideoModal from './components/VideoModal';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
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

  const getFilteredTitle = () => {
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
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
        searchedVideos={searchedVideos}
        setSelectedVideo={setSelectedVideo}
      />

      <main className="pt-20" onClick={() => setShowSearchResults(false)}>
        <Banner />
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        <div className="max-w-7xl mx-auto px-8 pb-12">
          <ContentSection 
            title={getFilteredTitle()} 
            videos={filteredVideos} 
            onVideoClick={setSelectedVideo} 
          />

          <ContentSection 
            title={
              <>
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></span>
                电影分集
              </>
            } 
            videos={categoryVideos('电影')} 
            onVideoClick={setSelectedVideo} 
          />

          <ContentSection 
            title={
              <>
                <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-400 rounded-full"></span>
                热门剧集
              </>
            } 
            videos={categoryVideos('电视剧')} 
            onVideoClick={setSelectedVideo} 
          />

          <ContentSection 
            title={
              <>
                <span className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-400 rounded-full"></span>
                动漫二次元
              </>
            } 
            videos={categoryVideos('动漫')} 
            onVideoClick={setSelectedVideo} 
          />

          <ContentSection 
            title={
              <>
                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-400 rounded-full"></span>
                热播综艺
              </>
            } 
            videos={categoryVideos('综艺')} 
            onVideoClick={setSelectedVideo} 
          />

          <section className="mb-10">
            <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border border-amber-500/30 rounded-2xl p-6">
              <ContentSection 
                title={
                  <div className="flex items-center gap-3">
                    <Crown className="w-8 h-8 text-amber-400" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">VIP尊享专区</h2>
                      <p className="text-amber-300 text-sm font-normal">精选内容，会员专享</p>
                    </div>
                  </div>
                } 
                videos={videos.filter(v => v.isVip)} 
                onVideoClick={setSelectedVideo}
                className="mb-0"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default App;
