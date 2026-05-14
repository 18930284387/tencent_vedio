import { Crown } from 'lucide-react'
import { VideoGrid } from './VideoGrid'
import type { Video } from '../types/video'

interface VideoSectionProps {
  title: string
  videos: Video[]
  onSelectVideo: (video: Video) => void
  accentClassName?: string
  vipTheme?: boolean
}

export function VideoSection({
  title,
  videos,
  onSelectVideo,
  accentClassName = 'from-blue-500 to-cyan-400',
  vipTheme = false,
}: VideoSectionProps) {
  if (videos.length === 0) {
    return null
  }

  if (vipTheme) {
    return (
      <section className="mb-12">
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className="text-yellow-400 text-sm">会员专享内容，畅享无广告高清观影体验</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
              立即开通
            </button>
          </div>

          <VideoGrid
            videos={videos}
            onSelectVideo={onSelectVideo}
            columnsClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-1 h-8 bg-gradient-to-b ${accentClassName} rounded-full`} />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
          查看更多 →
        </button>
      </div>

      <VideoGrid videos={videos} onSelectVideo={onSelectVideo} />
    </section>
  )
}
