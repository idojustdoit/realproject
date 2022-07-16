import React from "react";
import styled from "styled-components";
import axios from "axios";
import { storage } from "../shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignUp = ({ onClose, LoginOpen }) => {
  const outZone_ref = React.useRef(null);
  const profile_ref = React.useRef(null); //유저 이미지 URL
  const [profile, setprofile] = React.useState(
    //유저 이미지 URL
    "https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg"
  );
  const [email, setemail] = React.useState(""); //email 인풋
  const [password, setPwd] = React.useState(""); //비밀번호 인풋
  const [passwordCheck, setpasswordCheck] = React.useState(""); //비밀번호 확인 인풋
  const [nickname, setNickName] = React.useState(""); //닉네임인풋

  //firebase 사용해서 url 추출
  const UpImageUrl = async (e) => {
    const upload_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    const file_url = await getDownloadURL(upload_file.ref);
    profile_ref.current = { url: file_url };
    setprofile(profile_ref.current.url);
  };

  // 회원가입 통신
  const signupdata = () => {
    axios({
      method: "POST",
      url: "/api/auth/signup",
      data: {
        email: email,
        password: password,
        passwordCheck: passwordCheck,
        nickname: nickname,
        iconUrl: profile,
      },
      baseURL: "http://3.35.26.55",
    })
      .then((response) => {
        console.log(response);

        alert("회원가입을 축하드립니다!!");
        onClose();
        LoginOpen();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handlerId = (e) => {
    setemail(e.target.value);
  };

  const handlerPw = (e) => {
    setPwd(e.target.value);
  };

  const handlerNickName = (e) => {
    setNickName(e.target.value);
  };

  const handlerPwcheck = (e) => {
    setpasswordCheck(e.target.value);
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
          <Title>회원가입</Title>
          <Line />
          <Label>
            <span>
              <img
                alt=""
                style={{
                  cursor: "pointer",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50px",
                  position: "relative",
                }}
                src={profile}
              />
              <img
                alt=""
                style={{
                  cursor: "pointer",
                  width: "28px",
                  borderRadius: "50px",
                  position: "absolute",
                  marginLeft: "-30px",
                  marginTop: "53px",
                }}
                src="https://www.shareicon.net/data/2017/05/09/885771_camera_512x512.png"
              />
              <Input
                style={{ display: "none" }}
                type="file"
                id="files"
                onChange={UpImageUrl}
              />
              <br />
            </span>
          </Label>
          <Label>
            <div>
              <Chat1>이메일</Chat1>

              <Input
                type="email"
                placeholder="abc@example.com"
                onChange={handlerId}
              />
            </div>
          </Label>

          <Label>
            <div>
              <Chat2>비밀번호</Chat2>
              <Input
                style={{ fontSize: "15px" }}
                type="password"
                onChange={handlerPw}
                placeholder="숫자, 영문, 특수문자 조합 최소 8자"
              />
            </div>
          </Label>
          <Label>
            <div>
              <Chat3></Chat3>
              <Input
                type="password"
                style={{ fontSize: "15px", marginRight: "8px" }}
                placeholder="비밀번호 확인"
                onChange={handlerPwcheck}
              />
            </div>
          </Label>
          <Label>
            <div>
              <Chat1>닉네임</Chat1>

              <Input type="text" onChange={handlerNickName} />
            </div>
          </Label>
          <LoginBtn>
            <Button1 onClick={signupdata}>회원가입</Button1> <br />
            <Button2
              onClick={() => {
                onClose();
              }}
            >
              취소
            </Button2>
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
  font-family: Pretendard;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  position: absolute;
  background-color: white;
  color: black;
  width: 458px;
  height: 672px;
  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: modal-show 0.5s;
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
  font-size: 26px;
  font-weight: bold;
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
  font-size: 18px;
  margin-right: 14px;
  vertical-align: middle;
`;
const Chat3 = styled.span`
  margin-right: 85px;
`;
const Input = styled.input`
  margin-top: 16px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 280px;
  height: 36px;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 1.33333333;
`;
const LoginBtn = styled.div``;

const Button1 = styled.button`
  margin-top: 42px;
  color: #fff;
  background-color: black;
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
  &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

const Button2 = styled.button`
  align-content: center;
  text-align: center;
  margin-top: 8px;
  color: black;
  background-color: white;
  border: none;
  font-size: 18px;
  font-weight: 900;
  width: 360px;
  height: 50px;
  border: 1px solid black;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export default SignUp;