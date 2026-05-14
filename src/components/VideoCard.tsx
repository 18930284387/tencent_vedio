import { Crown, Play, Star } from 'lucide-react'
import type { Video } from '../types/video'

interface VideoCardProps {
  video: Video
  onSelect: (video: Video) => void
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <div
      className="group relative bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
      onClick={() => onSelect(video)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={video.cover}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {video.isVip && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>VIP</span>
          </div>
        )}

        {video.rating && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 backdrop-blur-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{video.rating}</span>
          </div>
        )}

        {video.episode && (
          <div className="absolute bottom-3 right-3 bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {video.episode}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{video.category}</span>
          {video.rating && <span>{video.rating}分</span>}
        </div>
      </div>
    </div>
  )
}
