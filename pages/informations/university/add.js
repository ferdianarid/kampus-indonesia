import React from "react";
import Input from "@components/inputs/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@components/inputs/TextArea";
import schema from "@libs/yum/schema/universityCreate";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";
import Editor from "@components/inputs/TextEditor";
import File from "@components/inputs/File";
import Publish from "@components/domain/informations/university/CardPublish";
import CardCategory from "@components/domain/informations/university/CardCategory";
import AdminLayout from "@components/layouts/AdminLayout";

const AddUniversity = () => {
  const [editorLoaded, setEditorLoaded] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    setEditorLoaded(true);
    register("editor");
  }, [register]);

  const onSubmit = (data) => console.log(data);
  return (
    <AdminLayout>
      <div className="mx-10">
        <HeaderPageAdd>Buat Informasi Mahasiswa</HeaderPageAdd>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid sm:grid-cols-1 lg:grid-cols-[1fr,1fr,300px] gap-4"
        >
          <div>
            <Input
              label="Nama Rangking Nasional"
              {...register("univName")}
              {...(errors.univName?.message && {
                errorMessage: errors.univName?.message,
              })}
            />

            <Input
              label="Akreditasi"
              {...register("univAccreditation")}
              {...(errors.univAccreditation?.message && {
                errorMessage: errors.univAccreditation?.message,
              })}
            />

            <Input
              label="Status"
              {...register("univStatus")}
              {...(errors.univStatus?.message && {
                errorMessage: errors.univStatus?.message,
              })}
            />

            <Input
              label="Jenis"
              {...register("univType")}
              {...(errors.univType?.message && {
                errorMessage: errors.univType?.message,
              })}
            />

            <TextArea
              label="Alamat"
              rows="4"
              {...(errors.univAddress?.message && {
                errorMessage: errors.univAddress?.message,
              })}
            ></TextArea>
          </div>
          <div>
            <Input
              label="Rangking Nasional"
              {...register("univNationalRank")}
              {...(errors.univNationalRank?.message && {
                errorMessage: errors.univNationalRank?.message,
              })}
            />

            <Input
              label="Rangking Internasional"
              {...register("univInternationalRank")}
              {...(errors.univInternationalRank?.message && {
                errorMessage: errors.univInternationalRank?.message,
              })}
            />

            <TextArea
              label="Visi dan Misi"
              rows="5"
              {...(errors.univVisionMission?.message && {
                errorMessage: errors.univVisionMission?.message,
              })}
            ></TextArea>
            <File label="Upload Logo" {...register("univLogo")} />
            <File label="Upload Background" {...register("univBackground")} />
          </div>
          <div>
            <Publish />
            <CardCategory />
          </div>
          <div className="lg:col-span-3">
            <Editor
              name="description"
              onChange={(value, editor) => {
                setValue("editor", value);
              }}
              editorLoaded={editorLoaded}
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddUniversity;
