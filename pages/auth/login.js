import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submit = (data) => {
        signIn("credentials", {
            email: data.username,
            password: data.password,
            redirect: "/",
        });
    };

    return (
        <form method="post" onSubmit={handleSubmit(submit)}>
            <div className="h-screen flex items-center justify-center">
                <div className="flex flex-col px-5 py-3 bg-gray-200 lg:w-[400px] rounded-md">
                    <div className="text-center">
                        <h5 className="my-5 text-lg">Login</h5>
                    </div>
                    <input
                        {...register("username")}
                        className="my-2 mx-2"
                        name="username"
                        type="text"
                    />
                    <p>{errors.username?.message}</p>
                    <input
                        {...register("password")}
                        className="my-2 mx-2"
                        name="password"
                        type="password"
                    />
                    <p>{errors.password?.message}</p>
                    <div className="flex place-content-center mt-5">
                        <button
                            type="submit"
                            className="bg-primary px-3 py-1 text-white rounded-sm"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default login;
