import React from "react";
import styled from "styled-components";

import { async } from "@firebase/util";

export const BasicBtn = ({ exitRoomHandler }) => {
  return (
    <div>
      <Button onClick={exitRoomHandler}>스터디 종료</Button>
    </div>
  );
};

const Button = styled.button`
  border: none;
  outline: none;
  width: 90px;
  height: 35px;
  border-radius: 5px;
  background-color: #1d9ffd;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  margin: 15px;
`;
