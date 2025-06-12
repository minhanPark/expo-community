import AuthRoute from "@/components/auth-route";
import ListItem from "@/components/list-item";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { saveSecureStore } from "@/utils/secure-store";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Octicons from "@expo/vector-icons/Octicons";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { logout } = useAuth();
  const { i18n, t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressLanguage = () => {
    const options = ["English", "한국어", t("Cancel")];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            i18n.changeLanguage("en");
            saveSecureStore("language", "en");
            break;
          case 1:
            i18n.changeLanguage("ko");
            saveSecureStore("language", "ko");
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <AuthRoute>
      <SafeAreaView>
        <View style={styles.space} />
        <ListItem
          title="언어 설정"
          onPress={handlePressLanguage}
          icon={<Octicons name="table" size={16} color={colors.BLACK} />}
        />
        <View style={styles.space} />
        <ListItem
          title="로그아웃"
          onPress={logout}
          icon={<Octicons name="sign-out" size={16} color={colors.BLACK} />}
        />
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
});
