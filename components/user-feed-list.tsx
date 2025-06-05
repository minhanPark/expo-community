import { colors } from "@/constants";
import { useGetInfiniteUserPosts } from "@/hooks/queries/useGetInfiniteUserPosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FeedItem from "./feed-item";

type Props = {
  userId: number;
};

export default function UserFeedList({ userId }: Props) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  // useRef를 사용해서 flatlist에 연결하고 useScrollToTop에 ref를 전달하면 네비게이션 아이콘 눌렀을 때 맨 위로 이동한다.
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteUserPosts(userId);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      // 리액트에서 key
      keyExtractor={(item) => item.id.toString()}
      // 각 아이템에 스타일 적용됨
      contentContainerStyle={styles.contentContainer}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      // 비어있을 때 보여줄 폴백 컴포넌트를 넣을 수 있음
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>작성한 글이 없습니다.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    alignItems: "center",
  },
});
