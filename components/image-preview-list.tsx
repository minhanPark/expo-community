import { ImageUri } from "@/types";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

type Props = {
  imageUris: ImageUri[];
};

export default function ImagePreviewList({ imageUris = [] }: Props) {
  return (
    <ScrollView
      // 스크롤을 가로로 만들어줌
      horizontal
      // 스크롤바를 숨김
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${
          Platform.OS === "ios"
            ? "http://localhost:3030"
            : "http://10.0.2.2:3030"
        }/${uri}`;
        console.log("Image URI:", imageUri);
        return (
          <Pressable key={uri + index} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUri }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
