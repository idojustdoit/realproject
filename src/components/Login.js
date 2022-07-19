import React from "react";
import styled from "styled-components";
import axios from "axios";
import kakao from "../shared/kakao.png";
import GoogleButton from "../pages/GoogleButton";

const Login = ({ onClose, SignOpen }) => {
  const outZone_ref = React.useRef(null); // 모달창이외에부분 지정

  const [username, setUserName] = React.useState(null); //email 아이디
  const [password, setPwd] = React.useState(null); // 비밀번호

  const handlerId = (e) => {
    setUserName(e.target.value);
  };

  const handlerPw = (e) => {
    setPwd(e.target.value);
  };

  //엔터키 작동
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      loginAxios();
    }
  };
  // 로그인 서버통신
  const loginAxios = () => {
    axios({
      method: "POST",
      url: "/api/auth/login",
      data: {
        username: username,
        password: password,
      },
      baseURL: "http://3.35.26.55",
    })
      .then(function (response) {
        console.log(response.data);
        alert(response.data.msg);
        axios.defaults.withCredentials = true;
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("userId", response.data.userId);
        onClose();
        // LoginCondition();
        window.location.reload();
      })
      .catch(function (error) {
        alert(error.response.data.msg);
        console.log(error);
      });
  };

  const kakaoUrl =
    "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b266efe96498090868c78833faf62705&redirect_uri=http://localhost:3000/Kakaologin";

  const MoveModal = () => {
    onClose();
    SignOpen();
  };

  return (
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
          <Label>
            <Title>로그인</Title>
            <Line />
            <div>
              <Chat1>ID</Chat1>
              <Input
                style={{ fontSize: "15px", marginLeft: "2px" }}
                type="email"
                id="email"
                placeholder="abc@example.com"
                onChange={handlerId}
                onKeyPress={onKeyPress}
              />
            </div>
          </Label>
          <Label>
            <div>
              <Chat2>PW</Chat2>
              <Input
                style={{ fontSize: "15px", marginTop: "7px" }}
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={handlerPw}
                onKeyPress={onKeyPress}
              />
            </div>
          </Label>
          <LoginBtn>
            <Button
              id="login_btn"
              onClick={loginAxios}
              disabled={username === "" || password === "" ? true : false}
            >
              로그인
            </Button>

            <LinkContainer>
              아직 스게더 회원이 아니신가요?
              <Letter id="signin_btn" onClick={MoveModal}>
                회원가입
              </Letter>
              후 이용해주세요.
            </LinkContainer>
            <a
              style={{
                width: "360px",
                height: "50px",
                marginBottom: "10px",
                marginTop: "24px",
              }}
              href={kakaoUrl}
            >
              <img
                alt=""
                style={{
                  width: "360px",
                  height: "50px",
                  marginBottom: "10px",
                  marginTop: "24px",
                }}
                src={kakao}
              />
            </a>
            <br />

            <GoogleButton />
          </LoginBtn>
        </ModalBlock>
      </Background>
    </Container>
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
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  position: absolute;
  background-color: white;
  color: black;
  width: 458px;
  height: 480px;
  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 35rem;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  margin-top: 24px;
`;

const Line = styled.hr`
  background-color: black;
  width: 360px;
  height: 2px;
  margin-top: 12px;
  margin-bottom: 32px;
`;

const Label = styled.label`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
`;

const Chat1 = styled.span`
  font-size: 20px;
  margin-right: 25px;
`;

const Chat2 = styled.span`
  font-size: 20px;
  margin-right: 14px;
  vertical-align: middle;
`;

const Input = styled.input`
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 290px;
  height: 36px;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 1.33333333;
`;

const LoginBtn = styled.div``;

const LinkContainer = styled.div`
  font-size: 12px;
  color: #616061;
  align-content: center;
`;

const Button = styled.button`
  margin-top: 42px;
  margin-bottom: 8px;
  color: #fff;
  background-color: ${(props) => (props.disabled ? "gray" : "#1D9FFD")};
  border: none;
  font-size: 18px;
  font-weight: 900;
  width: 360px;
  height: 50px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  ${(props) =>
    props.disabled
      ? ""
      : `&:hover {
  background-color: rgba(74, 21, 75, 0.9);
  border: none;
}`};
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

const Letter = styled.button`
  font-size: 13px;
  display: inline-block;
  font-weight: bold;
  color: blue;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;

  padding: 1px 2px 10px 2px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
