import React from "react";
import UserScreen from "./UserScreen";
import styled from "styled-components";

const UserScreens = () => {
  return (
    <Wrapper>
      {/* video 화면 */}
      <UserScreen />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: pink;
`;

export default UserScreens;
