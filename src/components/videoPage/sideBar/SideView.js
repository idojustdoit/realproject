import React from "react";
import RealTimeChat from "./chat/RealTimeChat";
import Todo from "./todo/Todo";
import "../../../App.css";

import { CSSTransition } from "react-transition-group";

import styled from "styled-components";

const SideView = ({ openBar, socket, nick, room }) => {
  const duration = 700;

  return (
    <>
      <CSSTransition
        in={openBar}
        timeout={duration}
        classNames="sidebar"
        unmountOnExit
      >
        <SideBar>
          <Wrapper>
            {/* components */}
            <Todo />
            <RealTimeChat socket={socket} nick={nick} room={room} />
            {/* components */}
          </Wrapper>
        </SideBar>
      </CSSTransition>
    </>
  );
};

const SideBar = styled.div`
  visibility: ${(props) => (props.BarState ? "hidden" : "visible")};
  display: ${(props) => (props.BarState ? "none" : "flex")};
  width: 30vw;
  max-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: lavender;
`;
export default SideView;
