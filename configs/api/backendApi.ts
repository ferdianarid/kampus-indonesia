import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});


export const backendPost = (url: string, data: any, token) => {
  return backendApi.post(url, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "multipart/form-data",
    },
  })
}

export default backendApi;