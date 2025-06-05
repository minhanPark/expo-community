import { getMyPosts } from "@/api/post";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetInfiniteMyPosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMyPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS, queryKeys.GET_MY_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}
