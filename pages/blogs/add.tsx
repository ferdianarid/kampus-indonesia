import * as yup from "yup";
import React, { useRef } from "react";
import Input from "@components/inputs/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@libs/yum/schema/universityCreate";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import File from "@components/inputs/File";
import CardPublish from "@components/domain/CardPublish";
import CardCategory from "@components/domain/blogs/CardCategory";
import AdminLayout from "@components/layouts/AdminLayout";
import Editor from "@components/inputs/TextEditor";
import { commonErrorHandler, getFirstErrorFromArray } from "@utils/index";
import backendApi from "configs/api/backendApi";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";

const AddUniversity = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(
      yup.object({
        blogTitle: yup.string().required().min(5).label("Judul Artikel"),
      })
    ),
  });

  const handleClickDraft = async (data) => {
    try {
      // get selected categories
      const categories = data.categories
        .map((item, index) => ({
          id: index,
          value: item.value,
        }))
        .filter((item) => !!item.value);

      const form = new FormData();

      form.append("title", data.blogTitle);
      form.append("cover", data.image[0]);
      form.append("content", data.blogContent);

      // add categories
      categories?.map((item) => {
        form.append("category[]", item.id);
      });

      const res = await backendApi.post("/panel/articles/store", form, {
        headers: {
          Authorization: "Bearer " + session.access_token,
          "Content-type": "multipart/form-data",
        },
      });

      return toast("Yeyyy aksi berhasil", {
        type: "success",
      });
    } catch (error) {
      commonErrorHandler(error);
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="mx-10">
          <HeaderPageAdd>Buat Artikel</HeaderPageAdd>

          <form
            onSubmit={handleSubmit(handleClickDraft)}
            className="grid sm:grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-[1fr,300px]"
          >
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 auto-rows-min">
              <div className="col-span-2 lg:col-span-1">
                <Input
                  label="Judul Artikel"
                  {...register("blogTitle")}
                  {...(errors.blogTitle?.message && {
                    errorMessage: errors.blogTitle?.message,
                  })}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <File
                  label="Upload Background"
                  {...register("image")}
                  containerClassName="mt-0"
                />
              </div>

              <div className="col-span-2">
                <Editor {...register("blogContent")} />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="order-2 lg:order-1">
                <CardPublish clickDraft={handleSubmit(handleClickDraft)} />
              </div>
              <div className="order-1 lg:order-1">
                <CardCategory />
              </div>
            </div>
          </form>
        </div>
      </AdminLayout>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
};

AddUniversity.auth = {
  role: "admin",
};

export default AddUniversity;
