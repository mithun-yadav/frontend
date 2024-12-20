import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormInputs } from "../types/commontypes.tsx";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.tsx";
import { Link } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const password = watch("password", "");
  const { authUser, setAuthUser } = useAuth();
  //   const confirmPassword = watch("confirmPassword", "");
  const validatePasswordMatch = (value: string | undefined) => {
    return value === password || "Password and confirm password don't match";
  };
  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        console.log(response);
        alert("Signup successfully!");
        localStorage.setItem("Messanger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          alert("Error:" + error.response.data.error);
        }
      });
    reset();
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white rounded-md px-6 py-3 space-y-3 w-96"
      >
        <h4 className="text-blue-600 font-bold text-center">Messanger</h4>
        <p className="text-2xl text-center">
          Create a new <span className="text-blue-600 font-bold">Account</span>
        </p>
        <h2>Its free and always be!</h2>
        {/*Email*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
        </label>
        {errors?.email && (
          <span className="text-sm text-red-600">
            **{errors?.email.message}**
          </span>
        )}
        {/*Name*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="name"
            {...register("name", { required: "name is required" })}
          />
        </label>
        {errors?.name && (
          <span className="text-sm text-red-600">
            **{errors?.name.message}**
          </span>
        )}
        {/*Password*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            {...register("password", { required: "Password is required" })}
          />
        </label>
        {errors?.password && (
          <span className="text-sm text-red-600">
            **{errors?.password.message}**
          </span>
        )}
        {/*Confirm Password*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors?.confirmPassword && (
          <span className="text-sm text-red-600">
            **{errors?.confirmPassword.message}**
          </span>
        )}
        <div className="flex flex-col gap-4">
          <input
            type="submit"
            value="Sign up"
            className="text-white bg-blue-600 rounded-lg py-3 cursor-pointer"
          />
          <p>
            Have any account{" "}
            <Link
              to="/login"
              className="text-blue-500 cursor-pointer underline"
            >
              Login
            </Link>
            ?
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
