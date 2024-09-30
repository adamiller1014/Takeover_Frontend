import React from "react";
import Board from "../../../components/Board";

const Sidebar = ({ selectedProject }) => {
  return (
    <div className="flex w-11/12 flex-col gap-6 md:w-[35%]">
      <Board className="flex flex-col items-center py-5">
        <div className="flex w-full justify-start px-5">
          <div className="flex w-40 items-center justify-start gap-1 rounded-full bg-gradient-to-r from-[#00FF8C6a] to-[#ffffff01] px-2 py-1">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/2568 members.svg`}
              alt="Main Token"
              className="h-5 w-4 rounded-full"
            />
            <span>
              {selectedProject.joinedMembers.length.toLocaleString()} members
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 p-12">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/avatars/${selectedProject.avatar}`}
            className="h-60 w-60 rounded-full"
            alt="Selected Project Avatar"
          />
          <span className="text-2xl font-bold">
            {selectedProject.projectName}
          </span>
          <p className="text-sm">{selectedProject.description}</p>
          <div className="flex w-full gap-3">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
              alt="X"
              className="h-6 w-6"
            />
            <span>
              <a
                href={selectedProject.projectSocials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @{selectedProject.projectSocials.twitter.split("/").pop()}
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
                href={selectedProject.projectSocials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {selectedProject.projectSocials.telegram.split("/").pop()}
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
                href={selectedProject.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {selectedProject.officialWebsite.split("/").pop()}
              </a>
            </span>
          </div>
        </div>
      </Board>
      <Board className="flex justify-between p-4 md:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-xs text-[#56B0B9]">current price</span>
          <span className="font-bold">$0.00025</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-xs text-[#56B0B9]">market cap</span>
          <span className="font-bold">$24.524M</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-xs text-[#56B0B9]">24H volume</span>
          <span className="font-bold">$35,354</span>
        </div>
      </Board>
    </div>
  );
};

export default Sidebar;
