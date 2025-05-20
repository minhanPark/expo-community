import axios from "axios";
import { Platform } from "react-native";

const axiosInstance = axios.create({
  // ios에서는 localhost가 잘 작동하는데, 안드로이드에서는 localhost가 아니라 아래처럼 적어줘야함
  baseURL:
    Platform.OS === "ios" ? "http://localhost:3030" : "http://10.0.2.2:3030",
});

export default axiosInstance;
