import { Controller, useFormContext } from "react-hook-form";
import InputField from "./input-field";

export default function NicknameInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="nickname"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          inputMode="text"
          returnKeyType="next"
          submitBehavior="submit"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("introduce")}
        />
      )}
    />
  );
}
