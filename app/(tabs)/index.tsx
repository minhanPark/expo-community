import { SafeAreaView } from "react-native-safe-area-context";

import FeedList from "@/components/feed-list";
import { StyleSheet } from "react-native";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
