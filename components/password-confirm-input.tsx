import { Controller, useFormContext } from "react-hook-form";
import InputField from "./input-field";

export default function PasswordConfirmInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="passwordConfirm"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 확인해주세요."
          value={value}
          onChangeText={onChange}
          secureTextEntry={true}
        />
      )}
    />
  );
}
