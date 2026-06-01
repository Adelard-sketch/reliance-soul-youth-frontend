// Image optimization utilities

export const createOptimizedImageUrl = (src: string, width?: number, quality = 80) => {
  // For now, return original src
  // In production, you'd use a service like Cloudinary or implement WebP conversion
  return src;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void> => {
  try {
    await Promise.all(sources.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Lazy loading intersection observer
export const createLazyLoadObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  );
};