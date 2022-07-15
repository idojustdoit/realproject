import React from "react";
import styled from "styled-components";
import { BasicBtn } from "../../../elements/Button";

import "../../../App.css";

import { CSSTransition } from "react-transition-group";

const VideoHeader = ({openBar}) => {

  const duration = 700;
  return (
    <CSSTransition
        in={openBar}
        timeout={duration}
        classNames="header"
        unmountOnExit
      >

    <Head>
      <Logo>SGETHER</Logo>
      <h2>Study Title</h2>
      <BasicBtn />
    </Head>
      </CSSTransition>
  );
};

const Head = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 99;
`;

const Logo = styled.span`
  margin: 15px;
  font-size: 1.5rem;
  color: gray;
  font-weight: bold;
`;

export default VideoHeader;

