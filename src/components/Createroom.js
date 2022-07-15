import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.css";
import { ko } from "date-fns/esm/locale";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "309px",
    },
  },
};
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

const Login = ({ onClose }) => {
  //사용하는 변수명 정리
  const navigate = useNavigate();
  const outZone_ref = React.useRef(); //모달창 닫을때
  const [title, setTitle] = React.useState(""); // 스터디 방이름
  const [content, setContent] = React.useState(""); // 스터디 내용
  const [password, setPassword] = React.useState(""); // 비공개방 비밀번호
  const [close, setClose] = React.useState(false); //비공개방 비밀번호 창띄우기
  const [loading, setLoading] = React.useState(true); //라디오 박스 체크 관련
  const [dateRange, setDateRange] = React.useState([], []); //날짜
  const [startDate, endDate] = dateRange;

  const handlerName = (e) => {
    setTitle(e.target.value);
  };

  const handlercontent = (e) => {
    setContent(e.target.value);
  };

  const priPassword = (e) => {
    setPassword(e.target.value);
  };

  // 서버에 방 정보 보내는 통신
  const CreateAxios = () => {
    const token = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    axios({
      method: "POST",
      url: `/api/room/create/${userId}`,
      data: {
        title: title,
        password: password,
        content: content,
        date: dateRange,
        tagName: ["전체", categoryName.join()],
      },

      baseURL: "http://3.35.26.55",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        alert("방생성이 되었습니다.");
        onClose();

        //방상세페이지로 이동.
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  // 공개 비공개 라디오박스 1개만 체크 되도록.

  const checkOnlyOne = (checkThis) => {
    setLoading(!loading);
    setClose(!close);
    const checkboxes = document.getElementsByName("test");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };
  // 카테고리 표시
  const [categoryName, setcategoryName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategoryName(typeof value === "string" ? value.split(",") : value);
  };

  // console.log(title);
  // console.log(password);
  // console.log(content);
  // console.log(dateRange);
  // console.log(categoryName);

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
            <RadioBox
              input
              checked={loading}
              id="text"
              type="radio"
              name="test"
              value="1"
              onChange={(e) => checkOnlyOne(e.target)}
            />
            공개
            <RadioBox
              type="radio"
              name="test"
              value="2"
              onChange={(e) => checkOnlyOne(e.target)}
            />
            비공개
          </div>

          {close ? (
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
            <div>
              <Chat1>스터디 내용</Chat1>
              <Input
                type="text"
                placeholder="스터디 내용을 입력해주세요."
                style={{}}
                onChange={handlercontent}
              />
            </div>
          </Label>
          <Label>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "32px" }}
            >
              <Chat3> 기간설정</Chat3>
              <DatePicker
                selectsRange={true}
                locale={ko} // 한글로 변경
                dateFormat="yyyy.MM.dd" // 시간 포맷 변경
                startDate={new Date()}
                endDate={endDate}
                minDate={new Date()}
                popperPlacement="auto"
                customInput={<Input />}
                onChange={(update) => {
                  setDateRange(update);
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

              <FormControl sx={{ width: "309px", height: "36px" }}>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={categoryName}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name.id} value={name.name}>
                      <Checkbox
                        checked={categoryName.indexOf(name.name) > -1}
                      />
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            <Btn2
              onClick={() => {
                CreateAxios();
                onClose();
              }}
            >
              스터디 생성
            </Btn2>
          </BtnG>
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
  width: 508px;
  height: 492px;
  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 1120px) {
    width: 50rem;
  }
  @media (max-width: 50rem) {
    width: 80%;
  }
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
  margin-bottom: 32px;
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

const RadioBox = styled.input`
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
    padding: 1.5px;
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
  font-size: 18px;
  line-height: 1.33333333;
`;

const BtnG = styled.div`
  margin-bottom: 40px;
  margin-top: 32px;
`;

const Btn1 = styled.button`

  margin-right:15px;
  display: inline-block
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
display: inline-block
  margin-bottom: 12px;
  width: 150px;
  color: #fff;
  background-color: #1D9FFD;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 50px;
  width:197px;
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
`;
export default Login;
