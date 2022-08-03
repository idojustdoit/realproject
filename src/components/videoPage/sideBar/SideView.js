import React from "react";
import RealTimeChat from "./chat/RealTimeChat";
import Todo from "./todo/Todo";
import "../../../App.css";

import { CSSTransition } from "react-transition-group";

import styled from "styled-components";

const SideView = ({ openBar, socket, nick, roomId }) => {
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
            <Todo roomId={roomId}/>
            <RealTimeChat socket={socket} nick={nick} roomId={roomId} />
            {/* components */}
          </Wrapper>
        </SideBar>
      </CSSTransition>
    </>
  );
};

const SideBar = styled.div`
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
