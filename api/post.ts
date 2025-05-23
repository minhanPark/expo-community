import { CreatePostDto } from "@/types";
import axiosInstance from "./axios";

export async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
}
