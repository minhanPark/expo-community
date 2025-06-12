import { SafeAreaView } from "react-native-safe-area-context";

import FeedList from "@/components/feed-list";
import SearchInput from "@/components/search-input";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function Page() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <SearchInput
          readOnly
          placeholder="글 제목 검색"
          onPress={() => router.push("/post/search")}
        />
      </View>
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
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    // StatusBar.currentHeight를 통해서 상태바의 높이도 확인할 수 있는 듯 하다.
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    height: 44,
    width: 44,
  },
});
