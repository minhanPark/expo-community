import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable } from "react-native";
import InputField from "./input-field";

type Props = {
  index: number;
  onRemove: () => void;
};

export default function VoteInput({ index, onRemove }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={`voteOptions.${index}.content`}
      render={({ field: { onChange, value } }) => (
        <InputField
          variant="standard"
          value={value}
          onChangeText={onChange}
          rightChild={
            <Pressable onPress={onRemove}>
              <Ionicons name="close" size={20} color={colors.BLACK} />
            </Pressable>
          }
        />
      )}
    />
  );
}
