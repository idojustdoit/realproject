import React from "react";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

function Spinner() {
  return (
    <Cont>
      <PacmanLoader color="#4bb0f8" size={20} />
    </Cont>
  );
}

const Cont = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;
