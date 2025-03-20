import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface CommentPost {
  body: string;
  post_id: number;
}

interface CommentResponse {
  id: number;
  body: string;
  post_id: number;
}

const requetsData = async (data: CommentPost): Promise<CommentResponse> => {
  const result = await axios.post(`http://localhost:3000/comments`, data);
  return result.data;
};

const useAddComment = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentPost
> => {
  return useMutation({
    mutationFn: requetsData,
    onSuccess: () => {
      console.log("added");
    },
  });
};

export default useAddComment;
