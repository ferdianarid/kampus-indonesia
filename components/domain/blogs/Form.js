import * as yup from "yup";
import React from "react";
import Input from "@components/inputs/Input";
import { useForm, Controller } from "react-hook-form";
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
import { useState } from "react";

const Form = ({ id, title, cover, content, categories, isPublised }) => {
  const { data: session } = useSession();
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      test: [],
      title: title,
      content: content,
    },
    resolver: yupResolver(
      yup.object({
        title: yup.string().required().min(5).label("Judul Artikel"),
      })
    ),
  });

  const handleClickDraft = async (data) => {
    try {
      const form = new FormData();
      form.append("title", data.title);
      if (!!data.image[0]) form.append("cover", data.image[0]);
      form.append("content", data.content);

      // add categories
      data.category.forEach((item, index) => {
        if (!!item) form.append("category[]", index);
      });

      let endPoint = "";
      if (!!id) endPoint = `/panel/articles/update/${id}`;
      else endPoint = "/panel/articles/store";

      setIsFetching(true);
      await backendApi.post(endPoint, form, {
        headers: {
          Authorization: "Bearer " + session.access_token,
          "Content-type": "multipart/form-data",
        },
      });

      toast("Yeyyy aksi berhasil", {
        type: "success",
      });
    } catch (error) {
      commonErrorHandler(error);
    }

    setIsFetching(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleClickDraft)}
      className="grid gap-x-10 gap-y-4 grid-cols-1 lg:grid-cols-[1fr,300px]"
    >
      <div className="col-span-1 lg:col-span-2 w-full relative h-[300px]">
        <Image
          src={cover}
          alt="Cover Article"
          objectFit="cover"
          layout="fill"
          placeholder={placeholderBlog}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 auto-rows-min">
        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Judul Artikel"
            {...register("title")}
            {...(errors.title?.message && {
              errorMessage: errors.title?.message,
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
          <Controller
            name="content"
            control={control}
            render={(field) => {
              return <Editor {...field.field} />;
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="order-2 lg:order-1">
          <CardPublish
            id={id}
            isPublised={isPublised}
            isFetching={isFetching}
            clickDraft={handleSubmit(handleClickDraft)}
          />
        </div>
        <div className="order-1 lg:order-1">
          <CardCategory control={control} defaultCategories={categories} />
        </div>
      </div>
    </form>
  );
};

export default Form;
