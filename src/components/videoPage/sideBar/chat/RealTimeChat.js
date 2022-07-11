import React, { useState } from "react";

import RealTimeChatList from "./RealTimeChatList";
import styled from "styled-components";
import io from "socket.io-client";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// http://13.124.252.225
const socket = io.connect("http://localhost:3001");

const RealTimeChat = () => {
  const [chatToggle, setChatToggle] = useState(true);

  const toggleHandler = () => {
    if (chatToggle) {
      setChatToggle(false);
    } else {
      setChatToggle(true);
    }
  };

  const [nick, setNick] = useState("");
  const [room, setRoom] = useState("");

  //임시
  const [roomToggle, setRoomToggle] = useState(false);

  const roomChange = (event) => {
    setRoom(event.target.value);
  };

  const nickChange = (event) => {
    setNick(event.target.value);
  };

  const openChat = () => {
    if (room !== "" && nick !== "") {
      socket.emit("join_room", nick, room);
    }
  };

  return (
    <ChatArea>
      <Title>
        <span
          onClick={() => {
            if (!roomToggle) {
              setRoomToggle(true);
            } else {
              setRoomToggle(false);
            }
          }}
        >
          그룹채팅 {room}
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
        {roomToggle && (
          <div
            style={{
              display: "flex",
              height: "25px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <input
              style={{ width: "inherit" }}
              value={room}
              onChange={roomChange}
              type="text"
              placeholder="Room name"
              required
            />
            <input
              style={{ width: "inherit" }}
              value={nick}
              onChange={nickChange}
              type="text"
              placeholder="Nickname"
              required
            />
            <button
              style={{ width: "100px" }}
              onClick={openChat}
              className="chat_button"
            >
              입장
            </button>
          </div>
        )}
        {chatToggle && (
          <RealTimeChatList socket={socket} nick={nick} room={room} />
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
