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
  width: ${(props) => (props.BarState ? "35% + 30px" : "100%")};
  height: calc((100vh - 277px) / 2);
  background-color: pink;
`;

export default UserScreens;
