import axios from "axios";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { DataItem } from "../types";

const fetchData = async (id: string): Promise<DataItem> => {
  const response = await axios.get<DataItem>(
    `http://localhost:3000/posts/${id}`
  );

  return response.data;
};

const useGetPost = (
  id: string,
  paramType: string,
  paramKey: string
): UseQueryResult<DataItem> => {
  const queryClient = useQueryClient();
  let getCachedData: DataItem[] | undefined;

  if (paramType == "paginate") {
    getCachedData = queryClient.getQueryData([
      "posts",
      { paginate: +paramKey, selectedPostStatus: "all" },
    ]);
  } else {
    getCachedData = queryClient.getQueryData([
      "posts",
      "search",
      { q: paramKey },
    ]);
  }

  return useQuery({
    queryKey: ["posts", { id: +id }],
    queryFn: () => fetchData(id),
    initialData: () => {
      if (!getCachedData) {
        return undefined;
      } else {
        const result = getCachedData.find((el) => el.id == +id);
        return result;
      }
    },
  });
};

export default useGetPost;
