import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import userprofile from "../shared/userprofile.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Modify() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const profile_ref = React.useRef(null); //이미지url
  const formData = new FormData();
  const [profile, setProfile] = React.useState(userprofile);
  const [password, setpassword] = React.useState(""); // 비밀번호 인풋
  const [passwordCheck, setpasswordCheck] = React.useState(""); //비밀번호 확인 인풋
  const [nickname, setNickname] = React.useState(""); //닉네임 인풋
  const originick = localStorage.getItem("nickname");
  const imgUrl = localStorage.getItem("profile");

  // 프로필이미지 관련 코드
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;
  const UpImageUrl = (e) => {
    const files = e.target.files[0];
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      e.target.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다. ");
      return;
    }
    encodeFileToBase64(files);
    setProfile(e.target.value);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfile(reader.result);
        resolve();
      };
    });
  };

  // 수정할 회원정보 등록
  const signupdata = (e) => {
    e.preventDefault();
    let file = profile_ref.current.files[0];
    console.log(file);
    formData.append("profile_url", file);
    formData.append("password", password);
    formData.append("passwordCheck", passwordCheck);
    formData.append("nickname", nickname);
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios({
      method: "PUT",
      url: `/api/mypage/${userId}/update`,
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      baseURL: API_URL,
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem("nickname", response.data.updateUser.nickname);
        navigate("/mypage");
        MySwal.fire({
          title: "success",
          text: "정보수정이 완료되었습니다!",
          icon: "success",
          confirmButtonText: "확인",
        });
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: "error",
          text: "정보수정을 실패하였습니다",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  };

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
    <div style={{ width: "1920px" }}>
      <Background>
        <Header />
        <ModalBlock>
          <Title>개인정보 수정 </Title>

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
                  marginLeft: "-25px",
                  marginTop: "53px",
                }}
                src="https://www.shareicon.net/data/2017/05/09/885771_camera_512x512.png"
              />
              <Input
                style={{ display: "none" }}
                type="file"
                id="file"
                ref={profile_ref}
                onChange={UpImageUrl}
                defaultValue={imgUrl}
              />
              <br />
            </span>
          </Label>

          <Label>
            <div>
              <Chat1>닉네임</Chat1>

              <Input
                type="text"
                defaultValue={originick}
                onChange={handlernickname}
              />
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
                style={{ fontSize: "15px", marginRight: "10px" }}
                onChange={handlerPwcheck}
                value={passwordCheck}
              />

              {password !== passwordCheck && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "14px",
                    marginTop: "5px",
                  }}
                >
                  {" "}
                  비밀번호가 같은지 확인해주세요{" "}
                </div>
              )}
            </div>
          </Label>

          <LoginBtn>
            <Button1 onClick={signupdata}>변경사항 저장</Button1> <br />
            <Button2
              onClick={() => {
                navigate("/mypage");
              }}
            >
              취소
            </Button2>
          </LoginBtn>
        </ModalBlock>
      </Background>
    </div>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
`;
const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  background-color: white;
  color: black;
  width: 458px;
  height: 540px;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px gray;
  margin-top: 20px;
  margin-bottom: 20px;
  transform: translate(150%, 0%);
  margin-top: 225px;
  margin-bottom: 145px;
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
  border: 1px solid black;
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
  background-color: #1d9ffd;
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
