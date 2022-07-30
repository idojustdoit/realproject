import React, { useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

import Portal from "../Portal";
import Roomenter from "../Roomenter";

function SmallRoom({ roomId, imgUrl, title, date, groupNum }) {
  function studyOutHandler() {}

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
          <RoomTitle>{title}</RoomTitle>
          <UserCountBox className="userCount-box">
            <FaUser />
            &nbsp;
            <span>{groupNum}/4</span>
          </UserCountBox>
        </TitleBox>
        <TopContent>
          <DueDate>{date}까지</DueDate>
        </TopContent>
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

export default SmallRoom;

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
  padding: 20px;
  background: no-repeat center url(${(props) => props.imgUrl});
  background-color: var(--egloo-gary);
  background-size: cover; //img태그에서는 object-fit과 같은 역할
`;

const RoomButtonCont = styled.div`
  height: 92px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  align-items: center;
`;
const RoomTitle = styled.h3`
  font-size: 24px;
  margin-right: 10px;
  font-weight: 700;
  line-height: 24px;
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
  font-weight: 400;
  opacity: 0.5;
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
