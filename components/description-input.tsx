import { Controller, useFormContext } from "react-hook-form";
import InputField from "./input-field";

export default function DescriptionInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="description"
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <InputField
          ref={ref}
          autoFocus
          label="내용"
          // 이메일 입력에 필요한 키들만 나타남
          //inputMode="email"
          // 첫글자 대문자 사라짐
          autoCapitalize="none"
          //  키보드 위에 뜨는 부분 사라짐
          spellCheck={false}
          autoCorrect={false}
          // 리턴키를 바꿀 수 있음(제출 키)
          returnKeyType="next"
          // 리턴키를 눌렀을 때 작동하는 방식을 나타낸다.
          // submiut은 제출 이벤트만 전송하고 인풋을 blur 처리하지 않아서 키보드가 사라지지 않는다.
          //submitBehavior="submit"
          // 리턴키를 눌렀을 때 호출되는 콜백으로 여기서 다음 인풋으로 넘겨줄 수 있다.
          //onSubmitEditing={() => setFocus("description")}
          placeholder="내용용을 입력해주세요."
          value={value}
          onChangeText={onChange}
          // 여러줄 입력할 땐 multiline 추가
          multiline
        />
      )}
    />
  );
}
