import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@components/inputs/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@components/inputs/Button";
import File from "@components/inputs/File";
import Editor from "@components/inputs/TextEditor";
import backendApi from "configs/api/backendApi";
import { IForm } from "interfaces/Event";
import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { ErrApi } from "interfaces";
import router from "next/router";
import { getFirstErrorFromArray } from "@utils/index.js";
import { useEventForm } from "hooks/swr/event";
import Spinner from "@components/Spinner";

const Form = ({ id }: { id?: number }) => {
  const { data: session } = useSession();
  const reqConfig: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + session.access_token,
    },
  };

  const { data, isError, isLoading, mutate } = useEventForm(reqConfig, id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IForm>({
    mode: "onSubmit",
    resolver: yupResolver(
      yup.object({
        title: yup.string().required().label("Judul Event"),
        category: yup.string().required().label("Kategori"),
        level: yup.string().required().label("Level"),
        description: yup.string().required().label("Deskripsi"),
        registration_link: yup.string().required().label("Link Pendaftaran"),
        date: yup.string().required().label("Tanggal"),
        deadline: yup.string().required().label("Deadline"),
      })
    ),
  });

  console.log(errors);
  const submit: SubmitHandler<IForm> = async ({
    title,
    category,
    level,
    description,
    covers,
    registration_link,
    date,
    deadline,
  }) => {
    let endPoint = "/panel/events/store";

    if (id) {
      endPoint = `/panel/events/update/${id}`;
    } else {
      if (!covers.length) {
        return toast("Cover diperlukan !", {
          type: "warning",
        });
      }
    }

    const myToast = toast.loading("Tunggu sebentar...");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("description", description);
    formData.append("registration_link", registration_link);
    formData.append("date", date);
    formData.append("deadline", deadline);
    formData.append("publish", "");
    if (covers.length) formData.append("logo", covers[0]);

    backendApi
      .post(endPoint, formData, reqConfig)
      .then((res) => {
        toast.update(myToast, {
          render: "Yeyyy aksi berhasil",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          closeButton: true,
        });

        mutate();

        setTimeout(() => {
          router.push("/informations/event");
        }, 2000);
      })
      .catch(({ response: { data }, code }: AxiosError<ErrApi>) => {
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
  if (id && isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      action=""
      className="grid lg:grid-cols-2 gap-y-5 gap-x-7"
    >
      <Input
        label="Judul Event"
        defaultValue={data?.title}
        {...register("title")}
        {...(errors.title?.message && {
          errorMessage: errors.title?.message,
        })}
      />
      <Input
        label="Kategori"
        defaultValue={data?.category}
        {...register("category")}
        {...(errors.category?.message && {
          errorMessage: errors.category?.message,
        })}
      />
      <Input
        label="Level"
        defaultValue={data?.level}
        {...register("level")}
        {...(errors.level?.message && {
          errorMessage: errors.level?.message,
        })}
      />
      <Input
        label="Link Pendaftaran"
        defaultValue={data?.registration_link}
        {...register("registration_link")}
        {...(errors.registration_link?.message && {
          errorMessage: errors.registration_link?.message,
        })}
      />
      <Input
        label="Tanggal"
        defaultValue={data?.date}
        type={"date"}
        {...register("date")}
        {...(errors.date?.message && {
          errorMessage: errors.date?.message,
        })}
      />
      <Input
        label="Deadline"
        defaultValue={data?.deadline}
        type={"date"}
        {...register("deadline")}
        {...(errors.deadline?.message && {
          errorMessage: errors.deadline?.message,
        })}
      />

      <File label="Upload Cover" {...register("covers")} />

      <div className="col-span-1 lg:col-span-2">
        <Controller
          name="description"
          control={control}
          render={(field) => {
            return (
              <Editor
                onInit={() => {
                  setValue("description", data?.description);
                }}
                defaultValue={data?.description}
                {...field.field}
              />
            );
          }}
        />
      </div>

      <div>
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  );
};

export default Form;
