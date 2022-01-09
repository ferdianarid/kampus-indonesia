import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { AxiosError, AxiosRequestConfig } from "axios";
import { GetAllDTO, GetOneDTO } from "interfaces/University";
import backendApi from "configs/api/backendApi";
import { ResApi } from "interfaces";

// get all data
export const useUniversity = (
  reqConfig: AxiosRequestConfig,
  search: string,
  curPage: number
) => {
  const { data, error } = useSWR<GetAllDTO, AxiosError>(
    [reqConfig, search, curPage],
    (reqConfig, search, curPage) => {
      const params = "?page=" + curPage;
      // TODO : endpoint belum ada
      if (search !== "") {
        return backendApi
          .post<ResApi<GetAllDTO>>(
            "panel/colleges/search" + params,
            {
              search,
            },
            reqConfig
          )
          .then((res) => res.data.data)
          .catch((reason) => {
            throw reason;
          });
      } else {
        return backendApi
          .get<ResApi<GetAllDTO>>("panel/colleges" + params, reqConfig)
          .then((res) => res.data.data)
          .catch((reason) => {
            throw reason;
          });
      }
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUniversityForm = (
  reqConfig: AxiosRequestConfig,
  id: number
) => {
  const { data, error, mutate } = useSWRImmutable<GetOneDTO, AxiosError>(
    id ? [reqConfig, id] : null,
    (reqConfig, id) => {
      return backendApi
        .get<ResApi<GetOneDTO>>("panel/colleges/show/" + id, reqConfig)
        .then((res) => res.data.data)
        .catch((reason) => {
          throw reason;
        });
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
