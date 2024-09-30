import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSocialActions = async (hastag) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/twitter/getSocialActions`, { hastag }
  );
  return data;
};

export const useSocialAction = (hastag) => {
  return useQuery({
    queryKey: ["sosialAction", hastag], // Unique key for the query
    queryFn: () => fetchSocialActions(hastag), // Function to fetch the data
    staleTime: 1000 * 60 * 15, // Data will be considered fresh for 15 minutes
  });
};
