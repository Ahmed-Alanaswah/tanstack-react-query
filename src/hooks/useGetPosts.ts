import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem, postStatusType } from "../types";

export const fetchPosts = async (
  selectedPostStatus: postStatusType,
  paginate: number
): Promise<DataItem[]> => {
  if (selectedPostStatus == "all") {
    const result = await axios.get<DataItem[]>(
      `http://localhost:3000/posts?_page=${paginate}&_limit=5`
    );
    return result.data;
  } else {
    const result = await axios.get<DataItem[]>(
      `http://localhost:3000/posts?status=${selectedPostStatus}`
    );
    return result.data;
  }
};

const useGetPosts = (
  selectedPostStatus: postStatusType,
  paginate: number
): UseQueryResult<DataItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus, paginate }],
    queryFn: () => fetchPosts(selectedPostStatus, paginate),
    staleTime: 1000 * 10,
    refetchInterval: 15 * 1000,
  });
  return query;
};

export default useGetPosts;
