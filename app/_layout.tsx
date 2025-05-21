import { queryClient } from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
// 안드로이드에서만 사용할 수 있는 토스트가 제공되지만 ios도 공통적으로 사용하려고 아래 라이브러리 설치
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast />
    </QueryClientProvider>
  );
}

function RootNavigation() {
  const { auth } = useAuth();

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: `${auth.nickname ?? "회원"}님 환영합니다.`,
      });
  }, [auth.id, auth.nickname]);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
