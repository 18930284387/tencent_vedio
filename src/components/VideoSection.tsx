import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Video } from '../types';
import { categories } from '../data';
import { filterVideos, getCategoryVideos } from '../data';
import VideoCard from './VideoCard';

interface VideoSectionProps {
  videos: Video[];
  activeCategory: string;
  activeTab: string;
  onCategoryChange: (category: string) => void;
  onVideoSelect: (video: Video) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videos,
  activeCategory,
  activeTab,
  onCategoryChange,
  onVideoSelect,
}) => {
  const filteredVideos = filterVideos(videos, activeCategory);
  const categoryVideos = (category: string) => getCategoryVideos(videos, category);

  const renderCategoryTabs = () => (
    <div className="flex gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category
              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const renderVideoList = (title: string, videoList: Video[], showViewMore: boolean = false) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showViewMore && (
          <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
            查看更多 <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
        {videoList.map((video) => (
          <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
        ))}
      </div>
    </div>
  );

  if (activeTab === '首页') {
    return (
      <div className="space-y-8">
        {renderCategoryTabs()}
        {renderVideoList('精选推荐', filteredVideos.slice(0, 8))}
        {renderVideoList('电影', categoryVideos('电影'), true)}
        {renderVideoList('电视剧', categoryVideos('电视剧'), true)}
        {renderVideoList('动漫', categoryVideos('动漫'), true)}
        {renderVideoList('综艺', categoryVideos('综艺'), true)}
        {renderVideoList('纪录片', categoryVideos('纪录片'), true)}
      </div>
    );
  }

  const categoryMap: Record<string, string> = {
    '电视剧': '电视剧',
    '电影': '电影',
    '综艺': '综艺',
    '动漫': '动漫',
    '纪录片': '纪录片',
  };

  const categoryTitle = categoryMap[activeTab];

  return (
    <div className="space-y-8">
      {renderCategoryTabs()}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{categoryTitle}</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
