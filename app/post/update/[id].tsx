import CustomButton from "@/components/custom-button";
import DescriptionInput from "@/components/description-input";
import TitleInput from "@/components/title-input";
import VoteAttached from "@/components/vote-attached";
import useGetPost from "@/hooks/queries/useGetPost";
import useUpdatePost from "@/hooks/queries/useUpdatePost";
import { ImageUri } from "@/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormValues = {
  title: string;
  description: string;
  isVoteAttached: boolean;
  imageUris: ImageUri[];
};

export default function Page() {
  // 파라미터에 대한 값을 갖고올 수 있다.
  const { id } = useLocalSearchParams();
  const { data: post } = useGetPost(Number(id));
  const navigation = useNavigation();
  const updatePost = useUpdatePost();
  const postForm = useForm<FormValues>({
    values: {
      title: post?.title || "",
      description: post?.description || "",
      isVoteAttached: post?.hasVote || false,
      imageUris: post?.imageUris || [],
    },
  });

  const onSubmit = useCallback(
    (formValues: FormValues) => {
      updatePost.mutate(
        {
          id: Number(id),
          body: formValues,
        },
        {
          onSuccess: () => router.back(),
        }
      );
    },
    [id, updatePost]
  );
  useEffect(() => {
    // 페이지 내에서 네비게이션의 옵션을 다루려면 여기서 navigation.setOptions 사용할 수 있다.
    // 글 저장 버튼을 헤더에 넣으려고 이렇게 작성함
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, [navigation, postForm, onSubmit]);

  return (
    <FormProvider {...postForm}>
      {/* 인풋창이 안가려지도록 기능해준다는데 잘 모르겠음, 생각대로 작동하지 않음 */}
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <VoteAttached />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
