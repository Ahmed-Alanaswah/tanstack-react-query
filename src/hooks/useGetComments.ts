import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { CommentResponse } from "../types";

const fetchData = async (
  post_id: string,
  signal: AbortSignal
): Promise<CommentResponse[]> => {
  const result = await axios.get<CommentResponse[]>(
    `http://localhost:3000/comments?post_id=${post_id}&_sort=id&_order=desc`,
    { signal }
  );

  return result.data;
};

const useGetComments = (post_id: string): UseQueryResult<CommentResponse[]> => {
  return useQuery({
    queryKey: ["comments", { post_id: +post_id }],
    queryFn: ({ signal }) => fetchData(post_id, signal),
  });
};

export default useGetComments;
