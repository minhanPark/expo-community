import AuthRoute from "@/components/auth-route";
import CustomButton from "@/components/custom-button";
import LikedFeedList from "@/components/liked-feed-list";
import MyFeedList from "@/components/my-feed-list";
import Tab from "@/components/tab";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Screen() {
  const { auth } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };
  return (
    <AuthRoute>
      <View style={styles.header}>
        <Image
          source={
            auth.imageUri
              ? {
                  uri: `${
                    Platform.OS === "ios"
                      ? "http://localhost:3030"
                      : "http://10.0.2.2:3030"
                  }`,
                }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
        <CustomButton
          size="medium"
          variant="outlined"
          label="프로필 편집"
          style={{ position: "absolute", right: 16, bottom: 16 }}
          onPress={() => router.push("/profile/update")}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{auth.nickname}</Text>
          <Text style={styles.introduce}>{auth.introduce}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <Tab isActive={currentTab === 0} onPress={() => handlePressTab(0)}>
          게시물
        </Tab>
        <Tab isActive={currentTab === 1} onPress={() => handlePressTab(1)}>
          좋아한 게시물
        </Tab>
      </View>
      <PagerView
        ref={pagerRef}
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
      >
        {/* key를 입력해야 하는데 1/2로 한게 의도적인지(탭을 숫자로 넣었으니) 아닌지 모르겠음*/}
        <MyFeedList key="1" />
        <LikedFeedList key="2" />
      </PagerView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 154,
  },
  avatar: {
    position: "absolute",
    top: 77,
    left: 16,
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  container: {
    marginTop: 77,
  },
  profile: {
    padding: 16,
    gap: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  introduce: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
  },
});
