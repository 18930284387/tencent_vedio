import React from 'react';
import { Play, Crown, Star } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => (
  <div
    className="relative group cursor-pointer flex-shrink-0"
    onClick={onClick}
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

export default VideoCard;
