import React, { useState, useMemo, useCallback } from 'react';
import { banners, tabs, categories, videos } from './data/videos';
import { useBannerCarousel } from './hooks/useBannerCarousel';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import VideoSection from './components/VideoSection';
import VideoModal from './components/VideoModal';
import Footer from './components/Footer';
import type { Video } from './types/video';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { currentSlide, nextSlide, prevSlide } = useBannerCarousel(banners.length);

  const filteredVideos = useMemo(() => videos.filter(video => {
    if (activeCategory === '全部') return true;
    if (activeCategory === 'VIP') return video.isVip;
    if (activeCategory === '免费') return !video.isVip;
    if (activeCategory === '热门') return video.rating && video.rating >= 9;
    if (activeCategory === '最新') return video.id > 5;
    if (activeCategory === '好评') return video.rating && video.rating >= 8.5;
    return true;
  }), [activeCategory]);

  const searchedVideos = useMemo(() =>
    searchQuery
      ? videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : [],
  [searchQuery]);

  const categoryVideos = useCallback((category: string) =>
    videos.filter(v => v.category === category).slice(0, 6),
  []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveCategory('全部');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Header
        tabs={tabs}
        activeTab={activeTab}
        searchQuery={searchQuery}
        showSearchResults={showSearchResults}
        searchedVideos={searchedVideos}
        onTabChange={handleTabChange}
        onSearchChange={setSearchQuery}
        onSearchFocus={setShowSearchResults}
        onVideoSelect={setSelectedVideo}
      />

      <main className="pt-20" onClick={() => setShowSearchResults(false)}>
        <BannerCarousel
          banners={banners}
          currentSlide={currentSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
        />

        <VideoSection
          activeTab={activeTab}
          activeCategory={activeCategory}
          categories={categories}
          videos={videos}
          filteredVideos={filteredVideos}
          categoryVideos={categoryVideos}
          onCategoryChange={setActiveCategory}
          onVideoSelect={setSelectedVideo}
        />
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