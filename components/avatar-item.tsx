import { colors } from "@/constants";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";

type Props = PressableProps & {
  uri: string;
  isSelected: boolean;
};

export function AvatarItem({ uri, isSelected, ...props }: Props) {
  return (
    <Pressable
      {...props}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <Image
        source={{
          uri: `${
            Platform.OS === "ios"
              ? "http://localhost:3030"
              : "http://10.0.2.2:3030"
          }/${uri}`,
        }}
        style={styles.image}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    // 화면 크기를 가져와서 조절 가능
    width: Dimensions.get("window").width / 3 - 15,
    height: Dimensions.get("window").width / 3 - 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.GRAY_200,
  },
  selectedContainer: {
    borderColor: colors.ORANGE_600,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
