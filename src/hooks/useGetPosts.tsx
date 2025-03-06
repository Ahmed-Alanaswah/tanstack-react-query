import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "blocked";
  topRate: boolean;
}

const fetchPosts = async (): Promise<DataItem[]> => {
  const result = await axios.get<DataItem[]>("http://localhost:3000/posts");
  return result.data;
};

const useGetPosts = (): UseQueryResult<DataItem[]> => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 10,
  });
  return query;
};

export default useGetPosts;
