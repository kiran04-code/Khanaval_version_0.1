import { useRef, useState } from "react";

export default function MessImageSwiper({ media }) {
  const images = [media.cover, media.kitchen, media.dining].filter(Boolean);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  if (!images.length) return null;

  return (
    <div
      className="relative h-[320px] overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img
        src={images[current]}
        className="w-full h-full object-cover transition duration-500"
      />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
