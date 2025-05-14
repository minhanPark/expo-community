import { SafeAreaView, Text } from "react-native";

import CustomButton from "@/components/custom-button";

export default function Page() {
  return (
    <SafeAreaView>
      <Text>홈</Text>
      <CustomButton label="텍스트" />
    </SafeAreaView>
  );
}
