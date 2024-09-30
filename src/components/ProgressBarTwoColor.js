import React from 'react';

const ProgressBarTwoColor = ({ percentage, doneColor, remainColor, showFraction, fractionText, thickness }) => {
    const isLowPercentage = percentage <= 5;

    return (
        <div className="w-full bg-black/30 rounded-full relative" style={{ height: thickness }}>
            {showFraction && (
                <span
                    style={{ left: isLowPercentage ? '8%' : `3%`, lineHeight: thickness }}
                    className={`absolute top-0 text-sm ${isLowPercentage ? 'text-white' : 'text-[#15293D]'}`}>
                    {fractionText}
                </span>
            )}
            <div
                className="rounded-l-full"
                style={{ width: `${percentage}%`, backgroundColor: doneColor, height: '100%' }}
            />
            <div
                className="absolute top-0 right-0 rounded-r-full"
                style={{
                    width: `${100 - percentage}%`,
                    backgroundColor: remainColor,
                    height: '100%',
                    left: `${percentage}%`
                }}
            />
        </div>
    );
};

export default ProgressBarTwoColor;
