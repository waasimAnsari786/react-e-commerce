import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Input, Button, MyTypoGraphy } from "../index";
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
    toast.promise(
      (async () => {
        const userAccount = await auth.logInAccount({ ...data });
        if (userAccount) {
          const getUser = await auth.getCurrentUser();
          if (getUser) {
            const getedUserRole = await userRole.getUserRole(getUser.$id);
            getUser.userRole = getedUserRole.documents[0].role;
            getUser.profileImage = getedUserRole.documents[0].profileImage;
            getUser.userRoleId = getedUserRole.documents[0].$id;
            dispatch(login(getUser));
            if (getedUserRole && getedUserRole.documents[0].role === "Admin") {
              navigate("/admin/dashboard");
            } else if (
              getedUserRole &&
              getedUserRole.documents[0].role === "Buyer"
            ) {
              navigate("/");
            }
          }
        }
      })(),
      {
        pending: "Logging in...",
        success: "Login Successfully! 🎉",
      }
    );
  };

  return (
    <Container childElemClass="flex items-center justify-center h-screen flex-col">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md rounded-lg shadow-lg p-6 sm:p-8 mt-32 bg-amber-800"
      >
        <img
          src="/logo/fulllogo_transparent_nobuffer.png"
          className="w-1/2 mx-auto mb-5"
          alt="logo"
        />
        <h2 className="text-2xl font-semibold text-center mb-6 text-white ">
          Login
        </h2>

        <Input
          label="Email:"
          placeholder="Your email"
          icon={<MdOutlineMailOutline className="text-amber-800" />}
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
          icon={<CiLock className="text-amber-800" />}
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

        <div className="flex justify-center mt-5">
          <Button
            myClass="mx-auto border-2 border-white hover:bg-transparent hover:text-white"
            bgColor="bg-white"
            textColor="text-amber-800"
          >
            Login
          </Button>
        </div>
      </form>

      <MyTypoGraphy myClass="mt-10 text-amber-800">
        Don't Have an account?{" "}
        <NavLink className="underline" to="/signup">
          Sign Up
        </NavLink>
      </MyTypoGraphy>
    </Container>
  );
}
