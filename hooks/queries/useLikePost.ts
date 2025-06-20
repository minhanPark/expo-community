import { likePost } from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    // onSuccess: (postId) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    //   });
    //   queryClient.invalidateQueries({
    //     queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
    //   });
    // },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);
      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);

      const newPost = { ...previousPost };
      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;

      if (likedIndex >= 0) {
        newPost.likes?.splice(likedIndex, 1);
      } else {
        newPost.likes?.push({ userId });
      }

      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost
      );
      return { previousPost, newPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.previousPost?.id],
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST],
      });
    },
  });
}
