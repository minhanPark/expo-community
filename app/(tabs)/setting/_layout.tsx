import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.GRAY_200 },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "세팅", headerShown: false }}
      />
    </Stack>
  );
}
