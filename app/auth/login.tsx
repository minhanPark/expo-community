import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import EmailInput from "@/components/email-input";
import FixedButtonCTA from "@/components/fixed-bitton-cta";
import PasswordInput from "@/components/password-input";
import { useAuth } from "@/hooks/queries/useAuth";

type FormValues = {
  email: string;
  password: string;
};

export default function Page() {
  const { loginMutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    loginMutation.mutate({
      email,
      password,
    });
  };
  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedButtonCTA
        label="로그인 하기"
        onPress={signupForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
