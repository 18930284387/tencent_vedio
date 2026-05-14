import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import type { Video } from '../types/video'

interface VideoModalProps {
  video: Video
  isPlaying: boolean
  isMuted: boolean
  onClose: () => void
  onTogglePlay: () => void
  onToggleMute: () => void
}

export function VideoModal({
  video,
  isPlaying,
  isMuted,
  onClose,
  onTogglePlay,
  onToggleMute,
}: VideoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
        <div className="relative">
          <div className="aspect-video bg-slate-800 relative overflow-hidden">
            <img src={video.cover} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={onTogglePlay}
                className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12 text-white fill-current" />
                ) : (
                  <Play className="w-12 h-12 text-white fill-current ml-1" />
                )}
              </button>
            </div>

            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={onToggleMute}
                className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{video.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span>{video.category}</span>
                  {video.rating && <span>{video.rating}分</span>}
                  {video.episode && <span>{video.episode}</span>}
                </div>
              </div>
            </div>

            {video.description && <p className="text-slate-300 leading-relaxed">{video.description}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
