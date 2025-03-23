import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CommentPost, CommentResponse } from "../types";

const requetsData = async (data: CommentPost): Promise<CommentResponse> => {
  const result = await axios.post(`http://localhost:3000/comments`, data);
  return result.data;
};

const useAddComment = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentPost
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requetsData,
    onMutate: (data) => {
      //old data
      const savedComments = queryClient.getQueryData([
        "comments",
        { post_id: data.post_id },
      ]);

      const newComment = { ...data, id: new Date() };

      queryClient.setQueryData(
        ["comments", { post_id: data.post_id }],
        (comments: CommentResponse[]) => {
          return [newComment, ...comments];
        }
      );

      return () => {
        queryClient.setQueryData(
          ["comments", { post_id: data.post_id }],
          savedComments
        );
      };
    },
    onError: (_, __, rollback) => {
      if (rollback) {
        rollback();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
    },
  });
};

export default useAddComment;
