import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";

type FormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-rubik flex flex-col gap-6 w-1/2"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-2xl">
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          {...register("email", {
            required: { value: true, message: "email is required" },
          })}
          className=" text-lg px-4 py-3 border border-slate-300 rounded-md focus:outline focus:outline-blue-700 focus:border-white"
        />
        {errors?.email && (
          <span className="text-xs text-red-500 mt-1">
            {errors?.email?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-2xl">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: { value: true, message: "password is required" },
          })}
          className=" text-lg px-4 py-3 border border-slate-300 rounded-md focus:outline focus:outline-blue-700 focus:border-white"
        />
        {errors?.password && (
          <span className="text-xs text-red-500 mt-1">
            {errors?.password?.message}
          </span>
        )}
      </div>
      <Button label="Login" type="primary" />
    </form>
  );
};

export default LoginForm;
