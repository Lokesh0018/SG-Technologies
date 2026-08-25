import { useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import './SwipeableItem.css';

interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete: () => void;
  deleteThreshold?: number;
}

const SwipeableItem = ({ children, onDelete, deleteThreshold = -80 }: SwipeableItemProps) => {
  const controls = useAnimation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // If dragged past threshold or swiped fast enough to the left
    if (offset < deleteThreshold || velocity < -500) {
      setIsDeleting(true);
      await controls.start({ x: -window.innerWidth, opacity: 0, transition: { duration: 0.3 } });
      onDelete();
    } else {
      // Snap back to original position
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    }
  };

  return (
    <div className="swipeable-container">
      <div className="swipeable-background">
        <div className="swipeable-action">
          <Trash2 size={24} color="white" />
        </div>
      </div>
      <motion.div
        className="swipeable-content"
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -window.innerWidth, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ cursor: 'grabbing' }}
        style={{ touchAction: 'pan-y' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SwipeableItem;
