import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import auth from "../../appwrite/authService";
import { login } from "../../features/authSlice";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { toast } from "react-toastify";
import userRole from "../../appwrite/userRoleService";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const userAccount = await auth.logInAccount({ ...data });
    const getedUserRole = await userRole.getUserRole();

    if (userAccount && getedUserRole) {
      const getUser = await auth.getCurrentUser();
      if (getUser) {
        toast.success("Login Successfully!");
        dispatch(login(userAccount));
        navigate("/");
      }
    }
  };

  return (
    <Container childElemClass="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md rounded-lg shadow-lg p-6 sm:p-8 bg-white bg-opacity-20 backdrop-blur-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <Input
          label="Email:"
          placeholder="Your email"
          icon={<MdOutlineMailOutline className="text-black" />}
          {...register("email", {
            required: "Email is required",
            validate: {
              pattern: (value) =>
                /^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z\d]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/.test(
                  value
                ) || "Email address must be a valid address",
            },
          })}
          type="email"
          error={errors.email && errors.email.message}
        />

        <Input
          label="Password:"
          placeholder="Your password"
          icon={<CiLock className="text-black" />}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
          })}
          type="password"
          error={errors.password && errors.password.message}
        />

        <Button myClass="w-full">Login</Button>
      </form>
    </Container>
  );
}
