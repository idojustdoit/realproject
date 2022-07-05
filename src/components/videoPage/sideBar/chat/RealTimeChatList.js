import React, { useState, useEffect } from "react";
import styled from "styled-components";

const RealTimeChatList = ({ socket, nick, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const getUserName = localStorage.getItem("username");

  const inputChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: nick,
        message: currentMessage,
        time:
          //시, 분 2자리로 표시 - padStart 사용
          String(new Date(Date.now()).getHours()).padStart(2, "0") +
          ":" +
          String(new Date(Date.now()).getMinutes()).padStart(2, "0"),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [messageData, ...list]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(`receive_message(on): ${data.message}`);
      setMessageList((list) => [data, ...list]);
    });
    socket.on("welcome", (data) => {
      console.log(`welcome(on): ${data}`);
      setMessageList((list) => [data, ...list]);
    });
    socket.on("bye", (data) => {
      console.log(`bye(on): ${data}`);
      setMessageList((list) => [{ message: "님이 퇴장하셨습니다." }, ...list]);
    });
  }, [socket]);

  return (
    <>
      <ChatList>
        {messageList.map((messageContent, idx) => {
          return (
            <div key={idx} className="message">
              {messageContent.author === nick ? (
                <Message state={nick === messageContent.author && nick}>
                  {/* 같은 유저가 보낼때 메세지, 시간만 전송(my chat) */}
                  {idx >= 0 &&
                  messageList[idx]?.author !== messageList[idx + 1]?.author ? (
                    <div className="msg_items">
                      <div className="user_img"></div>
                      <div className="nickname">{messageContent.author}</div>
                    </div>
                  ) : null}
                  {/* 같은 유저가 보낼때 메세지, 시간만 전송(my chat) */}

                  <div className="msg_line">
                    <span className="time">{messageContent.time}</span>
                    <div className="message">{messageContent.message}</div>
                  </div>
                </Message>
              ) : !messageContent.message ? (
                // 유저가 방에 들어올 때 알림
                <p className="enter_and_exit">
                  {messageContent.author}님이 입장하셨습니다.👀
                </p>
              ) : messageContent.message === "님이 퇴장하셨습니다." ? (
                // 유저가 퇴장할 때 알림
                <p className="enter_and_exit">
                  {getUserName || "익명 사용자"}
                  {messageContent.message}😢
                </p>
              ) : (
                <Message>
                  {/* 같은 유저가 보낼때 메세지, 시간만 전송(friend chat) */}
                  {idx >= 0 &&
                  messageList[idx]?.author !== messageList[idx + 1]?.author ? (
                    <div className="msg_items">
                      <div className="user_img"></div>
                      <div className="nickname">{messageContent.author}</div>
                    </div>
                  ) : null}
                  {/* 같은 유저가 보낼때 메세지, 시간만 전송(friend chat) */}

                  <div className="msg_line">
                    <div className="message">{messageContent.message}</div>
                    <span className="time">{messageContent.time}</span>
                  </div>
                </Message>
              )}
            </div>
          );
        })}
      </ChatList>

      <MessageForm onSubmit={sendMessage}>
        <div>
          <input
            onChange={inputChange}
            value={currentMessage}
            type="text"
            placeholder="메세지를 입력해 주세요."
          />
          <button>전송</button>
        </div>
      </MessageForm>
    </>
  );
};

const ChatList = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: wheat;
  display: flex;
  flex-direction: column-reverse;
  border: 2px solid rgb(192, 192, 192);
  background-color: #e7e7e7;
  overflow-y: auto;
  box-sizing: border-box;
  .enter_and_exit {
    text-align: center;
  }
`;

const MessageForm = styled.form`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  div {
    display: flex;
    width: inherit;
    height: 30px;
    margin: 10px;
    gap: 10px;
  }
  input {
    box-sizing: border-box;
    width: inherit;
    border-radius: 5px;
    border: none;
  }
  button {
    width: 70px;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`;

const Message = styled.div`
  .msg_items {
    display: flex;
    justify-content: ${(props) => (props.state ? "flex-end" : "flex-start")};
    align-items: center;
    gap: 10px;
    width: 100%;
    word-wrap: break-word;
    margin-bottom: 7px;
  }
  .user_img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: lightgray;
  }
  .nickname {
    font-size: 1rem;
    font-weight: bold;
  }
  .time {
    display: none;
    justify-content: ${(props) => (props.state ? "flex-end" : "flex-start")};
    .message:hover {
      color: red;
    }
  }
  .message {
    max-width: 70%;
    color: ${(props) => (props.state ? "black" : "white")};
    background-color: ${(props) => (props.state ? "#f1c40f" : "#95a5a6")};
    border-radius: 10px;
    padding: 10px;
    word-break: break-all;
    line-height: 1.3;
  }

  .msg_line {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: ${(props) => (props.state ? "flex-end" : "flex-start")};
    align-items: flex-end;
    margin-bottom: 7px;
    transition: all 0.3s ease-in-out;
    &:hover .message {
      opacity: 0.7;
    }
    &:hover .time {
      display: flex;
    }
  }
`;

export default RealTimeChatList;
