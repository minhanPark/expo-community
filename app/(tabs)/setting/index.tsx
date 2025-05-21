import AuthRoute from "@/components/auth-route";
import CustomButton from "@/components/custom-button";
import { useAuth } from "@/hooks/queries/useAuth";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>세팅</Text>
        <CustomButton label="로그아웃" onPress={logout} />
      </SafeAreaView>
    </AuthRoute>
  );
}
