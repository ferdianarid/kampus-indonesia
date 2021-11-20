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
import { useSession } from "next-auth/react";

const apiAllCat = ({ activePage }) => `/panel/articles?page=${activePage}`;
const apiOneCat = ({ activePage, idCategory }) =>
  `panel/articles/categories/all/${idCategory}?page=${activePage}`;

const Published = () => {
  const { data: session } = useSession();

  const [page, setPage] = useState({
    active: 1,
    last: 1,
    from: 1,
  });

  const [endPoint, setEndPoint] = useState(apiAllCat({ activePage: page }));

  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isCheckAll, setCheckAll] = useState(false);
  const { data, error } = useSWRImmutable(
    [endPoint, session, category],
    (endPoint, session, category) => {
      if (category === "") {
        return backendApi
          .get(endPoint, {
            headers: {
              Authorization: "Bearer " + session.access_token,
            },
          })
          .then((res) => res.data);
      } else {
        return backendApi
          .post(endPoint, [], {
            headers: {
              Authorization: "Bearer " + session.access_token,
            },
          })
          .then((res) => res.data);
      }
    }
  );

  useEffect(() => {
    if (data) {
      // all category
      if (category === "") {
        const blogsMapped = data.data.data.map((item) => ({
          ...item,
          isChecked: false,
        }));

        setBlogs(blogsMapped);
      }

      // one category
      else {
        const blogsMapped = data.data.articles.data.map((item) => ({
          ...item,
          isChecked: false,
        }));

        setBlogs(blogsMapped);
      }

      setPage({
        active: data.data.current_page,
        last: data.data.last_page,
        from: data.data.from,
      });
    }
  }, [data, error, category]);

  useEffect(() => {
    setPage({ active: 1, from: 1, last: 1 });
  }, [category]);

  const handleChangeCategory = (e) => {
    const idCategory = e.target.value;

    setCategory(idCategory);

    // one category
    if (idCategory !== "")
      return setEndPoint(apiOneCat({ idCategory, activePage: page.active }));
    // all category
    else setEndPoint(apiAllCat({ activePage: page.active }));
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
      <div className="">
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
                  <hr />
                  <LoadingPlaceholder />
                  <hr />
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

              {!blogs.length && data && !error && (
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

              <Pagination
                activePage={page.active}
                lastPage={page.last}
                onClickBack={() => {
                  setPage({
                    ...page,
                    active: page.active - 1,
                  });
                }}
                onClick={() => {}}
                onClickNext={() => {
                  setPage({
                    ...page,
                    active: page.active + 1,
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

const PageNumber = ({ isActive, children }) => {
  return (
    <div
      className={`w-8 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-full ${
        isActive ? "bg-primary text-white" : ""
      }`}
    >
      {children}
    </div>
  );
};

const Pagination = ({
  activePage,
  lastPage,
  onClickBack,
  onClick,
  onClickNext,
}) => {
  return (
    <div className="flex flex-col items-center my-12">
      <style jsx>{`
        .circle {
          @apply h-8 w-8 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer;
        }
      `}</style>

      <div className="flex text-gray-700">
        <div
          className={`mr-1 circle ${activePage === 1 ? "opacity-20" : ""}`}
          onClick={() => {
            if (activePage === 1) return;
            onClickBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className="flex h-8 font-medium rounded-full bg-gray-200">
          <PageNumber onClick={onClick} isActive={true}>
            {activePage}
          </PageNumber>
        </div>
        <div
          className={`ml-1 circle ${
            activePage === lastPage ? "opacity-20" : ""
          }`}
          onClick={() => {
            if (activePage === lastPage) return;
            onClickNext();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-4 h-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

Published.auth = {
  role: "admin",
};

export default Published;
