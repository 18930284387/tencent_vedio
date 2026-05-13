import React from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Banner } from '../types';

interface BannerCarouselProps {
  banners: Banner[];
  currentSlide: number;
  setCurrentSlide: (value: number) => void;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, currentSlide, setCurrentSlide }) => {
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-96 overflow-hidden group">
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent">
              <div className="flex flex-col justify-center h-full max-w-7xl mx-auto px-8">
                <h2 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                  {banner.title}
                </h2>
                <p className="text-gray-300 text-xl mb-8">{banner.subtitle}</p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl">
                    <Play className="w-6 h-6 fill-current" /> 立即播放
                  </button>
                  <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === idx ? 'w-10 bg-gradient-to-r from-blue-400 to-cyan-400' : 'w-4 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
