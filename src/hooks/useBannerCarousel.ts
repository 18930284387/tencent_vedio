import { useState, useEffect, useCallback } from 'react';

export function useBannerCarousel(bannerCount: number, interval = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerCount);
    }, interval);
    return () => clearInterval(timer);
  }, [bannerCount, interval]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerCount);
  }, [bannerCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerCount) % bannerCount);
  }, [bannerCount]);

  return { currentSlide, nextSlide, prevSlide };
}