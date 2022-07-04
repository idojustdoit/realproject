import React from "react";
import RealTimeChat from "./chat/RealTimeChat";
import Todo from "./todo/Todo";

import styled from "styled-components";

const SideView = ({ openBar }) => {
  return (
    <>
      <SideBar BarState={!openBar}>
        <Wrapper>
          {/* components */}
          <Todo />
          <RealTimeChat />
          {/* components */}
        </Wrapper>
      </SideBar>
    </>
  );
};

const SideBar = styled.div`
  display: ${(props) => (props.BarState ? "none" : "")};
  width: 30%;
  animation: ${(props) => (props.BarState ? "bar-hidden" : "bar-show")} 0.3s;

  @keyframes bar-show {
    0% {
      margin-right: -500px;
    }
    100% {
      margin-right: 0;
    }
  }

  @keyframes bar-hidden {
    0% {
      margin-right: 0;
    }
    100% {
      margin-right: -500px;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: lavender;
`;
export default SideView;
