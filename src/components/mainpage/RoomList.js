import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Room from "./Room";

//userNum은 무조건 default 최소 1 시작 최대 4

const RoomList = ({ roomList }) => {
  //찜하기누르면 버튼 모양-> 색다르게 해서 차이를 둬야하는지?
  // isLiked? true false값으로 표시해줘야 할듯

  //groupList? 숫자로 지정된 카테고리도 같이 보내주면 좋을듯


  const [visible, setVisible] = useState(6);
  useEffect(() => {}, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RoomListCont>
        {roomList.slice(0, visible).map((room) => {
          return (
            <Room
              key={room._id}
              roomId={room.roomId}
              imageUrl={
                room.imgUrl
                  ? room.imgUrl
                  : `${process.env.PUBLIC_URL}/img/sgether.JPG`
              }
              title={room.title}
              content={room.content}
              date={room?.date}
              tagName={room?.tagName}
              groupNum={room?.groupNum}
              isLiked={room?.isLiked}
            >
              하이!
            </Room>
          );
        })}
      </RoomListCont>
      <Btn onClick={showMoreItems}>Load more</Btn>
    </div>
  );
};

export default RoomList;

const RoomListCont = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 424px);
  grid-column-gap: 24px;
  grid-row-gap: 30px;
  margin-bottom: 100px;
`;

const Btn = styled.button`
  width: 200px;
`;
