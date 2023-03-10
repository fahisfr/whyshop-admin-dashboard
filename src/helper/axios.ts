import axios from "axios";

export const baseUrl = process.env.BACKEND_URL;
export const imageUrl = `${baseUrl}/images`;

const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout:3333
});

instance.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["x-access-token"] = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const { data } = await instance.get("/user/refresh-token");

      if (data.status == "ok") {
        localStorage.setItem("access_token", data.accessToken);
        return instance.request(prevRequest);
      }
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

export default instance;
