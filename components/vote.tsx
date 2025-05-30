import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { PostVote } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./custom-button";

type Props = {
  postId: number;
  postVotes: PostVote[];
  voteCount: number;
};

export default function Vote({ postId, postVotes, voteCount }: Props) {
  const { auth } = useAuth();
  const [selectedId, setSelectedId] = useState<number>(0);
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>투표</Text>
        <View style={styles.labelCount}>
          <Feather name="user" size={14} color={colors.BLACK} />
          <Text style={styles.labelCountText}>{voteCount} 명 참여</Text>
        </View>
      </View>
      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId)
        );
        const isVoted = voteUserIds.includes(Number(auth.id));
        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => {
              return <Text key={option.id}>{option.content}</Text>;
            })}
            {!isVoted && (
              <CustomButton
                label="투표하기"
                disabled={!selectedId}
                onPress={() => {}}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 8,
    padding: 16,
    gap: 15,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  labelCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
