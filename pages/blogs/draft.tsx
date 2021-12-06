import React, { useState, useEffect, FormEvent } from "react";
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
import { useAppDispatch, useAppSelector } from "configs/redux/hooks";
import {
  changePage,
  updateCatgory,
  updateDataPage,
  updateSearch,
} from "configs/redux/reducers/blogSlice";

const Draft = () => {
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
                isChecked={null}
                onChange={() => {}}
              />
              <div className="flex items-center">
                <label className="mr-3">Filter By</label>
                <SelectCategory value={null} onChange={() => {}} />
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formEl = e.target as HTMLFormElement;
                    const searchEl = formEl.elements.namedItem(
                      "search"
                    ) as HTMLInputElement;
                    console.log(typeof searchEl.value);
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
              <div className="flex items-center flex-col py-10">
                <div className="mb-4">
                  <Image
                    src={ilustrationEmptyBlog}
                    alt="Ilustration Empty Blog"
                  />
                </div>
                <h3 className="text-primary">
                  End Point Api Belum di Setting.
                </h3>
                <p className="text-sm text-primary opacity-80"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

Draft.auth = {
  role: "admin",
};

export default Draft;
