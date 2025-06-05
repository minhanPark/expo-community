import { Controller, useFormContext } from "react-hook-form";
import InputField from "./input-field";

export default function IntroduceInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="introduce"
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <InputField
          ref={ref}
          label="소개"
          placeholder="소개를 입력해주세요."
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}
