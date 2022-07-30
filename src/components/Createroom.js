import React from "react";

import styled from "styled-components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";

import { ko } from "date-fns/esm/locale";
import { storage } from "../shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 카테고리 명 표시
const names = [
  { id: 1, name: "자격증" },
  { id: 2, name: "대입" },
  { id: 3, name: "독서" },
  { id: 4, name: "자기계발" },
  { id: 5, name: "취미" },
  { id: 6, name: "어학" },
  { id: 7, name: "코딩" },
  { id: 8, name: "공무원" },
  { id: 9, name: "자유주제" },
];

const Createroom = ({ onClose }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  //사용하는 변수명 정리
  const MySwal = withReactContent(Swal); //(에러 및 성공 모달창)
  const outZone_ref = React.useRef(); //모달창 닫을때
  const profile_ref = React.useRef(null);
  const [title, setTitle] = React.useState(""); // 스터디 방이름
  const [content, setContent] = React.useState(""); // 스터디 내용
  const [password, setPassword] = React.useState(""); // 비공개방 비밀번호
  const [lock, setlock] = React.useState(false); //비공개방 비밀번호 창띄우기
  const [loading, setLoading] = React.useState(true); //라디오 박스 체크 관련
  const [dateRange, setDateRange] = React.useState("", ""); //날짜
  const [startDate, endDate] = dateRange;
  const [imgUrl, setImgUrl] = React.useState(
    "https://media.istockphoto.com/vectors/photo-album-icon-vector-id1023892724?k=20&m=1023892724&s=170667a&w=0&h=zXZB3iWNnwhrDA055eJgxh4Sq814_ZNRSVAJT7lBgLY="
  );
  const formData = new FormData();

  const handlerName = (e) => {
    setTitle(e.target.value);
  };

  const handlercontent = (e) => {
    setContent(e.target.value);
  };

  const priPassword = (e) => {
    setPassword(e.target.value);
  };
  const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;
  const UpImageUrl = (e) => {
    const files = e.target.files[0];
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      e.target.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다. ");
      return;
    }
    encodeFileToBase64(files);
    setImgUrl(e.target.value);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgUrl(reader.result);
        resolve();
      };
    });
  };

  // 공개 비공개 라디오박스 1개만 체크 되도록.

  const checkOnlyOne = (checkThis) => {
    setLoading(!loading);
    setlock(!lock);
    const checkboxes = document.getElementsByName("test");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  // 카테고리 표시
  const [categoryName, setcategoryName] = React.useState([]);
  //  onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setcategoryName([...categoryName, item]);
    } else if (!checked) {
      setcategoryName(categoryName.filter((el) => el !== item));
    } // x를 누르면 리스팅 목록에서 카테고리가 삭제되며 체크도 해제 된다
    if (categoryName.length > 1) {
      setcategoryName(categoryName.filter((el) => el !== item));
    }
  };

  console.log(categoryName);

  // 서버에 방 정보 보내는 통신
  const CreateAxios = (e) => {
    e.preventDefault();
    let file = profile_ref.current.files[0];
    formData.append("imgUrl", file);
    formData.append("title", title);
    formData.append("password", password);
    formData.append("lock", lock);
    formData.append("content", content);
    formData.append("date", moment(dateRange[1]).format("YYYY년MM월DD일"));
    formData.append("tagName", ["전체", ...categoryName]);
    formData.append("isLike", false);
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios({
      method: "POST",
      url: `/api/room/create/${userId}`,
      data: formData,
      baseURL: API_URL,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        MySwal.fire({
          title: "success",
          text: "방이 생성되었습니다!",
          icon: "success",
          confirmButtonText: "확인",
        });
        onClose();
        //방상세페이지로 이동.
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: "Error!",
          text: "방생성에 실패하였습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  };

  console.log(dateRange, endDate);
  const a = moment(dateRange[1]).format("YYYY-MM-DD");
  console.log(a);
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
          <Title> 스터디 생성</Title>
          <Line />
          <Label>
            <div>
              <Chat2>스터디명</Chat2>
              <Input
                required
                type="text"
                placeholder="스터디 명을 입력해주세요."
                onChange={handlerName}
              />
            </div>
          </Label>
          <div
            style={{
              display: "inline-block",
              marginRight: "85px",
            }}
          >
            <RadioBox1
              input
              checked={loading}
              id="text"
              type="radio"
              name="test"
              value="1"
              onChange={(e) => checkOnlyOne(e.target)}
            />
            공개
            <RadioBox2
              type="radio"
              name="test"
              value="2"
              onChange={(e) => checkOnlyOne(e.target)}
            />
            비공개
          </div>
          {lock ? (
            <Label1>
              <div>
                <Chat2>비밀번호</Chat2>
                <Input1
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={priPassword}
                />
              </div>
            </Label1>
          ) : (
            ""
          )}
          <Label>
            <div style={{ marginLeft: "60px" }}>
              <span>
                <div>
                  <input
                    type="file"
                    id="input_file"
                    ref={profile_ref}
                    onChange={UpImageUrl}
                  />

                  <br />
                  <img
                    alt=""
                    style={{
                      cursor: "pointer",
                      width: "160px",
                      height: "100px",
                      position: "relative",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                    src={imgUrl}
                  />
                  <br />
                </div>
              </span>
            </div>
          </Label>
          <Label>
            <div>
              <Chat1>스터디 내용</Chat1>
              <Input
                style={{ marginLeft: "6px" }}
                required
                type="text"
                placeholder="스터디 내용을 입력해주세요."
                onChange={handlercontent}
              />
            </div>
          </Label>
          <Label>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "34px" }}
            >
              <Chat3> 기간설정</Chat3>
              <DatePicker
                required
                selectsRange={true}
                locale={ko} // 한글로 변경
                dateFormat="yyyy년MM월dd일(eee)" // 시간 포맷 변경
                startDate={new Date()}
                endDate={endDate}
                minDate={new Date()}
                popperPlacement="auto"
                customInput={<Input1 />}
                onChange={(date) => {
                  setDateRange(date);
                }}
                withPortal
              />
            </div>
          </Label>
          <Label>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Chat1> 카테고리</Chat1>

              <div
                style={{
                  display: "flex",
                  width: "309px",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {names.map((item) => {
                  return (
                    <CateLabel
                      key={item.id}
                      checked={categoryName.includes(item.name) ? true : false}
                    >
                      <CateInput
                        type="checkbox"
                        style={{ display: "none" }}
                        // 이때 value값으로 name를 지정해준다.
                        value={item.name}
                        // onChange이벤트가 발생하면 check여부와 value(name)값을 전달하여 배열에 name를 넣어준다.
                        onChange={(e) => {
                          onCheckedElement(e.target.checked, e.target.value);
                        }}
                        //  체크표시 & 해제를 시키는 로직. 배열에 name이 있으면 true, 없으면 false
                        checked={
                          categoryName.includes(item.name) ? true : false
                        }
                      />

                      <div>{item.name}</div>
                    </CateLabel>
                  );
                })}
              </div>
            </div>
          </Label>
          <BtnG>
            <Btn1
              onClick={() => {
                onClose();
              }}
            >
              취소
            </Btn1>
            <Btn2 onClick={CreateAxios}>스터디 생성</Btn2>
          </BtnG>
        </ModalBlock>
      </Background>
    </Container>
  );
};

const CateInput = styled.input``;
const CateLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  text-align: center;
  margin-bottom: 10px;
  height: 32px;
  border-radius: 15px;
  padding: 5px;
  background-color: ${(props) => (props.checked ? "#1D9FFD" : "white")};
  color: ${(props) => (props.checked ? "white" : "#808080")};
  border: solid 1px #808080;
  font-size: 15px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

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
  width: 508px;
  height: 690px;
  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  margin-top: 24px;
`;

const Line = styled.hr`
  background-color: black;
  width: 410px;
  height: 2px;
  margin-top: 12px;
  margin-bottom: 15px;
`;
const Label1 = styled.label`
  float: left;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
`;
const Label = styled.label`
  float: left;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
`;
const RadioBox1 = styled.input`
  margin-top: 10px;
  appearance: none;
  border: 1.5px solid black;
  border-radius: 20px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:checked {
    width: 16px;
    height: 16px;
    background-color: white;
    padding: 2.2px 0px 0px 1.2px;
    &::after {
      position: fixed;
      content: "";
      display: block;
      border-radius: 50%;
      width: 9.5px;
      height: 9.4px;
      margin-left: 0.2px;
      background: black;
    }
  }
`;

const RadioBox2 = styled.input`
  margin-top: 10px;
  appearance: none;
  border: 1.5px solid black;
  border-radius: 20px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:checked {
    width: 16px;
    height: 16px;
    background-color: white;
    padding: 2.2px 0px 0px 1.5px;
    &::after {
      position: fixed;
      content: "";
      display: block;
      border-radius: 50%;
      width: 9.5px;
      height: 9.4px;
      margin-left: 0.2px;
      background: black;
    }
  }
`;

const Chat2 = styled.span`
  margin-right: 32px;
`;

const Chat1 = styled.span`
  margin-right: 12px;
`;

const Chat3 = styled.span`
  margin-right: 12px;
  vertical-align: middle;
  display: inline-block;
  margin: 0;
  padding: 0;
`;
const Input1 = styled.input`
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  width: 309px;
  height: 36px;
  font-size: 15px;
  line-height: 1.33333333;
  border-radius: 4px;
`;

const BtnG = styled.div`
  margin-bottom: 40px;
  margin-top: 32px;
`;

const Btn1 = styled.button`
  margin-right: 15px;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 12px;
  width: 197px;
  height: 50px;
  color: black;
  background-color: white;
  border: solid 1px black;
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
  width: 150px;
  color: #fff;
  background-color: #1d9ffd;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 50px;
  width: 197px;
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

const Input = styled.input`
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  width: 309px;
  height: 36px;
  font-size: 18px;
  line-height: 1.33333333;
  border-radius: 4px;
`;
export default Createroom;
