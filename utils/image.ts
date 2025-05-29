import * as ImagePicker from "expo-image-picker";

export function getFormDataImages(
  key: string,
  images: ImagePicker.ImagePickerAsset[]
) {
  const formData = new FormData();
  images.forEach(({ uri, mimeType }) => {
    const file = {
      uri,
      type: mimeType || "image/jpeg",
      name: uri,
    };

    formData.append(key, file as unknown as File);
  });
  return formData;
}
