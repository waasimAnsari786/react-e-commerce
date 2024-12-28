// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Container, MyTypoGraphy, Button, Input } from "../index";
// import { useDispatch, useSelector } from "react-redux";
// import auth from "../../appwrite/authService";
// import { toast } from "react-toastify";
// import { FaEdit } from "react-icons/fa";
// import userRoleService from "../../appwrite/userRoleService";
// import { login } from "../../features/authSlice";
// import {
//   deleteProfileImageThunk,
//   uploadProfileImageThunk,
// } from "../../features/profileImagesSlice";

// export default function ProfileSection() {
//   const { userData } = useSelector((state) => state.auth);
//   const { profileImageObj } = useSelector((state) => state.profileImage);
//   const { name, email, profileImage, userRole, userRoleId, $id } = userData;
//   const [editField, setEditField] = useState(""); // Tracks the field being edited
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const { newEmail, password, newPassword, oldPassword, name } = data;
//     const updatedUserData = { ...userData };
//     let result;
//     if (editField === "email") {
//       result = await auth.updateEmail({ newEmail, password });
//       updatedUserData.email = result.email;
//     }
//     if (editField === "password") {
//       result = await auth.updatePassword({ newPassword, oldPassword });
//     }
//     if (editField === "name") {
//       result = await auth.updateName(name);
//       updatedUserData.name = result.name;
//     }
//     if (editField === "profileImage") {
//       const fileObj = await dispatch(
//         uploadProfileImageThunk(data.profileImage[0])
//       ).unwrap();
//       if (fileObj) {
//         data.profileImage = fileObj.$id;
//         updatedUserData.profileImage = fileObj.$id;
//         if (userData.profileImage !== "675d310200015bc6b652") {
//           dispatch(deleteProfileImageThunk(userData.profileImage));
//         }
//         const updatedUserRole = userRoleService.updateUserRole({
//           role: userRole,
//           userId: $id,
//           userRoleId,
//           profileImage: data.profileImage,
//         });
//         result = updatedUserRole;
//       }
//     }
//     if (result) {
//       toast.success("Profile updated successfully!");
//     }
//     dispatch(login(updatedUserData));
//     reset();
//     setEditField("");
//   };

//   return (
//     <Container childElemClass="mx-auto">
//       {/* User Image Section */}
//       <div className="w-full lg:w-1/2 flex justify-center relative">
//         <img
//           src={profileImageObj?.URL}
//           alt="User Profile"
//           className="rounded-full w-40 h-40 object-cover shadow-lg"
//         />
//         <Button
//           myClass="flex items-center gap-2"
//           onClick={() => setEditField("profileImage")}
//         >
//           <FaEdit /> Edit
//         </Button>
//       </div>

//       {/* User Data Section */}
//       <div className="w-full lg:w-1/2 space-y-4">
//         <div className="flex items-center">
//           <MyTypoGraphy myClass="text-xl font-semibold text-gray-800">
//             {name}
//           </MyTypoGraphy>
//           <Button
//             myClass="flex items-center gap-2"
//             onClick={() => setEditField("name")}
//           >
//             <FaEdit /> Edit
//           </Button>
//         </div>

//         <div className="flex items-center">
//           <MyTypoGraphy myClass="text-xl font-semibold text-gray-800">
//             {email}
//           </MyTypoGraphy>
//           <Button
//             myClass="flex items-center gap-2"
//             onClick={() => setEditField("email")}
//           >
//             <FaEdit /> Edit
//           </Button>
//         </div>

//         <div className="flex items-center">
//           <MyTypoGraphy myClass="text-xl font-semibold text-gray-800">
//             ****** (Password)
//           </MyTypoGraphy>
//           <Button
//             myClass="flex items-center gap-2"
//             onClick={() => setEditField("password")}
//           >
//             <FaEdit /> Edit
//           </Button>
//         </div>
//       </div>

//       {/* Conditional Form Section */}
//       {editField && (
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg space-y-4"
//         >
//           {editField === "email" && (
//             <>
//               <Input
//                 label="New Email"
//                 type="email"
//                 {...register("newEmail", { required: "Email is required" })}
//                 error={errors.newEmail?.message}
//               />
//               <Input
//                 label="Current Password"
//                 type="password"
//                 {...register("password", { required: "Password is required" })}
//                 error={errors.password?.message}
//               />
//             </>
//           )}

//           {editField === "password" && (
//             <>
//               <Input
//                 label="Old Password"
//                 type="password"
//                 {...register("oldPassword", {
//                   required: "Old Password is required",
//                 })}
//                 error={errors.oldPassword?.message}
//               />
//               <Input
//                 label="New Password"
//                 type="password"
//                 {...register("newPassword", {
//                   required: "New Password is required",
//                 })}
//                 error={errors.newPassword?.message}
//               />
//             </>
//           )}

//           {editField === "profileImage" && (
//             <>
//               <Input
//                 label="Upload Profile Image"
//                 type="file"
//                 {...register("profileImage", {
//                   required: "Profile Image is required",
//                 })}
//                 error={errors.profileImage?.message}
//               />
//             </>
//           )}

//           {editField === "name" && (
//             <>
//               <Input
//                 label="Name"
//                 {...register("name", {
//                   required: "Name is required",
//                 })}
//                 error={errors.name?.message}
//               />
//             </>
//           )}

//           <div className="flex justify-end space-x-4">
//             <Button
//               onClick={() => {
//                 setEditField("");
//                 reset();
//               }}
//             >
//               Cancel
//             </Button>
//             <Button type="submit">Submit</Button>
//           </div>
//         </form>
//       )}
//     </Container>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, MyTypoGraphy, Button, Input } from "../index";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../appwrite/authService";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import userRoleService from "../../appwrite/userRoleService";
import { login } from "../../features/authSlice";
import {
  deleteProfileImageThunk,
  uploadProfileImageThunk,
} from "../../features/profileImagesSlice";

export default function ProfileSection() {
  const { userData } = useSelector((state) => state.auth);
  const { profileImageObj } = useSelector((state) => state.profileImage);
  const { name, email, profileImage, userRole, userRoleId, $id } = userData;
  const [editField, setEditField] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { newEmail, password, newPassword, oldPassword, name } = data;
    const updatedUserData = { ...userData };
    let result;

    if (editField === "email") {
      result = await auth.updateEmail({ newEmail, password });
      updatedUserData.email = result.email;
    }
    if (editField === "password") {
      result = await auth.updatePassword({ newPassword, oldPassword });
    }
    if (editField === "name") {
      result = await auth.updateName(name);
      updatedUserData.name = result.name;
    }
    if (editField === "profileImage") {
      const fileObj = await dispatch(
        uploadProfileImageThunk(data.profileImage[0])
      ).unwrap();
      if (fileObj) {
        data.profileImage = fileObj.$id;
        updatedUserData.profileImage = fileObj.$id;
        if (userData.profileImage !== "default-image-id") {
          dispatch(deleteProfileImageThunk(userData.profileImage));
        }
        const updatedUserRole = userRoleService.updateUserRole({
          role: userRole,
          userId: $id,
          userRoleId,
          profileImage: data.profileImage,
        });
        result = updatedUserRole;
      }
    }

    if (result) {
      toast.success("Profile updated successfully!");
    }
    dispatch(login(updatedUserData));
    reset();
    setEditField("");
  };

  return (
    <Container childElemClass="max-w-xl mx-auto pt-32">
      <div className="bg-amber-800 text-white rounded-lg shadow-lg p-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={profileImageObj?.URL || "/default-profile.png"}
            alt="User Profile"
            className="rounded-full w-32 h-32 object-cover mb-4"
          />
          <Button
            myClass="flex items-center gap-2 text-sm"
            bgColor="bg-white"
            textColor="text-amber-700"
            onClick={() => setEditField("profileImage")}
          >
            <FaEdit /> Edit Profile Image
          </Button>
        </div>

        {/* User Information */}
        <div className="mt-6 space-y-4">
          {/* Name */}
          <div className="flex justify-between items-center">
            <MyTypoGraphy myClass="text-lg font-medium">{name}</MyTypoGraphy>
            <Button
              myClass="flex items-center gap-2 text-sm"
              bgColor="bg-white"
              textColor="text-amber-700"
              onClick={() => setEditField("name")}
            >
              <FaEdit /> Edit
            </Button>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <MyTypoGraphy myClass="text-lg font-medium">{email}</MyTypoGraphy>
            <Button
              myClass="flex items-center gap-2 text-sm"
              bgColor="bg-white"
              textColor="text-amber-700"
              onClick={() => setEditField("email")}
            >
              <FaEdit /> Edit
            </Button>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <MyTypoGraphy myClass="text-lg font-medium">********</MyTypoGraphy>
            <Button
              myClass="flex items-center gap-2 text-sm"
              bgColor="bg-white"
              textColor="text-amber-700"
              onClick={() => setEditField("password")}
            >
              <FaEdit /> Edit
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        {editField && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner space-y-4"
          >
            {editField === "email" && (
              <>
                <Input
                  placeholder="Enter New Email"
                  type="email"
                  {...register("newEmail", { required: "Email is required" })}
                  error={errors.newEmail?.message}
                />
                <Input
                  placeholder="Enter Current Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={errors.password?.message}
                />
              </>
            )}

            {editField === "password" && (
              <>
                <Input
                  placeholder="Enter Old Password"
                  type="password"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                  error={errors.oldPassword?.message}
                />
                <Input
                  placeholder="Enter New Password"
                  type="password"
                  {...register("newPassword", {
                    required: "New Password is required",
                  })}
                  error={errors.newPassword?.message}
                />
              </>
            )}

            {editField === "profileImage" && (
              <>
                <MyTypoGraphy myClass="text-amber-700">
                  Upload Your Image
                </MyTypoGraphy>

                <Input
                  type="file"
                  {...register("profileImage", {
                    required: "Profile Image is required",
                  })}
                  error={errors.profileImage?.message}
                />
              </>
            )}

            {editField === "name" && (
              <>
                <Input
                  placeholder="Write your new name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  error={errors.name?.message}
                />
              </>
            )}

            <div className="flex justify-end gap-4">
              <Button
                bgColor="hover:bg-amber-800 bg-transparent"
                myClass="border-2 border-amber-800 font-semibold"
                textColor="text-amber-700 hover:text-white"
                onClick={() => {
                  setEditField("");
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                bgColor="bg-amber-800 hover:bg-transparent"
                myClass="border-2 border-amber-800 font-semibold"
                textColor="hover:text-amber-700"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}
