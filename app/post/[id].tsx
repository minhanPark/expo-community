import AuthRoute from "@/components/auth-route";
import CommentItem from "@/components/comment-item";
import FeedItem from "@/components/feed-item";
import InputField from "@/components/input-field";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  // 파라미터에 대한 값을 갖고올 수 있다.
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  if (isPending || isError) return <></>;

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
  };

  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content: content,
    };

    if (parentCommentId) {
      createComment.mutate({ ...commentData, parentCommentId });
      setContent("");
      handleCancelReply();
      return;
    }
    createComment.mutate(commentData);
    setContent("");
    setTimeout(() => {
      // 댓글 등록 후 스크롤을 맨 아래로 이동
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail={true} />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>

            {post.comments?.map((c) => (
              <Fragment key={c.id}>
                <CommentItem
                  comment={c}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(c.id)}
                  onCancelReply={handleCancelReply}
                />
                {c.replies.map((r) => (
                  <CommentItem key={r.id} comment={r} isReply={true} />
                ))}
              </Fragment>
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              onChangeText={(text) => setContent(text)}
              placeholder={
                parentCommentId ? "답글 남기는 중" : "댓글을 남겨보세요."
              }
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              rightChild={
                <Pressable
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}
                >
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
