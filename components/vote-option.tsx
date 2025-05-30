import { PostVoteOption } from "@/types";
import { StyleSheet, View } from "react-native";

type Props = {
  option: PostVoteOption;
  totalCount: number;
  isVoted: boolean;
  isSelected: boolean;
  onSelectOption: () => void;
};

export function VoteOption({
  option,
  totalCount,
  isSelected,
  isVoted,
  onSelectOption,
}: Props) {
  return <>{isVoted ? <View></View> : <View></View>}</>;
}

const styles = StyleSheet.create({});
