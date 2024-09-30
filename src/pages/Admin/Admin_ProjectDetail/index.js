import React from "react";
import Sidebar from "./Sidebar";
import AdminProjectDetailContent from "./Content";
import { useProjectById } from "../../../hooks/useProjectById";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

const AdminProjectDetail = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
  } = useProjectById({ _id: projectId });

  if (isLoading || !project) return <LoadingSpinner />;
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
      <div className="mx-auto mt-[80px] flex w-full max-w-[1358px] flex-col items-start justify-between px-[48px] pt-[36px] md:mt-[124px] md:flex-row md:gap-0">
        <Sidebar selectedProject={project} />
        <AdminProjectDetailContent />
      </div>
    </div>
  );
};

export default AdminProjectDetail;
