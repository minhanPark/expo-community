import * as SecureStore from "expo-secure-store";

export async function saveSecureStore(key: string, value: string) {
  console.log("saveSecureStore", key, value);
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureStore(key: string) {
  const value = (await SecureStore.getItemAsync(key)) ?? null;
  return value;
}

export async function deleteSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}
