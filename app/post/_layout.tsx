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
        name="write"
        options={{
          title: "글쓰기",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.replace("/")}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
