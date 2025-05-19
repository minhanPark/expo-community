import { colors } from "@/constants";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./feed-item";

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: "타이틀 타이틀",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
    createdAt: "2025-01-01",
    author: {
      id: 1,
      nickname: "이름",
      imageUri: "",
    },
    imageUris: [],
    likes: [{ userId: 1 }],
    hasVote: false,
    voteCount: 12,
    commentCount: 12,
    viewCount: 13,
  },
  {
    id: 2,
    userId: 2,
    title: "두번째 타이틀",
    description: "두번째 게시글의 내용입니다. 다양한 정보를 담고 있습니다.",
    createdAt: "2025-01-01",
    author: {
      id: 2,
      nickname: "홍길동",
      imageUri: "",
    },
    imageUris: [],
    likes: [{ userId: 2 }, { userId: 3 }],
    hasVote: true,
    voteCount: 5,
    commentCount: 3,
    viewCount: 20,
  },
  {
    id: 3,
    userId: 3,
    title: "세번째 타이틀",
    description: "세번째 게시글입니다. 테스트용 더미 데이터입니다.",
    createdAt: "2025-01-01",
    author: {
      id: 3,
      nickname: "김철수",
      imageUri: "",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 1,
    viewCount: 7,
  },
  {
    id: 4,
    userId: 4,
    title: "네번째 타이틀",
    description: "네번째 게시글의 예시입니다. 피드 리스트 테스트용입니다.",
    createdAt: "2025-01-01",
    author: {
      id: 4,
      nickname: "박영희",
      imageUri: "",
    },
    imageUris: [],
    likes: [{ userId: 1 }, { userId: 4 }],
    hasVote: true,
    voteCount: 8,
    commentCount: 5,
    viewCount: 15,
  },
];

export default function FeedList() {
  return (
    <FlatList
      data={dummyData}
      renderItem={({ item }) => <FeedItem post={item} />}
      // 리액트에서 key
      keyExtractor={(item) => item.id.toString()}
      // 각 아이템에 스타일 적용됨
      contentContainerStyle={styles.contentContainer}
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
