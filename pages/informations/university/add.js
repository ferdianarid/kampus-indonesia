import Button from "@components/inputs/Button";
import Input from "@components/inputs/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextArea from "@components/inputs/TextArea";
import schema from "@libs/yum/schema/universityCreate";
import HeaderPageAdd from "@components/domain/informations/HeaderPageAdd";

const AddUniversity = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <HeaderPageAdd>Buat Informasi Mahasiswa</HeaderPageAdd>

            {/* validasi dgn handleSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-8">
                <div className="w-full lg:w-4/12">
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
                        label="Jenis"
                        {...register("univType")}
                        {...(errors.univType?.message && {
                            errorMessage: errors.univType?.message,
                        })}
                    />

                    <TextArea
                        label="Alamat"
                        {...(errors.univAddress?.message && {
                            errorMessage: errors.univAddress?.message,
                        })}
                    ></TextArea>
                </div>
                <div className="w-full lg:w-4/12">
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
                        {...(errors.univVisionMission?.message && {
                            errorMessage: errors.univVisionMission?.message,
                        })}
                    ></TextArea>

                    <Button type="submit" className="bg-white">
                        Test Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddUniversity;
