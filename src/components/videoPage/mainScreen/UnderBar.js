import React from "react";
import styled from "styled-components";

import { BsChatFill } from "react-icons/bs";
import { AiFillAudio } from "react-icons/ai";
import { TbVideo } from "react-icons/tb";

const UnderBar = ({ openBar, sideBarHandler, cameraHandler, audioHandler, videoState, audioState }) => {
  return (
    <PlusBar openBar={openBar}>
      <SideBtn className="side_btn" openBar={openBar}>
        <Icon>
          <AiFillAudio onClick={audioHandler} />
          {audioState? <span>마이크 off</span> : <span>마이크 on</span>}
        </Icon>
        <Icon>
          <TbVideo onClick={cameraHandler} />
          {videoState ? <span>비디오 off</span> : <span>비디오 on</span>}
        </Icon>

        <Icon>
          <BsChatFill onClick={sideBarHandler} />
          <Alert />
          {openBar ? <span>채팅 닫기</span> : <span>채팅 열기</span>}
        </Icon>
      </SideBtn>
    </PlusBar>
  );
};

const PlusBar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 560px;
  align-items: center;
  padding: 5px;
  height: ${(props) => (!props.openBar ? "10px" : "10vh")};
  justify-content: center;
  background-color: ${(props) => (!props.openBar ? "#FFFFFF" : "#333333")};
  margin-bottom: 30px;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  &:hover .side_btn {
    opacity: 1;
  }
  &:hover {
    height: 10vh;
    background-color: #333333;
  }
`;

const SideBtn = styled.div`
  display: flex;
  transition: all 0.5s ease-in-out;
  opacity: ${(props) => (!props.openBar ? "0" : "1")};
  color: white;
  gap: 15px;
  cursor: pointer;
`;

const Icon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-size: 30px;
  span {
    font-size: 15px;
  }
`;

const Alert = styled.div`
  position: absolute;
  background-color: tomato;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  right: 7px;
  top: -3px;
`;
export default UnderBar;
