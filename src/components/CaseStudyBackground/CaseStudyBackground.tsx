import React, { useEffect, useRef, useState } from 'react';
import './CaseStudyBackground.css';

interface CaseStudyBackgroundProps {
  scrollProgress: number; // 0 to 1
  framePath: string; // The prefix path for the frames e.g., '/wlakie talkie/walkie talkie/ezgif-frame-'
}

const FRAME_COUNT = 300;

const CaseStudyBackground: React.FC<CaseStudyBackgroundProps> = ({ scrollProgress, framePath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const index = i.toString().padStart(3, '0');
      img.src = `${framePath}${index}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, []);

  // Draw frame on canvas based on scroll progress
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Calculate which frame to show
    let frameIndex = Math.floor(scrollProgress * (FRAME_COUNT - 1));
    frameIndex = Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));

    const currentImage = images[frameIndex];

    if (currentImage && currentImage.complete && currentImage.naturalWidth > 0) {
      // Ensure canvas dimensions match image dimensions to avoid blurriness
      if (canvas.width !== currentImage.naturalWidth) {
        canvas.width = currentImage.naturalWidth;
        canvas.height = currentImage.naturalHeight;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    }
  }, [scrollProgress, images]);

  return (
    <div className="case-study-background">
      <div className="case-study-background-inner">
        {loadedCount < FRAME_COUNT * 0.1 && (
          <div className="loading-indicator">
            Loading Cinematic Experience...
          </div>
        )}
        <canvas ref={canvasRef} className="case-study-canvas" />
      </div>
    </div>
  );
};

export default CaseStudyBackground;
