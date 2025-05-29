import { uploadImages } from "@/api/image";
import { useMutation } from "@tanstack/react-query";

export default function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
  });
}
