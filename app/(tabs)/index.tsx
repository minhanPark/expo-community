import { SafeAreaView } from "react-native-safe-area-context";

import FeedList from "@/components/feed-list";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function Page() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {auth.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  writeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    // 공통이지만 안드로이드에서는 API 28이상일 때 적용용
    shadowColor: colors.BLACK,
    // ios에서만 적용
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    //
    // 안드로이드를 위해서 추가
    elevation: 2,
  },
});
