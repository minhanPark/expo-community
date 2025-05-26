import AuthRoute from "@/components/auth-route";
import FeedItem from "@/components/feed-item";
import InputField from "@/components/input-field";
import { colors } from "@/constants";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  // 파라미터에 대한 값을 갖고올 수 있다.
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));

  if (isPending || isError) return <></>;

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail={true} />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              rightChild={
                <Pressable style={styles.inputButtonContainer}>
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  commentInputContainer: {
    width: "100%",
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    padding: 16,
    bottom: 0,
    position: "absolute",
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
});
