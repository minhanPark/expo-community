import { Profile } from "@/types";
import { getSecureStore } from "@/utils/secure-store";
import axiosInstance from "./axios";

type RequestUser = {
  email: string;
  password: string;
};

export async function postSignup(body: RequestUser): Promise<void> {
  const { data } = await axiosInstance.post("/auth/signup", body);
  return data;
}

export async function postLogin(
  body: RequestUser
): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body);
  return data;
}

export async function getMe(): Promise<Profile> {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export async function getUserProfile(id: number): Promise<Profile> {
  const { data } = await axiosInstance.get(`/auth/${id}`);

  return data;
}

export async function editProfile(body: Partial<Profile>): Promise<Profile> {
  const { data } = await axiosInstance.patch("/auth/me", body);

  return data;
}
