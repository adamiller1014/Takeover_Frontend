import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { useProjectById } from "../../hooks/useProjectById";
import useStore from "../../store/useStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });
  const joinTakeOver = useStore((state) => state.setJoined);
  const setJoinedAddress = useStore((state) => state.setJoinedAddress);

  useEffect(() => {
    joinTakeOver(false);
    setJoinedAddress(null);
  }, [projectId]);
  if (isError)
    return (
      <p className="flex w-full items-center justify-center py-6 text-red-500">
        {" "}
        Error loading project.
      </p>
    );

  return (
    <div
      className="flex w-full flex-col text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/takeover-detail_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top left",
      }}
    >
      <div
        className={`${
          isLoading ? "h-[calc(100vh-110px)]" : ""
        } overflow-y-auto`}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mx-0 mt-[80px] flex w-full max-w-[1358px] flex-col items-center justify-between px-4 pt-[36px] sm:px-[48px] md:mx-auto md:mt-[124px] md:flex-row md:items-start md:gap-0">
            <Sidebar selectedProject={project} />
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
