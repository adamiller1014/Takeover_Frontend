import { useEffect, useState } from "react";
import LandingDescription from "./Description";
import ProjectsContainer from "./ProjectsContainer";
import TokenList from "./TokenList";
import Toolbar from "./Toolbar";

const Landing = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState(null);
  const [status, setStatus] = useState(true);

  const SortingTypes = [
    { name: "Global rank", type: "ranking" },
    { name: "Most members", type: "member" },
    { name: "Most burned", type: "burned" },
    { name: "Most actions", type: "actions" },
  ];

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  const handleSortChange = (index) => {
    setSortType(index);
  };
  const handleStatusChange = (s) => {
    setStatus(s);
  };

  return (
    <div
      className="flex w-full flex-col gap-[24px] overflow-auto text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/landing_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <LandingDescription selectedProject={selectedProject} />
      <TokenList
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <Toolbar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onStatusChange={handleStatusChange}
        SortingTypes={SortingTypes}
      />
      <ProjectsContainer
        searchQuery={searchQuery}
        sortType={sortType}
        status={status}
        SortingTypes={SortingTypes}
      />
    </div>
  );
};

export default Landing;
