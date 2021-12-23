import * as yup from "yup";
import React from "react";
import Input from "@components/inputs/Input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import File from "@components/inputs/File";
import Editor from "@components/inputs/TextEditor";
import { commonErrorHandler } from "@utils/index";
import backendApi, { backendPost } from "configs/api/backendApi";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import objectToFormData from "@utils/objectToFormData";

interface Props {
  id?: number;
  logo?: string;
  title?: string;
  level?: string;
  category?: string;
  description?: string;
  date?: string;
  deadline?: string;
  registration_link?: string;
  publish?: string;
}

const Form = ({
  id,
  logo,
  title,
  level,
  category,
  description,
  date,
  deadline,
  registration_link,
  publish,
}: Props) => {
  const router = useRouter();
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
      title: title,
      level: level,
      category: category,
      description: description,
      date: date,
      deadline: deadline,
      registration_link: registration_link,
      publish: publish,
      logo: "",
    },
    resolver: yupResolver(
      yup.object({
        title: yup.string().required().min(5).label("Judul Artikel"),
      })
    ),
  });

  const postDraft = async (data) => {
    try {
      const form = objectToFormData({
        title: title,
        level: level,
        category: category,
        description: description,
        date: date,
        deadline: deadline,
        registration_link: registration_link,
        publish: publish,
      });

      if (!!data?.logo?.length) form.append("logo", data.logo[0]);

      let endPoint = "";
      if (!!id) endPoint = `/panel/events/update/${id}`;
      else endPoint = "/panel/events/store";

      setIsFetching(true);

      await backendPost(endPoint, form, session.access_token);

      toast("Yeyyy aksi berhasil", {
        type: "success",
      });

      setTimeout(() => {
        router.push("/informations/events");
      }, 1000);
    } catch (error) {
      console.log(error);
      commonErrorHandler(error);
    }

    setIsFetching(false);
  };

  return (
    <form
      onSubmit={handleSubmit(postDraft)}
      className="grid gap-x-10 gap-y-4 grid-cols-1"
    >
      {logo && (
        <div className="col-span-1 w-full relative h-[300px]">
          <Image
            src={logo}
            alt="Cover Article"
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 auto-rows-min">
        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Judul Event"
            {...register("title")}
            {...(errors.title?.message && {
              errorMessage: errors.title?.message,
            })}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Kategori"
            {...register("category")}
            {...(errors.title?.message && {
              errorMessage: errors.title?.message,
            })}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Jenjang"
            {...register("level")}
            {...(errors.title?.message && {
              errorMessage: errors.title?.message,
            })}
          />
        </div>
        <div className="col-span-2 lg:col-span-1"></div>

        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Kategori"
            {...register("category")}
            {...(errors.category?.message && {
              errorMessage: errors.category?.message,
            })}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Tanggal"
            {...register("date")}
            {...(errors.date?.message && {
              errorMessage: errors.date?.message,
            })}
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Input
            label="Link Pendaftaran"
            {...register("registration_link")}
            {...(errors.title?.message && {
              errorMessage: errors.title?.message,
            })}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <File
            label="Upload Logo"
            {...register("logo")}
            containerClassName="mt-0"
          />
        </div>
        <div className="col-span-2">
          <Controller
            name="description"
            control={control}
            render={(field) => {
              return <Editor {...field.field} />;
            }}
          />
        </div>
        <div className="flex justify-center col-span-2 gap-x-4">
          <Link href={"/informations/events"} passHref>
            <a>Kembali</a>
          </Link>
          <button type="submit">Simpan</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
