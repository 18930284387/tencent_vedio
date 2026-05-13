import React from 'react';
import { Search, Bell, User, Crown } from 'lucide-react';
import type { Video } from '../types/video';

interface HeaderProps {
  tabs: string[];
  activeTab: string;
  searchQuery: string;
  showSearchResults: boolean;
  searchedVideos: Video[];
  onTabChange: (tab: string) => void;
  onSearchChange: (query: string) => void;
  onSearchFocus: (focused: boolean) => void;
  onVideoSelect: (video: Video) => void;
}

const Header: React.FC<HeaderProps> = ({
  tabs,
  activeTab,
  searchQuery,
  showSearchResults,
  searchedVideos,
  onTabChange,
  onSearchChange,
  onSearchFocus,
  onVideoSelect,
}) => {
  const handleTabClick = (tab: string) => {
    onTabChange(tab);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    onSearchFocus(value.length > 0);
  };

  const handleSearchFocus = () => {
    onSearchFocus(searchQuery.length > 0);
  };

  const handleVideoClick = (video: Video) => {
    onVideoSelect(video);
    onSearchChange('');
    onSearchFocus(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-950 to-transparent z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            极光视频
          </h1>
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-sm font-medium transition-all relative ${
                  activeTab === tab
                    ? 'text-white scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索电影、电视剧..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="bg-gray-800/80 backdrop-blur text-white text-sm px-4 py-2 pl-10 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {showSearchResults && searchedVideos.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                {searchedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleVideoClick(video)}
                  >
                    <img
                      src={video.cover}
                      alt={video.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{video.title}</p>
                      <p className="text-gray-400 text-xs">{video.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showSearchResults && searchQuery && searchedVideos.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
                <p className="text-gray-400 text-sm">未找到相关内容</p>
              </div>
            )}
          </div>
          <button className="text-gray-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-sm px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-xl">
            <Crown className="w-4 h-4" /> VIP会员
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;