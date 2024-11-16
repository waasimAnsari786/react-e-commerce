import React from "react";
import { Button, Container, MyTypoGraphy } from "../index";
import { useNavigate } from "react-router-dom";
import userRole from "../../appwrite/userRoleService";

export default function UserRoleSelect() {
  const navigate = useNavigate();

  const handleUserRole = (role) => {
    const getedUserRole = userRole.createUserRole(role);
    if (role === "admin" && userRole) {
      navigate("/admin");
    } else if (role === "buyer" && userRole) {
      navigate("/");
    }
  };

  return (
    <Container>
      <MyTypoGraphy myClass="text-2xl">
        Which type of role would you choose to exlore our website?
      </MyTypoGraphy>

      <MyTypoGraphy myClass="text-md">
        If you choose "Admin" you can add, update, delete, read/see products
        through your own dahsboard! On the other hand if you choose "Buyer" you
        can buy proucts from our website!
      </MyTypoGraphy>

      <Button onClick={() => handleUserRole("admin")}>Admin</Button>
      <Button onClick={() => handleUserRole("buyer")}>Buyer</Button>
    </Container>
  );
}
