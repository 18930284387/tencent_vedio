import { useMemo, useState } from 'react'
import { banners, contentSections, videos } from '../data/media'
import { useCarousel } from './useCarousel'
import type { Video } from '../types/video'
import {
  getCategoryVideos,
  getFilteredVideos,
  getVipVideos,
  searchVideos,
} from '../utils/videoCatalog'

export function useVideoApp() {
  const [activeTab, setActiveTab] = useState('首页')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('全部')
  const [showSearchResults, setShowSearchResults] = useState(false)

  const { currentSlide, setCurrentSlide, nextSlide, prevSlide } = useCarousel(banners.length)

  const filteredVideos = useMemo(
    () => getFilteredVideos(videos, activeCategory),
    [activeCategory],
  )
  const searchedVideos = useMemo(() => searchVideos(videos, searchQuery), [searchQuery])
  const vipVideos = useMemo(() => getVipVideos(videos), [])
  const sectionItems = useMemo(
    () =>
      contentSections.map((section) => ({
        ...section,
        videos: getCategoryVideos(videos, section.category),
      })),
    [],
  )

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setActiveCategory('全部')
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSearchResults(value.length > 0)
  }

  const handleSearchFocus = () => {
    setShowSearchResults(searchQuery.length > 0)
  }

  const handleSearchResultSelect = (video: Video) => {
    setSelectedVideo(video)
    setShowSearchResults(false)
    setSearchQuery('')
  }

  const handleVideoClose = () => {
    setSelectedVideo(null)
  }

  const handleTogglePlay = () => {
    setIsPlaying((playing) => !playing)
  }

  const handleToggleMute = () => {
    setIsMuted((muted) => !muted)
  }

  const hideSearchResults = () => {
    setShowSearchResults(false)
  }

  return {
    activeTab,
    searchQuery,
    selectedVideo,
    isPlaying,
    isMuted,
    activeCategory,
    showSearchResults,
    currentSlide,
    filteredVideos,
    searchedVideos,
    vipVideos,
    sectionItems,
    setCurrentSlide,
    prevSlide,
    nextSlide,
    setActiveCategory,
    setSelectedVideo,
    handleTabChange,
    handleSearchChange,
    handleSearchFocus,
    handleSearchResultSelect,
    handleVideoClose,
    handleTogglePlay,
    handleToggleMute,
    hideSearchResults,
  }
}
