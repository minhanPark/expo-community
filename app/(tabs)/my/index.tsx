import AuthRoute from "@/components/auth-route";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>my index</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
