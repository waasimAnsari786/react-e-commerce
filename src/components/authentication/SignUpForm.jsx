import React from "react";
import { Container, Input, Button, MyTypoGraphy } from "../index";
import { useForm } from "react-hook-form";
import auth from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import userRole from "../../appwrite/userRoleService";
import { NavLink } from "react-router-dom";

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
      const getUser = await auth.getCurrentUser();
      if (getUser) {
        const createdUserRole = await userRole.createUserRole({
          role: data.role,
          userId: getUser.$id,
        });
        getUser.userRole = data.role;
        getUser.profileImage = "675d310200015bc6b652";
        getUser.userRoleId = createdUserRole.$id;
        if (createdUserRole) {
          dispatch(login(getUser));
          if (data.role === "Admin") {
            navigate("/admin/dashboard");
          } else if (data.role === "Buyer") {
            navigate("/");
          }
          toast.success("Signup Successfully");
        }
      }
    }
  };

  return (
    <Container childElemClass="flex justify-center items-center flex-col pt-32">
      {/* <div className="bg-amber-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white"> */}
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="space-y-4 bg-amber-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white"
      >
        <img
          src="/logo/fulllogo_transparent_nobuffer.png"
          className="w-1/2 mx-auto mb-5"
          alt="logo"
        />
        <h2 className="text-center text-2xl font-semibold mb-6">
          Create an Account
        </h2>
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

        <div className="flex justify-center mt-5">
          <Button
            myClass="mx-auto border-2 border-white hover:bg-transparent hover:text-white"
            bgColor="bg-white"
            textColor="text-amber-800"
          >
            Signin
          </Button>
        </div>
      </form>
      {/* </div> */}
      <MyTypoGraphy myClass="mt-10 text-amber-800">
        If you have an account,{" "}
        <NavLink className="underline" to="/login">
          Login
        </NavLink>
      </MyTypoGraphy>
    </Container>
  );
}
