import React, { useState, useEffect } from "react";
import { useProjects } from "../../hooks/useProjects";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const TokenList = ({ setSelectedProject, selectedProject }) => {
  const { data: projects, isLoading, isError } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);
  useEffect(() => {
    if (!isLoading && projects)
      setFilteredProjects(
        projects?.filter((project) => {
          if (project?.status === "active") {
            return true;
          }
          if (!project?.status === "inactive") {
            return true;
          }
          return false;
        })
      );
  }, [isLoading, projects]);

  useEffect(() => {
    if (selectedProject === null && filteredProjects.length > 0)
      setSelectedProject(filteredProjects[0]);
  }, [filteredProjects, selectedProject]);

  if (isError)
    return (
      <p className="flex w-full items-center justify-center py-6 text-red-500">
        {" "}
        Error loading projects.
      </p>
    );

  return (
    <div className="mx-auto flex w-full max-w-[1358px] flex-wrap justify-start gap-x-14 px-[48px]">
      {isLoading || !projects ? (
        <LoadingSpinner />
      ) : (
        filteredProjects.map((project, index) => (
          <img
            key={index}
            onClick={() => {
              setSelectedProject(project);
            }}
            src={`${process.env.REACT_APP_BACKEND_URL}/images/avatars/${project.avatar}`}
            alt={project.projectName}
            className={`w-16 h-16 rounded-full mb-4 hover:opacity-40 transition-all cursor-pointer border-4 ${
              selectedProject?._id === filteredProjects[index]?._id
                ? "border-green-600"
                : "border-[#00000000] drop-shadow-lg shadow-[#96FFCF] "
            }`}
          />
        ))
      )}
    </div>
  );
};

export default TokenList;
