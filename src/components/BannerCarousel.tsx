import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { Banner } from '../types/video'

interface BannerCarouselProps {
  banners: Banner[]
  currentSlide: number
  onPrevious: () => void
  onNext: () => void
  onSlideSelect: (index: number) => void
}

export function BannerCarousel({
  banners,
  currentSlide,
  onPrevious,
  onNext,
  onSlideSelect,
}: BannerCarouselProps) {
  return (
    <div className="relative h-96 rounded-2xl overflow-hidden group">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{banner.title}</h1>
              <p className="text-lg text-slate-200 mb-8 leading-relaxed">{banner.subtitle}</p>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                  <span>立即观看</span>
                </button>
                <button className="bg-slate-800/80 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-700/80 transition-colors backdrop-blur-sm">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => onSlideSelect(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
