import Button from "./Button";

type FormInputs = {
  username: string;
  email: string;
  password: string;
};

import { SubmitHandler, useForm } from "react-hook-form";

const SignupForm = () => {
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
      className="font-rubik flex flex-col gap-3 w-1/2"
    >
      {/* <div className="flex flex-col">
        <label htmlFor="name" className="text-lg">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className=" text-lg px-4 py-2 border border-slate-300 rounded-md focus:outline focus:outline-blue-700 focus:border-white"
        />
      </div> */}
      <div className="flex flex-col">
        <label htmlFor="username" className="text-lg">
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="choose a username"
          {...register("username", {
            required: { value: true, message: "username is required" },
            minLength: {
              value: 3,
              message: "username must be at least 3 character long",
            },
            maxLength: {
              value: 20,
              message: "username can not exceed 20 characters",
            },
          })}
          className=" text-lg px-4 py-2 border border-slate-300 rounded-md focus:outline focus:outline-blue-700 focus:border-white"
        />
        {errors?.username && (
          <span className="text-xs text-red-500 mt-1">
            {errors?.username?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", {
            required: { value: true, message: "email is required" },
          })}
          className=" text-lg px-4 py-2 border border-slate-300 rounded-md focus:outline focus:outline-blue-700 focus:border-white"
        />
        {errors?.email && (
          <span className="text-xs text-red-500 mt-1">
            {errors?.email?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: { value: true, message: "password is required" },
            minLength: {
              value: 8,
              message: "password must be at least 8 character long",
            },
            maxLength: {
              value: 16,
              message: "password can not exceed 16 characters",
            },
          })}
          className=" text-lg px-4 py-2 border border-slate-300 rounded-md focus:outline focus:outline-blue-700 focus:border-white"
        />
        {errors?.password && (
          <span className="text-xs text-red-500 mt-1">
            {errors?.password?.message}
          </span>
        )}
      </div>
      <Button label="Create account" type="primary" />
    </form>
  );
};

export default SignupForm;
