import { VideoCard } from './VideoCard'
import type { Video } from '../types/video'

interface VideoGridProps {
  videos: Video[]
  onSelectVideo: (video: Video) => void
  columnsClassName?: string
}

export function VideoGrid({
  videos,
  onSelectVideo,
  columnsClassName = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
}: VideoGridProps) {
  return (
    <div className={`grid ${columnsClassName} gap-6`}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelect={onSelectVideo} />
      ))}
    </div>
  )
}
