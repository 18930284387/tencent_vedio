import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface ContentSectionProps {
  title: string | React.ReactNode;
  videos: Video[];
  onVideoClick: (video: Video) => void;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, videos, onVideoClick, className = 'mb-10' }) => {
  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          {title}
        </h2>
        <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
          查看更多 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={onVideoClick} />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
