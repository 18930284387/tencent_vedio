import { Bell, Crown, Search, User } from 'lucide-react'
import type { Video } from '../types/video'

interface HeaderProps {
  tabs: string[]
  activeTab: string
  searchQuery: string
  showSearchResults: boolean
  searchedVideos: Video[]
  onTabChange: (tab: string) => void
  onSearchChange: (value: string) => void
  onSearchFocus: () => void
  onSearchResultSelect: (video: Video) => void
}

export function Header({
  tabs,
  activeTab,
  searchQuery,
  showSearchResults,
  searchedVideos,
  onTabChange,
  onSearchChange,
  onSearchFocus,
  onSearchResultSelect,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">极</span>
              </div>
              <span className="text-white font-bold text-xl">极光视频</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center bg-slate-800 rounded-full px-4 py-2 w-64">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="搜索影片、剧集、综艺"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  onFocus={onSearchFocus}
                  className="bg-transparent text-white placeholder-slate-400 text-sm outline-none flex-1"
                />
              </div>

              {showSearchResults && searchedVideos.length > 0 && (
                <div className="absolute top-12 left-0 right-0 bg-slate-800 rounded-lg shadow-xl border border-slate-700 max-h-64 overflow-y-auto">
                  {searchedVideos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => onSearchResultSelect(video)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0"
                    >
                      <div className="text-white font-medium text-sm">{video.title}</div>
                      <div className="text-slate-400 text-xs mt-1">{video.category}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-white text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all">
              <Crown className="w-4 h-4" />
              <span>开通VIP</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
