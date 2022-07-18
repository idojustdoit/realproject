import React, { useState } from "react";

import RealTimeChatList from "./RealTimeChatList";
import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// http://13.124.252.225

const RealTimeChat = ({socket, nick, roomId}) => {
  const [chatToggle, setChatToggle] = useState(true);

  const toggleHandler = () => {
    if (chatToggle) {
      setChatToggle(false);
    } else {
      setChatToggle(true);
    }
  };

  return (
    <ChatArea>
      <Title>
        <span
         
        >
          그룹채팅 {roomId}
        </span>
        {chatToggle ? (
          <IoIosArrowUp
            onClick={toggleHandler}
            style={{ position: "absolute", right: "25", cursor: "pointer" }}
          />
        ) : (
          <IoIosArrowDown
            onClick={toggleHandler}
            style={{ position: "absolute", right: "25", cursor: "pointer" }}
          />
        )}
      </Title>
      <Wrapper>
        {/* 임시 방 생성 */}

        {chatToggle && (
          <RealTimeChatList socket={socket} nick={nick} roomId={roomId} />
        )}
      </Wrapper>
    </ChatArea>
  );
};

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: inherit;
  height: 100%;
  min-height: 20vh;

  background-color: #e9e9e9;
  padding: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = styled.span`
  font-size: 1rem;
  width: 100%;
  font-weight: bold;
  text-align: center;
  background-color: black;
  color: white;
  padding: 10px;
`;

export default RealTimeChat;
