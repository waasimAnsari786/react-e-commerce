import React from "react";
import { Container } from "../index";
import BounceLoader from "react-spinners/BounceLoader";

export default function Loader() {
  return (
    <Container childElemClass="h-screen w-full flex justify-center items-center">
      <BounceLoader color="#290517" size={40} data-testid="loader" />
    </Container>
  );
}
