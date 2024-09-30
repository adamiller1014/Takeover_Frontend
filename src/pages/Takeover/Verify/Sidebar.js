import React from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
const Sidebar = () => {
  const navigation = useNavigate();
  const editedProjectInfo = useStore((state) => state.editedProjectInfo);
  return (
    <div className="flex w-10/12 flex-col gap-6 sm:w-8/12 md:w-[35%]">
      <Board className="flex flex-col items-center py-3 sm:py-5">
        <div className="flex w-full justify-start px-3 sm:px-5">
          <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#00FF8C6a] to-[#ffffff01] px-2 py-1">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/2568 members.svg`}
              alt="Main Token"
              className="h-5 w-4 rounded-full"
            />
            <span>
              {editedProjectInfo.joinedMembers?.length.toLocaleString()} members
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 p-4 sm:p-8 md:p-12 w-full">
          <img
            src={`${editedProjectInfo.avatar_preview}`}
            className="h-60 w-60 rounded-full"
            alt="Selected Project Avatar"
          />
          <span className="text-2xl font-bold">
            {editedProjectInfo.projectName}
          </span>
          <span className="text-sm  text-wrap w-full h-auto overflow-auto">
            {truncateText(editedProjectInfo.description, 100)}
          </span>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={editedProjectInfo.projectSocials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @{editedProjectInfo.projectSocials.twitter.split("/").pop()}
              </a>
            </span>
          </div>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/telegram.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={editedProjectInfo.projectSocials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {editedProjectInfo.projectSocials.telegram.split("/").pop()}
              </a>
            </span>
          </div>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/Website.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={editedProjectInfo.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {editedProjectInfo.officialWebsite.split("/").pop()}
              </a>
            </span>
          </div>
          {/* <Button
            width="full"
            isCapitalized={false}
            onClick={() => {}}
            label={
              <span className="flex gap-3">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/solar_add-square-linear.svg`}
                  alt="X"
                  className="h-6 w-6"
                />
                Join Takeover
              </span>
            }
          /> */}
        </div>
      </Board>
      <Board className="flex flex-col justify-between p-4 sm:flex-row md:px-6 lg:px-10">
        <div className="flex flex-row items-center justify-center gap-6 sm:flex-col sm:gap-2">
          <span className="text-xs text-[#56B0B9]">current price</span>
          <span className="font-bold">$0.00025</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-6 sm:flex-col sm:gap-2">
          <span className="text-xs text-[#56B0B9]">market cap</span>
          <span className="font-bold">$24.524M</span>
        </div>
        <div className="flex flex-row items-center justify-center gap-6 sm:flex-col sm:gap-2">
          <span className="text-xs text-[#56B0B9]">24H volume</span>
          <span className="font-bold">$35,354</span>
        </div>
      </Board>
    </div>
  );
};

export default Sidebar;
