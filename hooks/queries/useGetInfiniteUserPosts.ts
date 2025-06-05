import { getUserPosts } from "@/api/post";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetInfiniteUserPosts(userId: number) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getUserPosts(userId, pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS, userId],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}
