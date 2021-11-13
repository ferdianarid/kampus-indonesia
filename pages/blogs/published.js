import React, { useState, useEffect } from "react";
import HeaderPagesInformation from "@components/HeaderPagesInformation";
import AdminLayout from "@components/layouts/AdminLayout";
import MyCheckbox from "@components/MyCheckbox";
import { handleCheckAll, handleChangeCheck } from "@utils/checkboxHendler";
import useSWRImmutable from "swr/immutable";
import Image from "next/image";
import backendApi from "configs/api/backendApi";
import placeholder from "@public/placeholder.png";
import { DateTime } from "luxon";

const apiAllCat = "/articles?perpage=10";
const apiOneCat = (slug) => `/categories/${slug}`;

const Published = () => {
  const [endPoint, setEndPoint] = useState("/articles?perpage=10");

  const { data, error } = useSWRImmutable(endPoint, backendApi.get);

  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isCheckAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (data) {
      // all category
      if (category === "") {
        const blogsMapped = data.data.data.data.map((item) => ({
          ...item,
          isChecked: false,
        }));
        setBlogs(blogsMapped);
      }
      // one category
      else {
        console.log(data);
        const blogsMapped = data.data.data.articles.data.map((item) => ({
          ...item,
          isChecked: false,
        }));
        setBlogs(blogsMapped);
      }
    }
  }, [data, error, category]);

  const handleChangeCategory = (e) => {
    const val = e.target.value;

    setCategory(val);
    setBlogs([]);
    // one category
    if (val !== "") return setEndPoint(apiOneCat(val));

    // all category
    setEndPoint(apiAllCat);
  };

  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPagesInformation
          title="Terpublish"
          uploadPagePath="/informations/university/add"
        />
        <div className="bg-white rounded-md mt-8">
          <div className="p-4 border-gray-300">
            <div className="flex justify-between border-b-2 pb-5">
              <MyCheckbox
                label="Select All"
                name="checkall"
                isChecked={isCheckAll}
                onChange={() => {
                  if (!data) return;

                  handleCheckAll({
                    stateList: blogs,
                    setStateCheckAll: setCheckAll,
                  });
                }}
              />
              <div className="flex items-center">
                <label className="mr-3">Filter By</label>
                <CategoryBlog
                  value={category}
                  onChange={handleChangeCategory}
                />
                <input
                  className="bg-search border-2 border-gray-300 px-3 pl-8 py-1 rounded-md min-w-[190px]"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="">
              {error && "Error"}
              {!data && (
                <>
                  <LoadingPlaceholder />
                  <hr />
                  <LoadingPlaceholder />
                  <hr />
                  <LoadingPlaceholder />
                  <hr />
                  <LoadingPlaceholder />
                </>
              )}
              {blogs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center py-4 border-b-2 last:border-b-0 border-gray-300"
                >
                  <MyCheckbox
                    name={item.id}
                    isChecked={() => {
                      item.isChecked;
                    }}
                    onChange={() => {
                      handleChangeCheck({
                        id: item.id,
                        stateList: blogs,
                        setStateList: setBlogs,
                      });
                    }}
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
                    <h3 className="text-primary font-bold">{item.title}</h3>
                    <div className="text-primary font-roboto text-sm font-light text-opacity-70">
                      {item.categories ? (
                        item.categories
                          .map((categorie) => categorie.name)
                          .join(", ")
                      ) : (
                        <div>&nbsp;</div>
                      )}
                    </div>
                    <h6 className="text-xs font-roboto font-light mt-1">
                      {DateTime.fromISO(item.created_at).toFormat(
                        "dd MMMM yyyy"
                      )}
                    </h6>
                  </div>

                  <div className="flex items-center">
                    <button className="bg-primary text-white py-1 px-5 rounded-2xl mr-2">
                      Edit
                    </button>
                    <button className="bg-gray-200 text-white py-1 px-1 rounded-full">
                      <Image
                        src="/icons/more-horizontal.svg"
                        alt="Icon menu"
                        width="24px"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const LoadingPlaceholder = () => (
  <div className="animate-pulse rounded-md p-2 w-full mx-auto my-2">
    <div className="flex justify-between items-center">
      <div className="flex space-x-4 w-full">
        <div className="bg-gray-300 rounded-md h-[64px] w-[87px] ml-8"></div>
        <div className="flex-1 space-y-2 pl-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/5"></div>
        </div>
      </div>
      <div className="flex">
        <button className="bg-gray-300 w-16 rounded-2xl mr-2"></button>
        <button className="bg-gray-300 w-8 py-4 px-1 rounded-full"></button>
      </div>
    </div>
  </div>
);

const CategoryBlog = ({ value, onChange, ...props }) => {
  const [category, setCategory] = useState([]);
  const { data, error } = useSWRImmutable("/categories", backendApi.get);

  useEffect(() => {
    if (data) {
      setCategory(data.data.data);
    }
  }, [data]);

  return (
    <select
      value={value}
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
            <option key={item.slug} value={item.id}>
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
