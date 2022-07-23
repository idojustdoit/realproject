import React from "react";
import styled from "styled-components";

export const BasicBtn = () => {
  return (
    <div>
      <Button>스터디 종료</Button>
    </div>
  );
};

const Button = styled.button`
  border: none;
  outline: none;
  width: 90px;
  height: 35px;
  border-radius: 5px;
  background-color: #1D9FFD;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  margin: 15px;
`;
