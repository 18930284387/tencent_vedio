import React, { useState } from 'react';
import { Header, BannerCarousel, VideoSection, Footer, VideoModal } from './components';
import { Video } from './types';
import { banners, videos } from './data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveCategory('全部');
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onVideoSelect={handleVideoSelect}
      />

      <main className="pt-20">
        <BannerCarousel banners={banners} />

        <div className="max-w-7xl mx-auto px-8 py-8">
          <VideoSection
            videos={videos}
            activeCategory={activeCategory}
            activeTab={activeTab}
            onCategoryChange={setActiveCategory}
            onVideoSelect={handleVideoSelect}
          />
        </div>
      </main>

      <Footer />

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
