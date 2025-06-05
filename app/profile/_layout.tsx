import { colors } from "@/constants";
import Feather from "@expo/vector-icons/Feather";
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
        name="[id]"
        options={{
          title: "",
          headerShown: true,
          //headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          headerShown: true,
          headerTitle: "프로필 편집",
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
