import React, { useState } from "react";
import Button from "./Button";
// import axios from 'axios';

const FileUpload = ({ onFileUpload, initialImage = null }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImage);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileUpload(reader.result, file);
      };
      reader.readAsDataURL(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileUpload(reader.result, file);
      };
      reader.readAsDataURL(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-md">
      <div
        className={`border-2 border-dashed rounded-lg p-6 border-[#00FF8C] text-center cursor-pointer transition-all duration-200 ${
          isDragging ? "bg-black bg-opacity-30" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {previewUrl ? (
          <div className="flex justify-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-auto max-w-full rounded"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/upload.png`}
              alt="upload"
            />
            <div className="mt-2 flex flex-col items-center md:flex-row">
              <div className="flex w-fit cursor-pointer items-center justify-center rounded-md bg-[#00FF8C] p-1 font-bold text-black transition-all hover:opacity-45">
                Upload a file
              </div>
              <p className="pl-2">or drag and drop</p>
            </div>
            <p className="text-[#56B0B9]">PNG or JPG up to 10MB</p>
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};

export default FileUpload;
