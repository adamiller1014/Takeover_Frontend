import React, { useState } from "react";

const AvatarWithChangeButton = ({ initialAvatar, onAvatarChange }) => {
  const [avatar, setAvatar] = useState(initialAvatar);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        onAvatarChange(reader.result, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex w-[60%] items-center">
      <img
        src={avatar}
        alt="Avatar"
        className="mr-5 h-12 w-12 rounded-full object-cover"
      />
      <label className="flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#00FF8C] px-[17px] py-[9px] font-bold text-black transition-all hover:opacity-45">
        Change
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AvatarWithChangeButton;
