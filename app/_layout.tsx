import { queryClient } from "@/api/queryClient";
import { useAuth } from "@/hooks/queries/useAuth";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
// 안드로이드에서만 사용할 수 있는 토스트가 제공되지만 ios도 공통적으로 사용하려고 아래 라이브러리 설치
import Toast from "react-native-toast-message";
// 기본적으로 제공되는 ActionSheet는 ios에서만 있어서 공통적으로 사용할 수 있는 action sheet를 설치
import { getSecureStore } from "@/utils/secure-store";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { getLocales } from "expo-localization";
import * as Notifications from "expo-notifications";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

// expo-notifications는 사용자의 권한을 요청하고 푸시 알림을 전송하기 위한 엑스포 푸시 토큰을 얻는데 사용됨
// expo-device는 앱이 실제 기기에서 실행 중인지 확인하는 데 사용
// expo-constants는 앱 구성에서 projectId 값을 가져오는데 사용
// 레이아웃에 docs에서 갖고온 setNotificationHandler을 넣어준다.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

const deviceLanguage = getLocales()[0].languageCode ?? "ko";

const resources = {
  en: {
    translation: {
      Home: "Home",
      Profile: "Profile",
      Setting: "Setting",
      Cancel: "Cancel",
      // 변수가 들어가는 문장을 다국어로 변환할 때 아래처럼 해서 변수 넣어주기
      "Welcome Message": "Welcome, {{nickname}}",
    },
  },
  ko: {
    translation: {
      Home: "홈",
      Profile: "내 프로필",
      Setting: "설정",
      Cancel: "취소",
      // 변수가 들어가는 문장을 다국어로 변환할 때 아래처럼 해서 변수 넣어주기
      "Welcome Message": "{{nickname}}님, 환영합니다.",
    },
  },
};

// 다국어 적용하는 초기함수
i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: "ko-Kr",
});

function RootNavigation() {
  const { auth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        // 변수가 들어가는 문장을 다국어로 변환할 때 아래처럼 해서 변수 넣어주기
        text1: t("Welcome Message", { nickname: auth.nickname ?? "회원" }),
      });
  }, [auth.id, auth.nickname, t]);

  useEffect(() => {
    (async () => {
      const savedLanguage =
        (await getSecureStore("language")) ?? deviceLanguage;
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    })();
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
    </Stack>
  );
}
