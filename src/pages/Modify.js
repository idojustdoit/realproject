import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/mainpage/Header";
import Footer from "../components/mainpage/Footer";

function Modify() {
  const navigate = useNavigate();

  const imgUrl_ref = React.useRef(null);     //이미지url
  const [imgUrl, setimgUrl] = React.useState(
        //이미지url
    "https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg"
  );
  // const [email, setemail] = React.useState(""); //이메일 인풋
  const [password, setpassword] = React.useState(""); // 비밀번호 인풋
  const [passwordCheck, setpasswordCheck] = React.useState(""); //비밀번호 확인 인풋
  const [nickname, setNickname] = React.useState(""); //닉네임 인풋

  const UpImageUrl = async (e) => {
    setimgUrl(imgUrl_ref.current.url);
  };

  //해당회원의 정보요청
  const originData = () => {
    axios.defaults.withCredentials = true;
    axios({
      method: "get",
      url: "/api/mypage/update/",
      baseURL: "http://localhost:5001",

      // headers: {
      //   authorization: localStorage.getItem("access_token"),
    })
      .then((response) => {
        console.log(response);
        setimgUrl(response.data.iconUrl);
        setNickname(response.data.nickname);
        setpassword(response.data.password);
        setpasswordCheck(response.data.passwordCheck);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  // 페이지가 나오자마자 회원정보 불러오기 및 삭제
  // useEffect(() => {
  //   originData();
  // }, []);

  //수정할 회원정보 등록
  const signupdata = () => {
    axios({
      method: "PUT",
      url: "/api/mypage/update/",
      data: {
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
        iconUrl: imgUrl,
      },
      baseURL: "http://3.35.26.55",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  // const handlerId = (e) => {
  //   setemail(e.target.value);
  // };

  const handlerPw = (e) => {
    setpassword(e.target.value);
  };

  const handlernickname = (e) => {
    setNickname(e.target.value);
  };

  const handlerPwcheck = (e) => {
    setpasswordCheck(e.target.value);
  };

  return (
    <div style={{ width: "1920px", backgroundColor: "lightgray" }}>
      <Background>
        <Header />
        <ModalBlock>
          <Title>개인정보 수정</Title>
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
                src={imgUrl}
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
                id="file"
                onChange={UpImageUrl}
              />
              <br />
            </span>
          </Label>
          {/* <Label>
          <div>
            <Chat1>이메일</Chat1>

            <Input type="email" onChange={handlerId} value={email} />
          </div>
        </Label> */}
          <Label>
            <div>
              <Chat1>닉네임</Chat1>

              <Input type="text" onChange={handlernickname} value={nickname} />
            </div>
          </Label>
          <Label>
            <div>
              <Chat2>비밀번호</Chat2>
              <Input
                style={{ fontSize: "15px" }}
                onChange={handlerPw}
                value={password}
              />
            </div>
          </Label>
          <Label>
            <div>
              <Chat3></Chat3>
              <Input
                type="password"
                style={{ fontSize: "15px" }}
                onChange={handlerPwcheck}
                value={passwordCheck}
              />
            </div>
          </Label>

          <LoginBtn>
            <Button1 onClick={signupdata}>변경사항 저장</Button1> <br />
            <Button2
              onClick={() => {
                navigate("/");
              }}
            >
              취소
            </Button2>
          </LoginBtn>
        </ModalBlock>
      </Background>
      <Footer />
    </div>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;

  align-content: center;
  text-align: center;
`;
const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  background-color: white;
  color: black;
  width: 458px;
  height: 610px;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px gray;
  margin-top: 20px;
  margin-bottom: 20px;
  transform: translate(150%, 0%);
  margin-top: 50px;
  margin-bottom: 50px;
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
export default Modify;
