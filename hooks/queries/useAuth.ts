import { editProfile, getMe, postLogin, postSignup } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { removeHeader, setHeader } from "@/utils/header";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secure-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
  });

  useEffect(() => {
    // useEffect의 함수 자체를 async로 바꾸면 에러가 나서 밑에서 즉시실행 함수로 실행
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);

      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace("/");
    },
    onError: (error: ResponseError) => {
      Toast.show({
        type: "error",
        text1: error.response?.data.message || "로그인에 실패했습니다.",
      });
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: (error) => {
      if (error instanceof AxiosError)
        Toast.show({
          type: "error",
          text1: error.response?.data?.message || "회원가입에 실패했습니다.",
        });
    },
  });
}

function useUpdateProfile() {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData([queryKeys.AUTH, queryKeys.GET_ME], newProfile);
    },
  });
}

export function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupmutation = useSignup();
  const profileMutation = useUpdateProfile();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");

    queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
  };

  return {
    loginMutation,
    signupmutation,
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
      imageUri: data?.imageUri || "",
      introduce: data?.introduce || "",
      hatId: data?.hatId || "",
      handId: data?.handId || "",
      skinId: data?.skinId || "",
      topId: data?.topId || "",
      bottomId: data?.bottomId || "",
      faceId: data?.faceId || "",
    },
    profileMutation,
    logout,
  };
}
