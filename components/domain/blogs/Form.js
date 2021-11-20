import * as yup from "yup";
import React from "react";
import Input from "@components/inputs/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import File from "@components/inputs/File";
import CardPublish from "@components/domain/CardPublish";
import CardCategory from "@components/domain/blogs/CardCategory";
import Editor from "@components/inputs/TextEditor";
import { commonErrorHandler } from "@utils/index";
import backendApi from "configs/api/backendApi";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import placeholderBlog from "@public/placeholder-blog.png";

const Form = () => {
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
    <form
      onSubmit={handleSubmit(handleClickDraft)}
      className="grid gap-x-10 gap-y-4 grid-cols-1 lg:grid-cols-[1fr,300px]"
    >
      <div className="col-span-1 lg:col-span-2 w-full relative h-[300px]">
        <Image
          src={placeholderBlog}
          alt="Placeholder Blog"
          objectFit="cover"
          layout="fill"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 auto-rows-min">
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
          <CardCategory register={register} />
        </div>
      </div>
    </form>
  );
};

export default Form;
