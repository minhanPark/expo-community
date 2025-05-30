import { colors } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable } from "react-native";
import InputField from "./input-field";

export default function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ["isVoteAttached"] });

  return (
    <>
      {isVoteAttached && (
        <InputField
          variant="outlined"
          editable={false}
          value="투표가 첨부되었습니다."
          rightChild={
            <Pressable
              onPress={() => {
                setValue("isVoteAttached", false);
                resetField("voteOptions");
              }}
            >
              <Ionicons name="close" size={20} color={colors.BLACK} />
            </Pressable>
          }
        />
      )}
    </>
  );
}
