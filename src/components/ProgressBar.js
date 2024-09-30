import React from 'react';

const ProgressBar = ({ percentage, color, showFraction, fractionText }) => {
    const isLowPercentage = percentage <= 5;

    return (
        <div className="w-full h-5 bg-black/30 rounded-full relative">
            {showFraction && (
                <span
                    style={{ left: isLowPercentage ? '8%' : `3%` }}
                    className={`absolute top-0 text-sm ${isLowPercentage ? 'text-white' : 'text-[#15293D]'}`}>
                    {fractionText}
                </span>
            )}
            <div
                className="h-full rounded-full"
                style={{ width: `${percentage}%`, backgroundColor: color }}
            />
        </div>
    );
};

export default ProgressBar;
