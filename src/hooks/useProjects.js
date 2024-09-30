import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjects = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/projects`
  );
  return data;
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects", "all"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 1, // Data will be considered fresh for 1 minutes
  });
};
