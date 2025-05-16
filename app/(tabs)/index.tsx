import { SafeAreaView } from "react-native-safe-area-context";

import FeedItem from "@/components/feed-item";

export default function Page() {
  return (
    <SafeAreaView>
      <FeedItem
        post={{
          id: 1,
          userId: 1,
          title: "타이틀 타이틀",
          description:
            " lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.",
          createdAt: "",
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
        }}
      />
    </SafeAreaView>
  );
}
