import { colors } from "@/constants";
import { useGetInfiniteLikedPosts } from "@/hooks/queries/useGetInfiniteLikedPosts";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./feed-item";

export default function LikedFeedList() {
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
  } = useGetInfiniteLikedPosts();

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
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
