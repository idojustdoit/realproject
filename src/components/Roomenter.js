import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Login = ({ onClose, roomId }) => {
  console.log(roomId);

  const navigate = useNavigate();

  const outZone_ref = React.useRef(null);
  const [title, settitle] = React.useState("");
  const [todolist, setTodolist] = React.useState([]);
  const [personinfo, setPersoninfo] = React.useState([]);

  console.log(roomId);

  // todo 리스트 불러오기
  // const TodoListAxios = () => {
  //axios.defaults.withCredentials = true;
  //   axios({
  //     method: "get",
  //     url: "/user/auth",
  //     baseURL: "http://13.124.252.225",
  // headers: {
  //   authorization: localStorage.getItem("access_token"),
  // },
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //        setTodolist (response.data);
  //     })
  //     .catch(function (error) {
  //       alert(error.response.data.message);
  //       console.log(error);
  //     });
  // };

  // 방에서 만든 스터디명,  TodoList, 방에 소속된 유저의 프로필 URL, nickname , 선택한  방에 roomId
  const TodoListAxios = () => {
    axios.defaults.withCredentials = true;
    axios({
      method: "GET",
      url: "/",
      baseURL: "http://13.124.252.225",
      headers: {
        authorization: localStorage.getItem("access_token"),
      },
    })
      .then(function (response) {
        console.log(response);
        settitle(response.data);
        setTodolist(response.data);
        setPersoninfo(response.data);

        //  {setprofileURL(response.data);map함수 사용..  각각? 뭐가맞죠?
        //  setNicknames(response.data)map함수 사용..}
      })
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error);
      });
  };
  // 참여 멤버의  url과 닉네임불러오기
  const RoomEnterAxios = () => {
    axios.defaults.withCredentials = true;
    axios({
      method: "post",
      url: "url/roomId",
      data: {
        password: "",
      },
      baseURL: "http://13.124.252.225",
      headers: {
        authorization: localStorage.getItem("access_token"),
      },
    })
      .then(function (response) {})
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error);
      });
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
          {/* <Title>Title</Title> */}
          <Title> 자격증 공부</Title>
          <Line />
          <Label>
            {/* 해당 방에 있는 TodoList 데이터 받아 map함수로 뿌리기 
            {todolist.map((list,index) => {
              return (
                <div
                key={index}>
                <div>
                {todolist}
                </div>
                </div>
              )
            })}
            
            */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Chat1>스터디내용</Chat1>
              <Todo>같이 으쌰으쌰 해요!!!!</Todo>
            </div>
          </Label>
          <Label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* 참여 인원 정보 닉네임과 url받아서 map 함수로 뿌리기
              
               {personinfo.map((list,index) => {
              return (
                 <div
                    key={index}>
                 <img
                      src={list.iconUrl}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "10px",
                      }}
                    />
                     <div style={{ textAlign: "left", margin: "0 10px" }}>
                    <div>
                    {list.nickname}
                    </div>
                    <div>
                </div>
              )
            })}
              
              */}
              <Chat2>참여인원</Chat2>

              <div>
                <People>
                  <img
                    alt=""
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50px",
                      position: "relative",
                      marginRight: "10px",
                    }}
                    src="https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg"
                  />
                  하율찬
                </People>
                <People>
                  {" "}
                  <img
                    alt=""
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50px",
                      position: "relative",
                      marginRight: "10px",
                    }}
                    src="https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg"
                  />
                  기영석
                </People>
                <People>
                  {" "}
                  <img
                    alt=""
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50px",
                      position: "relative",
                      marginRight: "10px",
                    }}
                    src="https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg"
                  />
                  조성인
                </People>
                <People>
                  {" "}
                  <img
                    alt=""
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50px",
                      position: "relative",
                      marginRight: "10px",
                    }}
                    src="https://opgg-com-image.akamaized.net/attach/images/20220220075306.1538486.jpg"
                  />
                  조원희
                </People>
              </div>
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

            <Btn2
              onClick={() => {
                navigate(`/video/${roomId}`);
                onClose();
                //방입장하는 navigate(방상세)
              }}
            >
              입장하기
            </Btn2>
          </EnterBtn>

          <LinkContainer></LinkContainer>
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

const Chat1 = styled.div`
  margin-right: 25px;
  width: 84px;
  height: 19px;
  font-size: 18px;
`;

const Todo = styled.div`
  background-color: gray;
  width: 309px;
  height: 36px;
  font-size: 20px;
`;

const People = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  display: flex;
  align-content: center;
  text-align: center;
  background-color: gray;
  width: 300px;
  height: 36px;
  font-size: 20px;
`;

const Chat2 = styled.div`
  display: flex;
  width: 80px;
  height: 22px;
  margin-right: 27px;
  font-weight: bold;
`;
const EnterBtn = styled.div`
  margin-top: 20px;
`;

const LinkContainer = styled.div`
  font-size: 13px;
  color: #616061;
  margin: auto;
  align-content: center;
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
