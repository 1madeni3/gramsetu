import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 5, reviewsCount, showCount = true, size = "sm" }) => {
  const numRating = Number(rating) || 5;
  const isSm = size === "sm";
  const starClass = isSm ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-[#F4B942]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starClass} ${
              star <= Math.round(numRating)
                ? 'fill-[#F4B942] text-[#F4B942]'
                : 'text-stone-300'
            }`}
          />
        ))}
      </div>
      <span className={`font-semibold text-stone-800 ${isSm ? 'text-xs' : 'text-sm'}`}>
        {numRating.toFixed(1)}
      </span>
      {showCount && reviewsCount !== undefined && (
        <span className={`text-stone-500 ${isSm ? 'text-xs' : 'text-xs'}`}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
