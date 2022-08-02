import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = ({ onClose, roomId }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const outZone_ref = React.useRef(null);

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [profile, setProfile] = React.useState([]);
  const [nickname, setNickname] = React.useState([]);
  const [password, setPassword] = React.useState(0);
  const [personinfo, setPersoninfo] = React.useState([]);
  const [lock, setLock] = React.useState("");

  //유저가 선택한 방에대한 정보
  const roomData = () => {
    const token = localStorage.getItem("accessToken");
    axios({
      method: "GET",
      url: `/api/room/info/${roomId}`,
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setTitle(response.data.checkRoom.title);
        setContent(response.data.checkRoom.content);

        setNickname(response.data.output);
        setLock(response.data.checkRoom.lock);
        // setPersoninfo(response.data.personinfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    roomData();
  }, []);

  // 비밀방 입장 할때
  const secretRoom = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios({
      method: "POST",
      url: `api/room/private-room/${roomId}/${userId}`,
      baseURL: API_URL,
      data: {
        password: password,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        navigate(`/public-room/${roomId}`);
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: "Error!",
          text: "방 입장에 실패하였습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  };

  const pwhandler = (e) => {
    setPassword(e.target.value);
  };
  const RoomenterHandler = () => {
    navigate(`/public-room/${roomId}`);
  };
  console.log(nickname);
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
          <Title>{title}</Title>
          <Line />
          <Label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Chat1>스터디내용</Chat1>
              <Todo>{content}</Todo>
            </div>
          </Label>
          <Label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Chat1 style={{ marginRight: "40px" }}> 참여인원</Chat1>

              {nickname.length == 0 ? (
                <Todo>
                  <div className="person">현재 참여 인원이 없습니다.</div>
                </Todo>
              ) : (
                <div
                  style={{
                    flexDirection: "column",
                    border: "1px solid #dddddd",
                    borderRadius: "4px",
                    width: "309px",
                  }}
                >
                  {nickname.map(function (index) {
                    return (
                      <div>
                        <div
                          className="list"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px",
                            border: "1px solid #dddddd",
                          }}
                        >
                          {" "}
                          <img
                            alt=""
                            src={index.imageUrl}
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "10px",
                              marginRight: "10px",
                            }}
                          />
                          <span style={{ fontSize: "16px", fontWeight: "400" }}>
                            {index.nickname}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Label>

          {lock ? (
            <>
              <Label>
                <div>
                  <Chat3>비밀번호</Chat3>
                  <Input type="password" onChange={pwhandler} />
                </div>
              </Label>
              <EnterBtn>
                <Btn1
                  onClick={() => {
                    onClose();
                  }}
                >
                  취소
                </Btn1>

                <Btn2 onClick={secretRoom}>비밀방 입장하기</Btn2>
              </EnterBtn>
            </>
          ) : (
            <EnterBtn>
              <Btn1
                onClick={() => {
                  onClose();
                }}
              >
                취소
              </Btn1>

              <Btn2 onClick={RoomenterHandler}>공개방 입장하기</Btn2>
            </EnterBtn>
          )}
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
  top: 6.5rem;
  width: 509px;
  height: 508px;
  padding: 1.5rem;
  background-color: white;
  color: black;

  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 35rem;
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
  font-size: 25px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  margin-top: 24px;
`;
const Line = styled.hr`
  width: 410px;
  height: 2px;
  background-color: black;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
`;

const Input = styled.input`
  margin-top: 16px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  width: 309px;
  height: 36px;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 1.33333333;
`;
const Chat1 = styled.div`
  margin-right: 25px;
  height: 19px;
  font-size: 18px;
  padding: 5px;
`;
const Chat3 = styled.span`
  margin-right: 40px;
  height: 19px;
  font-size: 18px;
  padding: 5px;
`;
const Line2 = styled.hr`
  width: 309px;
  height: 1px;
  border: 1px solid #dddddd;
`;
const Todo = styled.div`
  background-color: white;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 4px;
  width: 309px;
  padding: 5px;
  height: 36px;
  font-size: 18px;
`;

const EnterBtn = styled.div`
  margin-top: 20px;
`;

const Btn1 = styled.button`
  border: 1px solid black;
  margin-right: 15px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 12px;
  width: 197px;
  height: 50px;
  color: black;
  background-color: white;

  font-size: 18px;
  font-weight: 900;
  min-width: 96px;
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

const Btn2 = styled.button`
  display: inline-block;
  margin-bottom: 12px;
  width: 197px;
  height: 50px;
  color: #fff;
  background-color: black;
  border: none;
  font-size: 18px;
  font-weight: 900;
  min-width: 96px;
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

export default Login;
