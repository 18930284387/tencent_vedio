import React from 'react';
import { ChevronRight, Crown } from 'lucide-react';
import type { Video } from '../types/video';
import VideoCard from './VideoCard';

interface VideoSectionProps {
  activeTab: string;
  activeCategory: string;
  categories: string[];
  videos: Video[];
  filteredVideos: Video[];
  categoryVideos: (category: string) => Video[];
  onCategoryChange: (category: string) => void;
  onVideoSelect: (video: Video) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  activeTab,
  activeCategory,
  categories,
  videos,
  filteredVideos,
  categoryVideos,
  onCategoryChange,
  onVideoSelect,
}) => (
  <div className="max-w-7xl mx-auto px-8 py-8">
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {activeTab === '首页' ? '推荐内容' : activeTab}
        </h2>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-sm px-4 py-2 rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
        ))}
      </div>
    </section>

    {activeTab === '首页' && (
      <>
        {['电视剧', '电影', '综艺', '动漫', '纪录片'].map((cat) => {
          const catVids = categoryVideos(cat);
          if (catVids.length === 0) return null;
          return (
            <section key={cat} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{cat}</h2>
                <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                  查看更多 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                {catVids.map((video) => (
                  <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
                ))}
              </div>
            </section>
          );
        })}

        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-500/30 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
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
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {videos.filter((video) => video.isVip).map((video) => (
              <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
            ))}
          </div>
        </section>
      </>
    )}
  </div>
);

export default VideoSection;