import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import Portal from "../Portal";
import Roomenter from "../Roomenter";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import fullHeart from "../../shared/mainpage-assets/icon-full-heart.svg";
import emptyHeart from "../../shared/mainpage-assets/icon-empty-heart.svg";

import { FaLock } from "react-icons/fa";

const Room = ({
  roomId,
  imgUrl,
  title,
  content,
  date,
  tagName,
  groupNum,
  isLiked,
  lock,
}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [likeState, setLikeState] = useState(isLiked.includes(Number(userId)));
  const catename = tagName;
  const catearr = catename;

  //좋아요 버튼
  const likeAxios = () => {
    axios({
      method: "post",
      url: `api/main/like/${roomId}/${userId}`,

      baseURL: API_URL,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {})
      .catch((error) => {});
  };

  //입장하기버튼: 클릭한 방(roomId)에 해당하는 화상채팅방으로 입장하는 모달
  const [EnterOpen, setEnterOpen] = React.useState(false);
  const EnterModal = () => {
    setEnterOpen(!EnterOpen);
  };

  //로그인 안했을시에 보여지는 경고창
  const AlertHandler = () => {
    alert("로그인 이후 사용해주세요!");
  };

  function clickLike(event) {
    setLikeState((prevlikeState) => !prevlikeState);
    likeAxios();
  }

  return (
    <RoomCont key={roomId}>
      <RoomImg imgUrl={imgUrl} alt=""></RoomImg>
      <RoomCotentBox>
        <TopContent>
          <TitleBox className="roomTitle-box">
            <TitleAndGroupNum>
              <RoomTitle>{title}</RoomTitle>
              <UserCountBox className="userCount-box">
                <FaUser />
                &nbsp;
                <span>{groupNum.length}/4</span>
              </UserCountBox>
            </TitleAndGroupNum>
            <IconBox>
              {lock && (
                <FaLock style={{ fontSize: "20px", color: "#2f3542" }} />
              )}
              {likeState === true ? (
                <img
                  alt="fiiled-heart"
                  src={fullHeart}
                  onClick={clickLike}
                  style={{ cursor: "pointer" }}
                ></img>
              ) : (
                <img
                  alt="empty-heart"
                  src={emptyHeart}
                  onClick={clickLike}
                  style={{ cursor: "pointer" }}
                ></img>
              )}
            </IconBox>
          </TitleBox>
          <ContentBox>{content}</ContentBox>
          <DueDate>{date}까지</DueDate>
        </TopContent>

        {/* 태그 돌릴때도 고유값 전달 */}
        <TagBox>
          {catearr.map((tag, index) => {
            return <Tag key={index}>#{tag}</Tag>;
          })}
        </TagBox>
        {token ? (
          <BtnBox>
            <BlackBtn onClick={EnterModal}>참여하기</BlackBtn>
            <Portal>
              {EnterOpen && <Roomenter roomId={roomId} onClose={EnterModal} />}
              {/* lock={lock} */}
            </Portal>
          </BtnBox>
        ) : (
          <BtnBox>
            <BlackBtn onClick={AlertHandler}>참여하기</BlackBtn>
          </BtnBox>
        )}
      </RoomCotentBox>
    </RoomCont>
  );
};

export default memo(Room);

const RoomCont = styled.div`
  background-color: #fff;
  max-width: 400px;
  height: 450px;
  display: flex;
  flex-direction: column;
  -webkit-margin-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
  -webkit-box-shadow: var(--card-box-shadow);
  box-shadow: var(--card-box-shadow);
`;
const RoomImg = styled.div`
  width: 100%;
  height: 50%;
  background: url(${(props) => props.imgUrl}) center no-repeat;
  background-size: cover;
  background-color: var(--egloo-gray);
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
  justify-content: space-between;
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

const TitleAndGroupNum = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ContentBox = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-size: 16px;
  font-weight: 500;
`;

const DueDate = styled.span`
  font-weight: 400;
  opacity: 0.5;
  font-size: 12px;
  line-height: 14px;
`;
const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  padding: 10px 0 20px 0;
`;
const Tag = styled.span`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--blue-black);
  opacity: 0.5;
  padding: 6px 10px;
  font-weight: 400;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const WhiteBtn = styled.button`
  /* position: relative; */
  width: 100%;
  height: 60px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 700;
  background-color: #fff;
`;

const BlackBtn = styled(WhiteBtn)`
  background-color: var(--blue-black);
  color: white;
`;
