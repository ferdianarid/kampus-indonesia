import React, { useState, useEffect } from "react";
import HeaderPagesInformation from "@components/HeaderPagesInformation";
import AdminLayout from "@components/layouts/AdminLayout";
import MyCheckbox from "@components/MyCheckbox";
import { handleCheckAll, handleChangeCheck } from "@utils/checkboxHendler";
import useSWRImmutable from "swr/immutable";
import Image from "next/image";
import backendApi from "configs/api/backendApi";
import { DateTime } from "luxon";
import ilustrationEmptyBlog from "@public/ilustration-empty-blog.svg";
import Link from "next/link";
import ButtonLg from "@components/ButtonLg";
import LoadingPlaceholder from "@components/domain/blogs/LoadingPlaceholder";
import SelectCategory from "@components/domain/blogs/SelectCategory";

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
        const blogsMapped = data.data.data.articles.data.map((item) => ({
          ...item,
          isChecked: false,
        }));
        setBlogs(blogsMapped);
      }
    }
  }, [data, error, category]);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  const handleChangeCategory = (e) => {
    const val = e.target.value;

    setCategory(val);
    setBlogs([]);
    // one category
    if (val !== "") return setEndPoint(apiOneCat(val));

    // all category
    setEndPoint(apiAllCat);
  };

  const handleCheck = (e) => {
    handleChangeCheck({
      id: parseInt(e.target.value),
      stateList: blogs,
      setStateList: setBlogs,
      setCheckAll,
    });
  };

  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPagesInformation
          title="Terpublish"
          uploadPagePath="/blogs/add"
        />
        <div className="bg-white rounded-md mt-8">
          <div className="p-4 border-gray-300">
            <div className="flex justify-between border-b-2 pb-5">
              <MyCheckbox
                label="Select All"
                name="checkall"
                isChecked={isCheckAll}
                onChange={() => {
                  // disable change
                  if (!blogs.length) return;

                  handleCheckAll({
                    stateList: blogs,
                    setStateList: setBlogs,
                    setStateCheckAll: setCheckAll,
                  });
                }}
              />
              <div className="flex items-center">
                <label className="mr-3">Filter By</label>
                <SelectCategory
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
              {error && (
                <div className="flex py-10 items-center justify-center">
                  Upsss Terjadi Kesalahan
                </div>
              )}
              {!data && !error && (
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
                    name={"univ"}
                    value={item.id}
                    isChecked={item.isChecked}
                    onChange={handleCheck}
                  />
                  <Image
                    loading="lazy"
                    src={item.cover}
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
                    <button className="bg-primary text-white py-2 px-5 rounded-3xl mr-2">
                      Edit
                    </button>
                    <button className="w-[40px] h-[40px] flex items-center justify-center bg-gray-200 text-white py-1 px-1 rounded-full">
                      <Image
                        src="/icons/more-horizontal.svg"
                        alt="Icon menu"
                        width={"24px"}
                        height={"24px"}
                      />
                    </button>
                  </div>
                </div>
              ))}

              {data && !data.length && !error && (
                <div className="flex items-center flex-col py-10">
                  <div className="mb-4">
                    <Image
                      src={ilustrationEmptyBlog}
                      alt="Ilustration Empty Blog"
                    />
                  </div>
                  <h3 className="text-primary">Belum ada Draft</h3>
                  <p className="text-sm text-primary opacity-80">
                    Setiap postingan bagus dimulai dengan satu kata.
                  </p>
                  <Link href={"/blogs/add"} passHref>
                    <ButtonLg className="mt-4">Publish</ButtonLg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

Published.auth = {
  role: "admin",
};

export default Published;
