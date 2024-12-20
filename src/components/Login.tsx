import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { SignupFormInputs } from "../types/commontypes";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response);
        alert("Login successfully!");
        localStorage.setItem("Messanger", JSON.stringify(response.data));
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
        className="border border-white rounded-md px-6 py-3 space-y-3 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-blue-600 font-bold text-center">Messanger</h4>
        <p className="text-2xl text-center">
          Login to your <span className="text-blue-600 font-bold">Account</span>
        </p>
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
        <div className="flex flex-col gap-4">
          <input
            type="submit"
            value="Login"
            className="text-white bg-blue-600 rounded-lg py-3"
          />
          <p>
            Don't Have any account{" "}
            <Link
              to="/signup"
              className="text-blue-500 cursor-pointer underline"
            >
              Signup
            </Link>
            ?
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
