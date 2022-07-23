import React from "react";
import styled from "styled-components";

import { BsChatDots, BsChatDotsFill } from "react-icons/bs";

const UnderBar = ({openBar, sideBarHandler}) => {
    return(
        <PlusBar openBar={openBar}>
            <SideBtn
              className="side_btn"
              openBar={openBar}
              onClick={sideBarHandler}
            >
              {openBar ? (
                <MessageIcon>
                  <BsChatDots />
                  <Alert />
                  <span>채팅 닫기</span>
                </MessageIcon>
              ) : (
                <MessageIcon>
                  <BsChatDotsFill />
                  <Alert />
                  <span>채팅 열기</span>
                </MessageIcon>
              )}
            </SideBtn>
          </PlusBar>
    );
}

const PlusBar = styled.div`
  position:fixed;
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
    height: 90px;
  }
`;

const SideBtn = styled.div`
  transition: all 0.5s ease-in-out;
  opacity: ${(props) => (!props.openBar ? "0" : "1")};
  font-size: 30px;
  color: white;
  cursor: pointer;
`;

const MessageIcon = styled.div`
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