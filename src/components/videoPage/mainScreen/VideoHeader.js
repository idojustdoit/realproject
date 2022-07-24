import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BasicBtn } from "../../../elements/Button";

import "../../../App.css";
import { ReactComponent as LogoIcon } from "../../../shared/header-assets/icon-logo-header.svg";

import { CSSTransition } from "react-transition-group";

const VideoHeader = ({ openBar, roomId }) => {
  const navigate = useNavigate();
  const duration = 700;

  return (
    <CSSTransition
      in={openBar}
      timeout={duration}
      classNames="header"
      unmountOnExit
    >
      <Head>
        <LogoIcon
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer", marginLeft: "40px" }}
        />
        <Logo>같이 소방9급 준비해요!</Logo>
        <BasicBtn roomId={roomId} />
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
