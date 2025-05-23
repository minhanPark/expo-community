import { colors } from "@/constants";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import type { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  onPress: () => void;
  nickname: string;
  imageUri?: string;
  createdAt: string;
  option?: ReactNode;
};

export default function Profile({
  onPress,
  imageUri,
  nickname,
  createdAt,
  option,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.profileContainer}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/default-avatar.png")
          }
          style={styles.avatar}
        />
        <View>
          <View style={{ gap: 4 }}>
            <Text style={styles.nickname}>{nickname}</Text>
            <Text style={styles.createdAt}>{dayjs(createdAt).fromNow()}</Text>
          </View>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
  },
  nickname: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  createdAt: {
    fontSize: 14,
  },
});
