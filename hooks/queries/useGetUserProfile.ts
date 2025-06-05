import { getUserProfile } from "@/api/auth";
import { queryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserProfile(id: number) {
  return useQuery({
    queryFn: () => getUserProfile(id),
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER_PROFILE, id],
  });
}
