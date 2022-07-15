import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

function SmallRoom({ roomId, imageUrl, title, date, groupNum }) {
  function enterRoomHandler() {
    //입장하기버튼: 클릭한 방(roomId)에 해당하는 화상채팅방으로 입장하는 모달
  }
  return (
    <RoomCont key={roomId}>
      <RoomImgDiv imageUrl={imageUrl}>
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
          <WhiteBtn>스터디 나가기</WhiteBtn>
          <BlackBtn onClick={enterRoomHandler}>참여하기</BlackBtn>
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
  width: 424px;
  flex-direction: column;
  -webkit-margin-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
  -webkit-box-shadow: 1px 8px 12px -7px #8f8f8f;
  box-shadow: 1px 8px 12px -7px #8f8f8f;
`;
const RoomImgDiv = styled.div`
  width: 100%;
  height: 224px;
  padding: 20px;
  background: url(${(props) => props.imageUrl});
  background-position: center;
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
  color: #000;
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
`;

const BlackBtn = styled(WhiteBtn)`
  background-color: black;
  color: white;
`;
