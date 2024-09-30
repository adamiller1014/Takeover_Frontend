import Board from "../../components/Board";
import formatNumber from "../../utils/FormatNumber";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ProjectsContainer = ({ searchQuery, sortType, status, SortingTypes }) => {
  const navigation = useNavigate();
  const { data: projects, isLoading, isError } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    if (projects) {
      let filtered = projects;

      filtered.map((project) => {
        project["member"] = project["joinedMembers"].length;
        return project;
      });

      filtered = filtered.filter((project) => {
        if (status && project.status === "active") {
          return true;
        }
        if (!status && project.status === "inactive") {
          return true;
        }
        return false;
      });

      if (sortType !== null) {
        filtered = filtered.sort((a, b) => {
          const sorting = SortingTypes[sortType].type;
          if (sorting === "ranking") {
            return a[sorting] - b[sorting];
          }
          return b[sorting] - a[sorting];
        });
      }

      if (searchQuery) {
        filtered = filtered.filter((project) =>
          project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredProjects(filtered);
    }
  }, [projects, status, sortType, searchQuery, SortingTypes]);

  return (
    <div className="mx-auto flex w-full max-w-[1358px] flex-wrap justify-start gap-x-5 pl-12 pr-7">
      {isError ? (
        <p className="flex w-full items-center justify-center py-6 text-red-500">
          {" "}
          Error loading projects.
        </p>
      ) : isLoading || !projects ? (
        <LoadingSpinner />
      ) : (
        filteredProjects.map((project, index) => (
          <Board
            key={index}
            className="my-4 flex w-[calc(100%-1rem)] flex-col justify-between gap-3 rounded-lg p-2 shadow-md sm:w-[calc(50%-1rem)] md:w-[calc(33.3%-1rem)] lg:w-[calc(25%-1.25rem)]"
          >
            <div className="flex w-full justify-end gap-2 text-sm font-bold">
              <p className="mb-1 flex gap-1 rounded-full bg-[#FFCEAA] px-3 py-1 text-[#CC4106]">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/250k burned.svg`}
                  alt="Main Token"
                  className="h-5 w-4 rounded-full"
                />
                {formatNumber(project.burned)}
              </p>
              <p className="mb-1 flex gap-1 rounded-full bg-[#96FFCF] px-3 py-1 text-[#065F46]">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/2568 members.svg`}
                  alt="Main Token"
                  className="h-5 w-4 rounded-full"
                />
                {project.joinedMembers.length.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between gap-5 p-2">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/avatars/${project.avatar}`}
                alt={project.projectName}
                className="mb-4 h-16 w-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h2 className="mb-2 text-sm font-semibold">
                  {project.projectName}
                </h2>
                <p className="mb-2 text-sm">
                  {truncateText(project.description, 100)}
                </p>
              </div>
            </div>
            <Button
              width="full"
              label={
                <span className="flex items-center justify-center gap-3">
                  {" "}
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/icons/Group.svg`}
                    alt="Group Icon"
                  />{" "}
                  Takeover Details
                </span>
              }
              onClick={() => {
                navigation(`details/${project._id}`);
              }}
            />
          </Board>
        ))
      )}
    </div>
  );
};

export default ProjectsContainer;
