import React from "react";
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
    </>
  );
};
export default Main;
