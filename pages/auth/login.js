import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import google from "@public/logos/google.png";
import facebook from "@public/logos/facebook.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    email: yup.string().required("Email perlu diisi"),
    password: yup.string().required("Password perlu diisi"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    try {
      const resultSign = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (resultSign.error) {
        return toast("Gagal login.", {
          icon: "error",
        });
      }

      window.location.replace(resultSign.url);
    } catch (error) {
      toast("Terjadi kesalahan", {
        icon: "error",
      });
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit(submit)}>
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col rounded-lg bg-[#F3F7FC] px-5 py-4 mx-0 md:mx-4 w-full md:w-[780px]">
            <div className="mb-3 text-center md:text-left">
              <h3 className="text-[#14375E] text-xl font-bold">
                Selamat Datang Kembali !
              </h3>
              <small>
                Belum punya akun ?
                <Link href="/">
                  <a className="text-[#2978E3] ml-2">
                    Klik disini untuk daftar
                  </a>
                </Link>
              </small>
            </div>

            <div className="sm:block md:flex mt-2">
              <LoginWith
                img={google}
                alt={"Google Icon"}
                text={"Masuk dengan google"}
                className={"mb-2 md:mb-0 md:mr-3"}
              />
              <LoginWith
                img={facebook}
                alt={"Facebook Icon"}
                text={"Masuk dengan facebook"}
                className={"md:ml-3"}
              />
            </div>

            <span className="text-[#2978E3] font-bold text-center my-3">
              Atau
            </span>
            <div>
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
            </div>
            <div className="flex justify-between mt-2 flex-wrap text-center">
              <label
                htmlFor="allowLogin"
                className="flex items-center mt-0 md:mt-2"
              >
                <input
                  type="checkbox"
                  name="allowLogin"
                  id="allowLogin"
                  className="scale-150 mr-3 ml-1 border border-[#CAE1FF]"
                />
                <span
                  type="button"
                  className="text-[#14375E] font-bold select-none"
                >
                  Biarkan saya tetap masuk
                </span>
              </label>
              <ForgotPassword className={`hidden md:flex`} />
            </div>
            <div className="flex place-content-center mt-5 mb-2">
              <button
                type="submit"
                className="bg-primary px-8 py-2 text-white font-medium rounded-3xl"
              >
                Masuk
              </button>
            </div>
            <ForgotPassword className={`md:hidden text-center mt-3`} />
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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

const LoginWith = ({ img, alt, text, className, ...props }) => {
  return (
    <Link href={""}>
      <a
        className={`flex items-center bg-white border border-[#CAE1FF] rounded-lg px-3 w-full justify-center py-1 ${className}`}
        {...props}
      >
        <div className="flex items-center mr-1">
          <Image alt={alt} src={img} width={40} height={40} />
        </div>
        <span className="text-[#14375E] font-medium">{text}</span>
      </a>
    </Link>
  );
};

const LoginInput = ({ name, register, errorText, className, ...props }) => {
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

const ForgotPassword = ({ className }) => {
  return (
    <Link href={""}>
      <a
        href=""
        className={`font-bold text-[#14375E] items-center ${className}`}
      >
        Lupa Password ?
      </a>
    </Link>
  );
};

Login.auth = {
  authenticatedRedirect: "/",
};

export default Login;
