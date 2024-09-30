import { useState } from "react";
import AdminProjectsContainer from "./ProjectsContainer";
import Toolbar from "./Toolbar";

const AdminDirectory = () => {
  const [statusFilters, setStatusFilters] = useState({
    isActive: false,
    isInactive: false,
    isPending: false,
  });

  const [sortType, setSortType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const SortingTypes = [
    { name: "Global rank", type: "ranking" },
    { name: "Most members", type: "member" },
    { name: "Most burned", type: "burned" },
    { name: "Most actions", type: "actions" },
  ];

  const handleStatusChange = (filters) => {
    setStatusFilters(filters);
  };

  const handleSortChange = (index) => {
    setSortType(index);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div
      className="mt-24 flex h-[calc(100vh-210px)] w-full flex-col gap-[24px] overflow-y-auto text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Toolbar
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
        SortingTypes={SortingTypes}
      />
      <AdminProjectsContainer
        statusFilters={statusFilters}
        sortType={sortType}
        searchQuery={searchQuery}
        SortingTypes={SortingTypes}
      />
    </div>
  );
};

export default AdminDirectory;
