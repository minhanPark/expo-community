import CustomButton from "@/components/custom-button";
import FixedButtonCTA from "@/components/fixed-bitton-cta";
import IntroduceInput from "@/components/introduce-input";
import NicknameInput from "@/components/nickname-input";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Platform, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type FormValues = {
  nickname: string;
  introduce: string;
};

export default function ProfileUpdate() {
  const { auth, profileMutation } = useAuth();
  const profileForm = useForm({
    values: {
      nickname: auth.nickname || "",
      introduce: auth.introduce || "",
    },
  });
  const onSubmit = (formValues: FormValues) => {
    profileMutation.mutate(formValues, {
      onSuccess() {
        Toast.show({
          type: "success",
          text1: "저장되었습니다.",
        });
      },
    });
  };
  return (
    <FormProvider {...profileForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              auth.imageUri
                ? {
                    uri: `${
                      Platform.OS === "ios"
                        ? "http://localhost:3030"
                        : "http://10.0.2.2:3030"
                    }/${auth.imageUri}`,
                  }
                : require("@/assets/images/default-avatar.png")
            }
            style={styles.avatar}
          />
          <CustomButton
            size="medium"
            variant="outlined"
            label="아바타 변경"
            style={{ position: "absolute", right: 0, bottom: 0 }}
            onPress={() => router.push("/profile/avatar")}
          />
        </View>
        <View style={styles.inputContainer}>
          <NicknameInput />
          <IntroduceInput />
        </View>
      </View>

      <FixedButtonCTA
        label="저장"
        onPress={profileForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 16,
    position: "relative",
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  inputContainer: {
    gap: 16,
  },
});
