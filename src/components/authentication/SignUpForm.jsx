import React from "react";
import { Container, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import auth from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import userRole from "../../appwrite/userRoleService";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const userAccount = await auth.createAccount({ ...data });
    if (userAccount) {
      console.log("user account geted");

      const getUser = auth.getCurrentUser();
      if (getUser) {
        dispatch(login(userAccount));
        // const createdUserRole = await userRole.createUserRole({
        //   role: data.role,
        //   email: data.email,
        // });
        // if (createdUserRole) {
        //   console.log(createdUserRole);
        //   console.log(userAccount);
        // }
        navigate("/");
      }
    }
  };

  return (
    <Container childElemClass="flex justify-center items-center h-screen ">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4 ">
          <Input
            label="Name :"
            placeholder="Your name"
            icon={<AiOutlineUser />}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must contain at least 3 characters",
              },
            })}
            error={errors.name && errors.name.message}
          />

          <Input
            label="Email :"
            placeholder="Your email"
            icon={<AiOutlineMail />}
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
            label="Password :"
            placeholder="Your password"
            icon={<AiOutlineLock />}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should at least 8 characters",
              },
            })}
            type="password"
            error={errors.password && errors.password.message}
          />

          <div className="flex space-x-3">
            <Input
              label="Admin :"
              {...register("role", {
                required: "User role is required!",
              })}
              type="radio"
              value="Admin"
              error={errors.role && errors.role.message}
              parentDiv=""
              inpClass="w-3 h-3 ms-3"
            />

            <Input
              label="Buyer :"
              {...register("role", {
                required: "User role is required!",
              })}
              type="radio"
              value="Buyer"
              error={errors.role && errors.role.message}
              parentDiv=""
              inpClass="w-3 h-3 ms-3"
            />
          </div>

          <Button myClass="w-full text-white bg-blue-500 hover:bg-blue-600">
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
