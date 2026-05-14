import { BannerCarousel } from './components/BannerCarousel'
import { CategoryFilter } from './components/CategoryFilter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { VideoGrid } from './components/VideoGrid'
import { VideoModal } from './components/VideoModal'
import { VideoSection } from './components/VideoSection'
import { banners, categories, tabs } from './data/media'
import { useVideoApp } from './hooks/useVideoApp'

function App() {
  const {
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
  } = useVideoApp()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header
        tabs={tabs}
        activeTab={activeTab}
        searchQuery={searchQuery}
        showSearchResults={showSearchResults}
        searchedVideos={searchedVideos}
        onTabChange={handleTabChange}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onSearchResultSelect={handleSearchResultSelect}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" onClick={hideSearchResults}>
        <section className="mb-12">
          <BannerCarousel
            banners={banners}
            currentSlide={currentSlide}
            onPrevious={prevSlide}
            onNext={nextSlide}
            onSlideSelect={setCurrentSlide}
          />
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">精选内容</h2>
            <div className="text-sm text-slate-400">共 {filteredVideos.length} 部作品</div>
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <VideoGrid videos={filteredVideos} onSelectVideo={setSelectedVideo} />
        </section>

        <VideoSection title="VIP专享" videos={vipVideos} onSelectVideo={setSelectedVideo} vipTheme />

        {sectionItems.map((section) => (
          <VideoSection
            key={section.category}
            title={section.title}
            videos={section.videos}
            onSelectVideo={setSelectedVideo}
            accentClassName={section.accentClassName}
          />
        ))}
      </main>

      <Footer />

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onClose={handleVideoClose}
          onTogglePlay={handleTogglePlay}
          onToggleMute={handleToggleMute}
        />
      )}
    </div>
  )
}

export default App
