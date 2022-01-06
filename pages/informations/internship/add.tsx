import React from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import AdminLayout from "@components/layouts/AdminLayout";
import Input from "@components/inputs/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@components/inputs/Button";
import File from "@components/inputs/File";
import Editor from "@components/inputs/TextEditor";
import backendApi from "configs/api/backendApi";
import { IForm } from "interfaces/Intership";
import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { IApiError } from "interfaces";
import router from "next/router";
import { getFirstErrorFromArray } from "@utils/index.js";

const Add = () => {
  const { data: session } = useSession();
  const reqConfig: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + session.access_token,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {},
    resolver: yupResolver(
      yup.object({
        field: yup.string().required().label("Bidang"),
        description: yup.string().required().label("Deskripsi"),
        company: yup.string().required().label("Nama Perusahaan"),
        location: yup.string().required().label("Lokasi"),
        period: yup.string().required().label("Period"),
        deadline: yup.string().required().label("Batas Pendaftaran"),
        registration_link: yup.string().required().label("Link Pendaftaran"),
        logos: yup.mixed().required().label("Logo"),
        title: yup.string().required().min(5).label("Judul Magang"),
      })
    ),
  });

  const submit: SubmitHandler<IForm> = async ({
    field,
    title,
    description,
    company,
    location,
    period,
    deadline,
    registration_link,
    logos,
  }) => {
    const myToast = toast.loading("Tunggu sebentar...");

    const formData = new FormData();
    formData.append("field", field);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("company", company);
    formData.append("location", location);
    formData.append("period", period);
    formData.append("deadline", deadline);
    formData.append("registration_link", registration_link);
    formData.append("logo", logos[0]);
    formData.append("publish", "");

    backendApi
      .post("/panel/internships/store", formData, reqConfig)
      .then((res) => {
        toast.update(myToast, {
          render: "Yeyyy aksi berhasil",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeButton: true,
        });

        setTimeout(() => {
          router.push("/informations/internship");
        }, 3000);
      })
      .catch(({ response: { data }, code }: AxiosError<IApiError>) => {
        if (data.errors) {
          toast.update(myToast, {
            render: getFirstErrorFromArray(data.errors),
            type: "error",
            isLoading: false,
            autoClose: 2000,
            closeButton: true,
          });
        } else {
          toast.update(myToast, {
            render: data.message ?? "Upsss aksi gagal",
            type: "error",
            isLoading: false,
            autoClose: 2000,
            closeButton: true,
          });
        }
      });
  };

  console.log(errors);
  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Buat Informasi Magang</HeaderPageAdd>
        <form
          onSubmit={handleSubmit(submit)}
          action=""
          className="grid lg:grid-cols-2 gap-y-5 gap-x-7"
        >
          <Input
            label="Judul Magang"
            {...register("title")}
            {...(errors.title?.message && {
              errorMessage: errors.title?.message,
            })}
          />
          <Input
            label="Bidang"
            {...register("field")}
            {...(errors.field?.message && {
              errorMessage: errors.field?.message,
            })}
          />
          <Input
            label="Periode"
            type="date"
            {...register("period")}
            {...(errors.period?.message && {
              errorMessage: errors.period?.message,
            })}
          />
          <Input
            label="Nama Perusahaan"
            {...register("company")}
            {...(errors.company?.message && {
              errorMessage: errors.company?.message,
            })}
          />
          <Input
            label="Lokasi"
            {...register("location")}
            {...(errors.location?.message && {
              errorMessage: errors.location?.message,
            })}
          />
          <Input
            label="Batas Pendaftaran"
            type="date"
            {...register("deadline")}
            {...(errors.deadline?.message && {
              errorMessage: errors.deadline?.message,
            })}
          />
          <File label="Upload Logo" {...register("logos")} />
          <Input
            label="Link Pendaftaran"
            {...register("registration_link")}
            {...(errors.registration_link?.message && {
              errorMessage: errors.registration_link?.message,
            })}
          />
          <div className="col-span-1 lg:col-span-2">
            <Controller
              name="description"
              control={control}
              render={(field) => {
                return <Editor {...field.field} />;
              }}
            />
          </div>

          <div>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

Add.auth = {
  role: "admin",
};

export default Add;
