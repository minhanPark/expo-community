import { Controller, useFormContext } from "react-hook-form";
import InputField from "./input-field";

export default function PasswordInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
          secureTextEntry={true}
          // ios에서는 키보드와 시스템에 사용자가 입력하는 콘텐츠에 대해 예상되는 의미론적 정보를 제공하는데
          // 원타임 코드를 통해서 안나타나게 하는 것
          textContentType="oneTimeCode"
        />
      )}
    />
  );
}
