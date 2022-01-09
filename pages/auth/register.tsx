import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backendApi from "configs/api/backendApi";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "@components/Spinner";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Nama perlu diisi")
      .min(3, "Minimal 3 karakter")
      .max(15, "Maksimal 15 karakter"),
    email: yup
      .string()
      .required("Email perlu diisi")
      .email("Email harus valid"),
    password: yup
      .string()
      .required("Password perlu diisi")
      .min(3, "Minimal 3 karakter")
      .max(15, "Maksimal 15 karakter"),
    passwordConfirm: yup
      .string()
      .required("Password perlu diisi")
      .oneOf([yup.ref("password"), null], "Password harus sama"),
    term: yup.bool().isTrue(),
  })
  .required();

const Login = () => {
  const router = useRouter();
  const [isFatching, setIsFatching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async ({
    name,
    email,
    password,
    passwordConfirm: password_confirmation,
    term,
  }) => {
    try {
      setIsFatching(true);

      const res = await backendApi.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      toast("Daftar berhasil. Konfirmasi email anda.", {
        type: "success",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3500);
    } catch (error) {
      if (error.response?.data) {
        const { errors } = error.response?.data;
        toast(errors[Object.keys(errors)[0]][0] ?? "Terjadi kesalahan", {
          type: "error",
        });
      } else {
        toast("Terjadi kesalahan", {
          type: "error",
        });
      }
    }
    setIsFatching(false);
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit(submit)}>
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col rounded-lg bg-[#F3F7FC] px-5 py-4 mx-0 md:mx-4 w-full md:w-[780px]">
            <div className="mb-3 text-center md:text-left">
              <h3 className="text-[#14375E] text-xl font-bold">
                Daftar Sekarang
              </h3>
              <small>
                Sudah punya akun ?
                <Link href="/login">
                  <a className="text-[#2978E3] ml-2">
                    Klik disini untuk daftar
                  </a>
                </Link>
              </small>
            </div>

            <div>
              <LoginInput
                type={"text"}
                name={"name"}
                register={register}
                placeholder={"Nama"}
                errorText={errors.name?.message}
              />
              <LoginInput
                type={"text"}
                name={"email"}
                register={register}
                placeholder={"Alamat Email"}
                errorText={errors.email?.message}
              />
              <LoginInput
                type="password"
                name={"password"}
                register={register}
                placeholder={"Password"}
                errorText={errors.password?.message}
              />
              <LoginInput
                type="password"
                name={"passwordConfirm"}
                register={register}
                placeholder={"Ketik Ulang Password"}
                errorText={errors.passwordConfirm?.message}
              />
            </div>

            <div className="flex justify-between mt-2 flex-wrap text-center">
              <label htmlFor="term" className="flex items-center mt-0 md:mt-2">
                <input
                  type="checkbox"
                  name="term"
                  id="term"
                  {...register("term")}
                  className="scale-150 mr-3 ml-1 border border-[#CAE1FF]"
                />
                <span
                  className={`font-bold select-none text-xs ${
                    errors.term ? "text-red-500" : "text-[#14375E]"
                  }`}
                >
                  Dengan membuat akun,anda telah menyetujui Syarat dan Ketentuan
                  yang berlaku
                </span>
              </label>
            </div>
            <div className="flex place-content-center mt-5 mb-2">
              <button
                disabled={isFatching}
                type="submit"
                className="bg-primary px-8 py-2 text-white font-medium rounded-3xl h-10 w-[160px]"
              >
                {isFatching ? <Spinner /> : "BUAT AKUN"}
              </button>
            </div>
          </div>
        </div>
      </form>
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

const LoginInput = ({
  name,
  register,
  errorText,
  className = "",
  ...props
}) => {
  return (
    <div>
      <input
        {...register(name)}
        className={`mt-2 px-5 py-3 w-full border border-[#CAE1FF] focus:outline-black rounded-md font-medium text-[#14375E] ${className}`}
        name={name}
        autoComplete="none"
        {...props}
      />
      <p className="mb-2 mt-1">{errorText}</p>
    </div>
  );
};

Login.auth = {
  authenticatedRedirect: "/",
};

export default Login;
