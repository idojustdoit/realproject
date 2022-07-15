import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/Signup";
import Portal from "../components/Portal";
import LogIn from "../components/Login";

const Main = (props) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const LoginModal = () => {
    setOpen(!open);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const [nick, setNick] = useState("");
  const [room, setRoom] = useState("");

  //임시

  const roomChange = (event) => {
    setRoom(event.target.value);
  };

  const nickChange = (event) => {
    setNick(event.target.value);
  };

  const openChat = () => {
    if (room !== "" && nick !== "") {
      navigate("/video", { state: { nick: nick, room: room } });
    }
  };

  return (
    <>
      <button onClick={LoginModal}> 로그인 </button>
      <Portal>{open && <LogIn onClose={LoginModal} />}</Portal>

      <button onClick={handleModal}> 회원가입 </button>
      <Portal>{isOpen && <SignUp onClose={handleModal} />}</Portal>
      <button
        onClick={() => {
          navigate("/video");
        }}
      >
        화상채팅
      </button>

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
        <h1>오현쓰</h1>
      </div>
    </>
  );
};
// export default Main;
