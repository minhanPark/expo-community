import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, router } from "expo-router";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "로그인",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.replace("/")}>
              <Ionicons name="home" size={28} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "이메일 로그인",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "회원가입",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
