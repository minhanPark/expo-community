import { colors } from "@/constants";
import { useGetInfiniteSearchPosts } from "@/hooks/queries/useGetInfiniteSearchPosts";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Platform, StatusBar, StyleSheet, View } from "react-native";
import FeedItem from "./feed-item";
import SearchInput from "./search-input";

export default function SearchFeedList() {
  const [keyword, setKeyword] = useState("");
  const [submitKeyword, setSubmitKeyword] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  } = useGetInfiniteSearchPosts(submitKeyword);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.arrowLeft}>
          <Feather
            name="arrow-left"
            size={28}
            color={colors.BLACK}
            onPress={() => router.back()}
          />
        </View>
        <SearchInput
          autoFocus
          value={keyword}
          onChangeText={setKeyword}
          onSubmit={() => setSubmitKeyword(keyword)}
          onSubmitEditing={() => setSubmitKeyword(keyword)}
          placeholder="글 제목 검색"
        />
      </View>
      <FlatList
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
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
    paddingHorizontal: 16,
    gap: 8,
    height: 44,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    // StatusBar.currentHeight를 통해서 상태바의 높이도 확인할 수 있는 듯 하다.
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  arrowLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
