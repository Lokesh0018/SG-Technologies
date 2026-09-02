import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import './PullToRefresh.css';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh = ({ onRefresh, children }: PullToRefreshProps) => {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const maxPullDistance = 100;
  const refreshThreshold = 70;
  const controls = useAnimation();

  useEffect(() => {
    if (isRefreshing) {
      controls.start({ y: refreshThreshold, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    } else if (!isPulling) {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  }, [isRefreshing, isPulling, controls]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY > 0 || isRefreshing) return;
    startY.current = e.touches[0].clientY;
    setIsPulling(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;
    
    if (distance > 0) {
      // Add resistance to the pull
      const resistedDistance = distance * 0.5;
      const limitedDistance = Math.min(resistedDistance, maxPullDistance);
      setPullDistance(limitedDistance);
      controls.set({ y: limitedDistance });
      
      // Prevent default scrolling when pulling down
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (!isPulling || isRefreshing) return;
    setIsPulling(false);

    if (pullDistance >= refreshThreshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  return (
    <div 
      className="ptr-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ptr-indicator" style={{ height: refreshThreshold }}>
        <motion.div
          animate={{ 
            rotate: isRefreshing ? 360 : (pullDistance / refreshThreshold) * 180,
            scale: isRefreshing ? 1 : Math.min(pullDistance / refreshThreshold, 1)
          }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: 'linear' } : { duration: 0 }}
          className="ptr-icon-wrapper"
        >
          <RefreshCw size={24} color="var(--text-secondary)" />
        </motion.div>
      </div>
      <motion.div animate={controls} className="ptr-content">
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
