import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import EmailInput from "@/components/email-input";
import FixedButtonCTA from "@/components/fixed-bitton-cta";
import PasswordConfirmInput from "@/components/password-confirm-input";
import PasswordInput from "@/components/password-input";
import { useAuth } from "@/hooks/queries/useAuth";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Page() {
  const { signupmutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (formValues: FormValues) => {
    signupmutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
  };
  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
        <PasswordConfirmInput />
      </View>
      <FixedButtonCTA
        label="회원가입 하기"
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
