import React, { useState } from 'react';
import { ChevronLeft, X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Star, Crown } from 'lucide-react';
import type { Video } from '../types/video';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-xl font-bold">{video.title}</h2>
        </div>
        <button
          onClick={onClose}
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
};

export default VideoModal;