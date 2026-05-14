import { useEffect, useState } from 'react'

export function useCarousel(totalSlides: number, interval = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (totalSlides <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % totalSlides)
    }, interval)

    return () => window.clearInterval(timer)
  }, [interval, totalSlides])

  const nextSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide - 1 + totalSlides) % totalSlides)
  }

  return {
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide,
  }
}
