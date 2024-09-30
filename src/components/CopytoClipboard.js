import React, { useState } from 'react';

const CopytoClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className="p-1 text-sm cursor-pointer rounded-xl bg-black/30 flex gap-1 items-center"
      >
        <img src={`${process.env.PUBLIC_URL}/assets/icons/Copy.svg`}
          alt="Copy" className="w-5 h-5" /> {text}
      </button>

      {copied && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-sm text-white bg-black rounded">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CopytoClipboard;
