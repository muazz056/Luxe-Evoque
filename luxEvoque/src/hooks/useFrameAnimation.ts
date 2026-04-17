'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseFrameAnimationOptions {
  totalFrames: number;
  fps?: number;
  loop?: boolean;
  autoplay?: boolean;
  preloadCount?: number;
}

interface UseFrameAnimationReturn {
  currentFrame: number;
  isPlaying: boolean;
  isLoading: boolean;
  loadedFrames: number;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setFrame: (frame: number) => void;
  preloadedImages: HTMLImageElement[];
}

export function useFrameAnimation({
  totalFrames,
  fps = 24,
  loop = true,
  autoplay = true,
  preloadCount = 10,
}: UseFrameAnimationOptions): UseFrameAnimationReturn {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);
  
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameInterval = 1000 / fps;

  // Animation loop using requestAnimationFrame
  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastTimeRef.current;

    if (elapsed >= frameInterval) {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        if (next >= totalFrames) {
          if (loop) {
            return 0;
          } else {
            setIsPlaying(false);
            return prev;
          }
        }
        return next;
      });
      lastTimeRef.current = timestamp - (elapsed % frameInterval);
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [frameInterval, loop, totalFrames, isPlaying]);

  // Start/stop animation
  useEffect(() => {
    if (isPlaying && !isLoading) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isLoading, animate]);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const frameNum = String(index + 1).padStart(3, '0');
        img.src = `/assets/animations/ezgif-frame-${frameNum}.jpg`;
        
        img.onload = () => {
          loaded++;
          setLoadedFrames(loaded);
          resolve(img);
        };
        
        img.onerror = () => {
          loaded++;
          setLoadedFrames(loaded);
          reject(new Error(`Failed to load frame ${index}`));
        };

        images[index] = img;
      });
    };

    // Load first batch for immediate display
    const initialLoad = Math.min(preloadCount, totalFrames);
    const loadPromises = [];

    for (let i = 0; i < initialLoad; i++) {
      loadPromises.push(loadImage(i));
    }

    Promise.all(loadPromises)
      .then(() => {
        setPreloadedImages(images);
        setIsLoading(false);
        
        // Continue loading remaining frames in background
        for (let i = initialLoad; i < totalFrames; i++) {
          loadImage(i).catch(() => {});
        }
      })
      .catch((error) => {
        console.warn('Error preloading frames:', error);
        setIsLoading(false);
      });

    return () => {
      images.forEach((img) => {
        if (img) {
          img.src = '';
        }
      });
    };
  }, [totalFrames, preloadCount]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setCurrentFrame(0);
    lastTimeRef.current = 0;
  }, []);

  const setFrame = useCallback((frame: number) => {
    setCurrentFrame(Math.max(0, Math.min(frame, totalFrames - 1)));
  }, [totalFrames]);

  return {
    currentFrame,
    isPlaying,
    isLoading,
    loadedFrames,
    play,
    pause,
    reset,
    setFrame,
    preloadedImages,
  };
}

// Hook for scroll-linked frame animation
export function useScrollFrameAnimation(
  containerRef: React.RefObject<HTMLElement>,
  totalFrames: number
) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const containerHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          // Calculate scroll progress through the container
          const scrollStart = windowHeight;
          const scrollEnd = -containerHeight + windowHeight;
          const scrollRange = scrollStart - scrollEnd;
          const currentScrollPosition = scrollStart - rect.top;
          
          const progress = Math.max(0, Math.min(1, currentScrollPosition / scrollRange));
          const frame = Math.floor(progress * (totalFrames - 1));
          
          setCurrentFrame(frame);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, totalFrames]);

  return currentFrame;
}
