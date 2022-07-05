import React, { useState } from "react";

import RealTimeChatList from "./RealTimeChatList";
import styled from "styled-components";
import io from "socket.io-client";
// http://13.124.252.225
const socket = io.connect("http://localhost:3001");

const RealTimeChat = () => {
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
      <Wrapper>
        <Title
          onClick={() => {
            if (!roomToggle) {
              setRoomToggle(true);
            } else {
              setRoomToggle(false);
            }
          }}
        >
          Chat (Room: {room})
        </Title>
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

        <RealTimeChatList socket={socket} nick={nick} room={room} />
      </Wrapper>
    </ChatArea>
  );
};

const ChatArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 60%;
  background-color: tomato;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  background-color: teal;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  background-color: black;
  color: white;
  padding: 10px 0;
`;

export default RealTimeChat;
