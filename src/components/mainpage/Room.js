import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

const Room = ({
  roomId,
  imageUrl,
  title,
  content,
  date,
  tagName,
  groupNum,
  isLiked,
}) => {
  const [likeState, setLikeState] = useState(isLiked);

  function toggleLike() {
    // setLikeState(!likeState) 하면 안됨 이전 상태를 기반으로 상태를 반전시켜주기
    setLikeState((prevlikeState) => !prevlikeState);
  }
  function enterRoomHandler() {
    //입장하기버튼: 클릭한 방(roomId)에 해당하는 화상채팅방으로 입장하는 모달
  }

  const [isShow, setIsShow] = useState(false);

  //splitedArr를 구조분해 하니까 3번째 인자가 없는 경우 undefined로 뜸 아래와같이 수정하면 정상작동
  // const [word1, word2] = tagName;
  // let splitedArr = word2.split(",");
  // let fullTag = [word1, ...splitedArr];
  // console.log(fullTag);

  return (
    <RoomCont key={roomId}>
      <RoomImg src={imageUrl}></RoomImg>
      <RoomCotentBox>
        <TopContent>
          <TitleBox className="roomTitle-box">
            <RoomTitle>{title}</RoomTitle>
            <UserCountBox className="userCount-box">
              <FaUser />
              &nbsp;
              <span>{groupNum}/4</span>
            </UserCountBox>
          </TitleBox>
          <ContentBox>{content}</ContentBox>
          <DueDate>{date}까지</DueDate>
        </TopContent>

        {/* 태그 돌릴때도 고유값 전달 */}
        <TagBox>
          {tagName.map((tag, index) => {
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
  height: 500px;
  display: flex;
  flex-direction: column;
  -webkit-margin-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
  -webkit-box-shadow: 1px 8px 12px -7px #8f8f8f;
  box-shadow: 1px 8px 12px -7px #8f8f8f;
`;
const RoomImg = styled.img`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.imageUr});
`;
const RoomCotentBox = styled.div`
  height: 50%;
  padding: 20px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
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
  font-weight: 400;
  color: #000;
  opacity: 0.5;
  font-size: 12px;
  line-height: 14px;
`;
const TagBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
`;
const Tag = styled.span`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #000;
  color: #000;
  opacity: 0.5;
  padding: 10px 16px;
  font-weight: 400;
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

const LikedWhiteBtn = styled(WhiteBtn)`
  background-color: #b8e994;
`;

const BlackBtn = styled(WhiteBtn)`
  background-color: black;
  color: white;
`;
