import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DataItem, postStatusType } from "../types";
const fetchPosts = async (
  selectedPostStatus: postStatusType
): Promise<DataItem[]> => {
  if (selectedPostStatus == "all") {
    const result = await axios.get<DataItem[]>("http://localhost:3000/posts");
    return result.data;
  } else {
    const result = await axios.get<DataItem[]>(
      `http://localhost:3000/posts?status=${selectedPostStatus}`
    );
    return result.data;
  }
};

const useGetPosts = (
  selectedPostStatus: postStatusType
): UseQueryResult<DataItem[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus }],
    queryFn: () => fetchPosts(selectedPostStatus),
    staleTime: 1000 * 10,
  });
  return query;
};

export default useGetPosts;
