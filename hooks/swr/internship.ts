import { ApiGetAllData } from "./../../interfaces/Intership";
import useSWRImmutable from "swr/immutable";
import { AxiosError, AxiosRequestConfig } from "axios";
import { DTOGetAllData } from "interfaces/Intership";
import backendApi from "configs/api/backendApi";
export const useInternship = (
  reqConfig: AxiosRequestConfig,
  search: string,
  curPage: number
) => {
  const { data, error } = useSWRImmutable<
    DTOGetAllData | Array<any>,
    AxiosError
  >([reqConfig, search, curPage], (reqConfig, search, curPage) => {
    const params = "?page=" + curPage;
    // if (search !== "") {
    //   return backendApi
    //     .post<ApiGetAllData | { success: boolean; data: Array<any> }>(
    //       "panel/internships/search" + params,
    //       {
    //         search,
    //       },
    //       reqConfig
    //     )
    //     .then((res) => res.data.data)
    //     .catch((reason) => {
    //       throw reason;
    //     });
    // } else {
    return backendApi
      .get<ApiGetAllData>("panel/internships" + params, reqConfig)
      .then((res) => res.data.data)
      .catch((reason) => {
        throw reason;
      });
    // }
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
