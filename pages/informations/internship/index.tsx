import AdminLayout from "@components/layouts/AdminLayout";
import HeaderPagesInformation from "@components/HeaderPagesInformation";
import LoadingPlaceholder from "@components/domain/blogs/LoadingPlaceholder";
import Error from "@components/domain/informations/internship/Error";
import Item from "@components/domain/informations/internship/Item";
import Empty from "@components/domain/informations/internship/Empty";
import Pagination from "@components/Pagination";
import { useInternship } from "hooks/swr/internship";
import { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IPagination } from "interfaces";
import backendApi from "configs/api/backendApi";
import { toast } from "react-toastify";
import { commonErrorHandler } from "@utils/index.js";
import { useSWRConfig } from "swr";

const Internship = () => {
  const { mutate } = useSWRConfig();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    postPerPage: 6,
    totalPost: 1,
    lastPage: 1,
  });

  const { data: session } = useSession();
  const reqConfig: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + session.access_token,
    },
  };

  const handleClickDelete = async (id: number) => {
    try {
      const res = await backendApi.post(
        `/panel/internships/delete/${id}`,
        {},
        reqConfig
      );
      mutate([reqConfig, search, pagination.currentPage]);
      if (res.data.errors) {
        toast(res.data.errors, {
          type: "error",
        });

        return;
      }
    } catch (error) {
      commonErrorHandler(error);
    }
  };

  const { data, isError, isLoading } = useInternship(
    reqConfig,
    search,
    pagination.currentPage
  );

  useEffect(() => {
    if (data) {
      setPagination({
        postPerPage: data.per_page ?? 1,
        totalPost: data.total ?? 1,
        currentPage: data.current_page ?? 1,
        lastPage: data.last_page,
      });
    }
  }, [data, isError, isLoading]);

  console.log(data);
  return (
    <AdminLayout>
      <div className="">
        <HeaderPagesInformation
          title="Magang"
          uploadPagePath="/informations/internship/add"
        />
        <div className="bg-white rounded-md mt-8">
          <div className="p-4 border-gray-300">
            <div className="flex justify-between border-b-2 pb-5">
              <div></div>
              <div className="flex items-center">
                <label className="mr-3">Filter By</label>

                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setSearch(e.target[0].value);
                  }}
                >
                  <input
                    name="search"
                    className="bg-search border-2 border-gray-300 px-3 pl-8 py-1 rounded-md min-w-[190px]"
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>

            <div className="">
              {isError && <Error />}
              {isLoading && <LoadingPlaceholder />}
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <Item
                    key={index}
                    data={item}
                    handleClickDelete={handleClickDelete}
                  />
                ))}

              {data. && <Empty />}

              <Pagination
                activePage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onClickBack={() => {
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage - 1,
                  });
                }}
                onClick={() => {}}
                onClickNext={() => {
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage + 1,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

Internship.auth = {
  role: "admin",
};

export default Internship;
