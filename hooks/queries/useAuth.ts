import { getMe, postLogin, postSignup } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { removeHeader, setHeader } from "@/utils/header";
import { deleteSecureStore, saveSecureStore } from "@/utils/secure-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);

      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {
      // 에러 처리에 사용
    },
  });
}

export function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupmutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");

    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    loginMutation,
    signupmutation,
    auth: { id: data?.id || "", nickname: data?.nickname || "" },
    logout,
  };
}
