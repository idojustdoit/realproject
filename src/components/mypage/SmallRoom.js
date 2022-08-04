import React, { useState, memo } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Portal from "../Portal";
import Roomenter from "../Roomenter";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteARoom } from "../../redux/modules/myRoomSlice";

function SmallRoom({ roomId, imgUrl, title, date, groupNum, lock }) {
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;
  const MySwal = withReactContent(Swal); //(에러 및 성공 모달창)

  function studyOutHandler(roomId) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    axios({
      method: "post",
      url: `api/room/outroom/${roomId}/${userId}`,

      baseURL: API_URL,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(deleteARoom(roomId));
        MySwal.fire({
          title: "success",
          text: "방이 성공적으로 삭제되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      })
      .catch((error) => {});
  }

  function joinRoomHandler() {}
  const [EnterOpen, setEnterOpen] = useState(false);
  const EnterModal = () => {
    setEnterOpen(!EnterOpen);
  };
  return (
    <RoomCont key={roomId}>
      {/* img태그는 자식요소를 가질 수 없어서 div에 prop값으로 넘겼음 */}
      <RoomImgDiv imgUrl={imgUrl}>
        <TitleBox className="roomTitle-box">
          <BlackCont>
            <RoomTitle>{title}</RoomTitle>
            <DueDate>{date}까지</DueDate>
          </BlackCont>
          <IconBox>
            {lock && <FaLock style={{ fontSize: "20px", color: "#2f3542" }} />}
            <UserCountBox className="userCount-box">
              <FaUser />
              &nbsp;
              <span>{groupNum.length}/4</span>
            </UserCountBox>
          </IconBox>
        </TitleBox>
      </RoomImgDiv>
      <RoomButtonCont>
        <BtnBox>
          <WhiteBtn onClick={() => studyOutHandler(roomId)}>
            스터디 탈퇴
          </WhiteBtn>
          <BlackBtn onClick={EnterModal}>입장하기</BlackBtn>
          <Portal>
            {EnterOpen && <Roomenter roomId={roomId} onClose={EnterModal} />}
          </Portal>
        </BtnBox>
      </RoomButtonCont>
    </RoomCont>
  );
}

export default memo(SmallRoom);

const RoomCont = styled.div`
  background-color: #fff;
  height: 316px;
  display: flex;
  flex-direction: column;
  -webkit-margin-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
  -webkit-box-shadow: var(--card-box-shadow);
  box-shadow: var(--card-box-shadow);
`;
const RoomImgDiv = styled.div`
  width: 100%;
  height: 224px;
  padding: 12px;
  background: no-repeat center url(${(props) => props.imgUrl});
  background-color: var(--egloo-gary);
  background-size: cover; //img태그에서는 object-fit과 같은 역할
`;
const BlackCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.65);
`;
const RoomButtonCont = styled.div`
  height: 92px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const TopContent = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const RoomTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  /* line-height: 20px; */
`;
const UserCountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ff4d00;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  padding: 5px 8px;
  font-weight: 700;
`;

const DueDate = styled.span`
  width: fit-content;
  font-weight: 400;
  color: white;
  font-size: 14px;
  line-height: 14px;
`;

const BtnBox = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 0.5rem;
  /* margin-top: 20px; */
`;
const WhiteBtn = styled.button`
  /* position: relative; */
  width: 50%;
  height: 60px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 700;
  background-color: #fff;
  border: 1px solid var(--blue-black);
`;

const BlackBtn = styled(WhiteBtn)`
  background-color: var(--blue-black);
  color: white;
`;
