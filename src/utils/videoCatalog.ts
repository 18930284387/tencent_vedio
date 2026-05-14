import type { Video } from '../types/video'

export function getFilteredVideos(videos: Video[], activeCategory: string) {
  if (activeCategory === '全部') {
    return videos
  }

  return videos.filter((video) => video.category === activeCategory)
}

export function searchVideos(videos: Video[], searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  if (!normalizedQuery) {
    return []
  }

  return videos.filter((video) => video.title.toLowerCase().includes(normalizedQuery))
}

export function getCategoryVideos(videos: Video[], category: string, limit = 6) {
  return videos.filter((video) => video.category === category).slice(0, limit)
}

export function getVipVideos(videos: Video[]) {
  return videos.filter((video) => video.isVip)
}
