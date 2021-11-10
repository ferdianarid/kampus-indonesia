import React, { useState, useEffect } from "react";
import HeaderPagesInformation from "@components/HeaderPagesInformation";
import AdminLayout from "@components/layouts/AdminLayout";
import MyCheckbox from "@components/MyCheckbox";
import { handleCheckAll } from "@utils/checkboxHendler";
import useSWR from "swr";
import Image from "next/image";
import backendApi from "configs/api/backendApi";
import placeholder from "@public/placeholder.png";
import { DateTime } from "luxon";

const Published = () => {
  const { data, error } = useSWR("/articles?perpage=10", backendApi.get);
  const [isCheckAll, setCheckAll] = useState(false);

  return (
    <AdminLayout>
      <HeaderPagesInformation
        title="Terpublish"
        uploadPagePath="/informations/university/add"
      />
      <div className="bg-white rounded-md mt-8 mx-10">
        <div className="p-4 border-gray-300">
          <div className="flex justify-between">
            <MyCheckbox
              label="Select All"
              name="checkall"
              isChecked={isCheckAll}
              onChange={() =>
                handleCheckAll({
                  stateList: data.data.data.data,
                  setStateCheckAll: setCheckAll,
                })
              }
            />
            <div className="flex items-center">
              <label className="mr-3">Filter By</label>
              <CategoryBlog />
              <input
                className="bg-search border-2 border-gray-300 px-3 pl-8 py-1 rounded-md min-w-[190px]"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="mt-3">
            {error && "Error"}
            {!data && "Loading"}
            {data &&
              data.data.data.data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center py-4 border-t-2 border-b-2 border-gray-300"
                  >
                    <MyCheckbox
                      name={item.id}
                      isChecked={() => {}}
                      onChange={() => {}}
                    />
                    <Image
                      loading="lazy"
                      src={placeholder}
                      objectFit="cover"
                      className="rounded-md"
                      width={87}
                      height={64}
                      alt="Cover image"
                    />

                    <div className="ml-8 flex-grow">
                      <h3 className="font-bold">{item.title}</h3>
                      <div className="text-primary text-sm text-opacity-70">
                        {item.categories
                          .map((categorie) => categorie.name)
                          .join(", ")}
                      </div>
                      <h6 className="text-xs mt-1">
                        {DateTime.fromISO(item.created_at).toFormat(
                          "dd MMMM yyyy"
                        )}
                      </h6>
                    </div>

                    <div className="flex items-center">
                      <button className="bg-primary text-white py-2 px-5 rounded-2xl mr-2">
                        Edit
                      </button>
                      <button className="bg-gray-200 text-white py-2 px-2 rounded-full">
                        <img src="/icons/more-horizontal.svg" width="24px" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const CategoryBlog = ({ onChange, ...props }) => {
  const [category, setCategory] = useState([]);
  const { data, error } = useSWR("/categories", backendApi.get);

  useEffect(() => {
    if (data) {
      setCategory(data.data.data);
    }
  }, [data]);

  return (
    <select
      onChange={onChange}
      className="border-2 border-gray-300 px-3 py-1 rounded-md min-w-[190px] mr-3"
      {...props}
    >
      {error && <option>Error</option>}
      {!data && <option value="">All post</option>}
      {data && (
        <>
          <option value="">All post</option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

Published.auth = {
  role: "admin",
};

export default Published;
