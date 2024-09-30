import React, { useState, useRef, useEffect } from "react";

const ProgressSlider = ({ progressChanging, initialValue = 0 }) => {
  const [progress, setProgress] = useState(initialValue);
  const sliderRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    progressChanging(progress);
  }, [progress]);

  const handleMouseMove = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        Math.max(0, e.clientX - rect.left),
        rect.width
      );
      setProgress((newProgress / rect.width) * 100);
    }
  };

  const handleMouseDown = (e) => {
    updateProgress(e);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const updateProgress = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        Math.max(0, e.clientX - rect.left),
        rect.width
      );
      setProgress((newProgress / rect.width) * 100);
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative my-[11px] h-3 w-full cursor-pointer rounded-full bg-black bg-opacity-30"
      onMouseDown={handleMouseDown}
      onClick={updateProgress} // Update progress on click
    >
      <div
        className="h-full rounded-full bg-[#FF8A00] bg-opacity-75"
        style={{ width: `${progress}%` }}
      />
      <div
        ref={handleRef}
        className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-[#FF8A00]"
        style={{ left: `${progress}%` }}
        onMouseDown={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default ProgressSlider;
