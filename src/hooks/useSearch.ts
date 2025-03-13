import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem } from "../types";

const fetchData = async (q: string): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>(
    `http://localhost:3000/posts?q=${q}`
  );

  return response.data;
};
const useSearch = (q: string): UseQueryResult<DataItem[]> => {
  return useQuery({
    queryKey: ["posts", "search", { q }],
    queryFn: () => fetchData(q),
    // staleTime: 5 * 60 * 1000,
    enabled: q.length > 0,
  });
};

export default useSearch;
