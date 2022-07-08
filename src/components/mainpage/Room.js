import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

const Room = ({
  roomId,
  imageUrl,
  title,
  content,
  date,
  tagId,
  groupNum,
  isLiked,
}) => {
  const [likeState, setLikeState] = useState(isLiked);
  console.log("isLike?" + isLiked, "roomId?" + roomId);

  function toggleLike() {
    setLikeState(!likeState);
  }
  function enterRoomHandler() {
    //입장하기버튼: 클릭한 방(roomId)에 해당하는 화상채팅방으로 입장하는 모달
  }

  const [isShow, setIsShow] = useState(false);

  // function toggleShow() {
  //   setIsShow(!isShow);
  // }
  return (
    <RoomCont key={roomId}>
      <RoomImg src={imageUrl}></RoomImg>
      <RoomCotentBox>
        <TopContent>
          <TitleBox className="roomTitle-box">
            <RoomTitle>{title}</RoomTitle>
            <UserCountBox className="userCount-box">
              <i>
                <FaUser />
                &nbsp;
              </i>
              {groupNum}/4
            </UserCountBox>
          </TitleBox>
          <ContentBox>{content}</ContentBox>
          <DueDate>{date}까지</DueDate>
        </TopContent>

        {/* 태그 돌릴때도 고유값 전달 */}
        <TagBox>
          {tagId.map((tag, index) => {
            return <Tag key={index}>#{tag}</Tag>;
          })}
        </TagBox>
        <BtnBox>
          {!likeState ? (
            <WhiteBtn onClick={toggleLike}>찜하기</WhiteBtn>
          ) : (
            <LikedWhiteBtn onClick={toggleLike}>찜취소</LikedWhiteBtn>
          )}

          <BlackBtn onClick={enterRoomHandler}>참여하기</BlackBtn>
        </BtnBox>
      </RoomCotentBox>
    </RoomCont>
  );
};

export default Room;

const RoomCont = styled.div`
  background-color: #fff;
  /* width: 424px; */
  height: 500px;
  display: flex;
  flex-direction: column;
  /* margin: 16px 8px; */
  -webkit-margin-collapse: collapse;
  /* flex-wrap: wrap; */
`;
const RoomImg = styled.img`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.imageUr});
`;
const RoomCotentBox = styled.div`
  height: 50%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-weight: 600;
  padding-top: 5px;
`;
const TitleBox = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;
const RoomTitle = styled.h3`
  font-size: 20px;
  margin-right: 10px;
  font-weight: 700;
`;
const UserCountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #7e7e7e;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  padding: 5px 8px;
  font-weight: 700;
  align-items: stretch;
`;

const ContentBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-size: 16px;
`;

const DueDate = styled.span`
  color: #95afc0;
  font-size: 12px;
`;
const TagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 16px;
`;
const Tag = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #4b4b4b;
  color: #4b4b4b;
  padding: 7px 10px;
  font-weight: 600;
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
  font-weight: 500;
  background-color: #fff;
`;

const LikedWhiteBtn = styled(WhiteBtn)`
  background-color: #b8e994;
`;

const BlackBtn = styled(WhiteBtn)`
  background-color: black;
  color: white;
`;
