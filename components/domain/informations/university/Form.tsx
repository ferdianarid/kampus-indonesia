import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@components/inputs/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@components/inputs/Button";
import File from "@components/inputs/File";
import Editor from "@components/inputs/TextEditor";
import backendApi from "configs/api/backendApi";
import { IForm } from "interfaces/University";
import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { ErrApi } from "interfaces";
import router from "next/router";
import { getFirstErrorFromArray } from "@utils/index.js";
import { useUniversityForm } from "hooks/swr/university";
import Spinner from "@components/Spinner";

const Form = ({ id }: { id?: number }) => {
  const { data: session } = useSession();
  const reqConfig: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + session.access_token,
    },
  };

  const { data, isError, isLoading, mutate } = useUniversityForm(reqConfig, id);

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
        name: yup.string().required().label("Nama Universitas"),
        regency: yup.string().required().label("Kode Regensi"),
        accreditation: yup.string().required().label("Akreditasi"),
        status: yup.string().required().label("Status"),
        national_rank: yup.number().required().label("Ranking Nasional"),
        international_rank: yup
          .number()
          .required()
          .label("Ranking Internasional"),
        vision: yup.string().required().label("Visi"),
        mission: yup.string().required().label("Misi"),
        type: yup.string().required().label("Tipe"),
        address: yup.string().required().label("Alamat"),
        // web_url: yup.string().required().label("Link Web"),
      })
    ),
  });

  const submit: SubmitHandler<IForm> = async ({
    regency,
    name,
    description,
    logos,
    covers,
    accreditation,
    status,
    national_rank,
    international_rank,
    vision,
    mission,
    type,
    address,
    web_url,
  }) => {
    let endPoint = "/panel/colleges/store";

    if (id) {
      endPoint = `/panel/colleges/update/${id}`;
    } else {
      if (!covers.length) {
        return toast("Background diperlukan !", {
          type: "warning",
        });
      }

      if (!logos.length) {
        return toast("Logo diperlukan !", {
          type: "warning",
        });
      }
    }

    const myToast = toast.loading("Tunggu sebentar...");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("regency", regency);
    formData.append("accreditation", accreditation);
    formData.append("status", status);
    formData.append("national_rank", national_rank.toString());
    formData.append("international_rank", international_rank.toString());
    formData.append("vision", vision);
    formData.append("mission", mission);
    formData.append("type", type);
    formData.append("address", address);
    formData.append("web_url", web_url);

    if (logos.length) formData.append("logo", logos[0]);
    if (covers.length) formData.append("cover", covers[0]);
    formData.append("description", description);

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
          router.push("/informations/university");
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
        label="Nama Universitas"
        defaultValue={data?.name}
        {...register("name")}
        {...(errors.name?.message && {
          errorMessage: errors.name?.message,
        })}
      />
      <Input
        label="Kode Regensi"
        defaultValue={data?.regency_code}
        {...register("regency")}
        {...(errors.regency?.message && {
          errorMessage: errors.regency?.message,
        })}
      />
      <Input
        label="Akreditasi"
        defaultValue={data?.accreditation}
        {...register("accreditation")}
        {...(errors.accreditation?.message && {
          errorMessage: errors.accreditation?.message,
        })}
      />
      <Input
        label="Status"
        defaultValue={data?.status}
        {...register("status")}
        {...(errors.status?.message && {
          errorMessage: errors.status?.message,
        })}
      />
      <Input
        label="Ranking Nasional"
        defaultValue={data?.national_rank}
        type={"number"}
        min={0}
        {...register("national_rank")}
        {...(errors.national_rank?.message && {
          errorMessage: errors.national_rank?.message,
        })}
      />
      <Input
        label="Ranking Internasional"
        defaultValue={data?.international_rank}
        type={"number"}
        min={0}
        {...register("international_rank")}
        {...(errors.international_rank?.message && {
          errorMessage: errors.international_rank?.message,
        })}
      />
      <Input
        label="Visi"
        defaultValue={data?.vision}
        {...register("vision")}
        {...(errors.vision?.message && {
          errorMessage: errors.vision?.message,
        })}
      />
      <Input
        label="Misi"
        defaultValue={data?.mission}
        {...register("mission")}
        {...(errors.mission?.message && {
          errorMessage: errors.mission?.message,
        })}
      />
      <Input
        label="Tipe"
        defaultValue={data?.type}
        {...register("type")}
        {...(errors.type?.message && {
          errorMessage: errors.type?.message,
        })}
      />
      <Input
        label="Alamat"
        defaultValue={data?.address}
        {...register("address")}
        {...(errors.address?.message && {
          errorMessage: errors.address?.message,
        })}
      />
      <Input
        label="Link Web"
        defaultValue={data?.web_url}
        {...register("web_url")}
        {...(errors.web_url?.message && {
          errorMessage: errors.web_url?.message,
        })}
      />

      <File label="Upload Logo" {...register("logos")} />
      <File label="Upload Background" {...register("covers")} />

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
