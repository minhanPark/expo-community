import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/custom-button";

export default function Page() {
  return (
    <SafeAreaView>
      <Text>홈</Text>
      <CustomButton label="텍스트" />
    </SafeAreaView>
  );
}
