import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import styled from "styled-components";
import axios from "axios";
import Portal from "./Portal";

const Login = ({ onClose }) => {
  const cookies = new Cookies();

  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const outZone_ref = React.useRef();

  let [active, setActive] = React.useState(false);

  const [username, setUserName] = React.useState("");
  const [password, setPwd] = React.useState("");

  const ActiveIsPassedLogin = () => {
    return username.includes("@") && password.length >= 5
      ? setActive(true)
      : setActive(false);
  };

  const handlerId = (e) => {
    setUserName(e.target.value);
  };

  const handlerPw = (e) => {
    setPwd(e.target.value);
  };

  const loginAxios = () => {
    axios({
      method: "POST",
      url: "/login",
      data: {
        username: username,
        password: password,
      },
      baseURL: "http://13.124.252.225",
    })
      .then(function (response) {
        console.log(response);
        axios.defaults.withCredentials = true;
        alert(response.data.message);
        cookies.set("access_token", response.headers.authorization);
        navigate("/");
      })
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  //엔터키 작동
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      loginAxios();
    }
  };

  return (
    <Portal>
      <Container>
        <Background
          ref={outZone_ref}
          onClick={(e) => {
            if (outZone_ref.current === e.target) {
              onClose();
            }
          }}
        >
          <ModalBlock>
            <LinkContainer>
              Slack을 처음 사용하시나요? <br />
              <Link to="/signup">계정생성</Link>
            </LinkContainer>
            <Form>
              <Label>
                <span>이메일 주소</span>
                <div>
                  <Input
                    type="email"
                    id="email"
                    placeholder="abc@example.com"
                    ref={id_ref}
                    onChange={handlerId}
                    onKeyUp={ActiveIsPassedLogin}
                    onKeyPress={onKeyPress}
                  />
                </div>
              </Label>
              <Label>
                <span>비밀번호</span>
                <div>
                  <Input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해주세요"
                    ref={pw_ref}
                    onChange={handlerPw}
                    onKeyUp={ActiveIsPassedLogin}
                    onKeyPress={onKeyPress}
                  />
                </div>
              </Label>

              <Button
                id="login_btn"
                onClick={loginAxios}
                className={active ? "ActiveLoginBtn" : "LoginBtn"}
                disabled={username === "" || password === "" ? true : false}
              >
                로그인
              </Button>
            </Form>
          </ModalBlock>
        </Background>
      </Container>
    </Portal>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

const ModalBlock = styled.div`
  position: absolute;
  top: 6.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: white;
  color: black;
  width: 700px;
  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Form = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Button = styled.button``;

export const LinkContainer = styled.p``;
export default Login;
