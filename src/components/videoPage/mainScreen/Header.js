import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../elements/Button";

const Header = () => {
  return (
    <Head>
      <Logo>SGETHER</Logo>
      <h2>Study Title</h2>
      <BasicBtn />
    </Head>
  );
};

export default Header;

const Head = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Logo = styled.span`
  margin: 15px;
  font-size: 1.5rem;
  color: gray;
  font-weight: bold;
`;
