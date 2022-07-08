import React, { useEffect } from "react";
import styled from "styled-components";
import Room from "./Room";

//userNum은 무조건 default 최소 1 시작 최대 4
const DUMMY_ROOM_LIST = [
  //roomId를 key로 주면 될 거 같아서 index없앰
  {
    roomId: 0,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title1",
    content:
      "스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-03-15",
    tagId: ["자격증", "자기계발"],
    groupNum: 3,
    isLiked: false,
  },
  {
    roomId: 1,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title2",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-07-01",
    tagId: ["자격증", "자기계발"],
    groupNum: 1,
    isLiked: false,
  },
  {
    roomId: 2,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title3",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-12-11",
    tagId: ["자격증", "자기계발"],
    groupNum: 3,
    isLiked: false,
  },
  {
    roomId: 3,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title4",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-06-24",
    tagId: ["자격증", "자기계발"],
    groupNum: 2,
    isLiked: false,
  },
  {
    roomId: 4,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title5",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용 ",
    date: "2022-10-01",
    tagId: ["자격증", "자기계발"],
    groupNum: 2,
    isLiked: false,
  },
  {
    roomId: 5,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title6",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-07-01",
    tagId: ["자격증", "자기계발"],
    groupNum: 1,
    isLiked: false,
  },
  {
    roomId: 6,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title7",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-07-01",
    tagId: ["자격증", "자기계발"],
    groupNum: 1,
    isLiked: false,
  },
  {
    roomId: 7,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title8",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-07-01",
    tagId: ["자격증", "자기계발"],
    groupNum: 1,
    isLiked: false,
  },
  {
    roomId: 8,
    imageUrl: `${process.env.PUBLIC_URL}/img/sgether.JPG`,
    title: "Study Title9",
    content:
      "스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용 스터디 내용 내용 내용 내용스터디 내용 내용 내용 내용",
    date: "2022-07-01",
    tagId: ["자격증", "자기계발"],
    groupNum: 1,
    isLiked: false,
  },
];

const RoomList = ({ categoryName, categoryIndex }) => {
  //찜하기누르면 버튼 모양-> 색다르게 해서 차이를 둬야하는지?
  // isLiked? true false값으로 표시해줘야 할듯

  //groupList? 숫자로 지정된 카테고리도 같이 보내주면 좋을듯

  console.log(categoryName);

  return (
    <RoomListCont>
      {DUMMY_ROOM_LIST.map((room) => {
        return (
          <Room
            key={room.roomId}
            roomId={room.roomId}
            imageUrl={room.imageUrl}
            title={room.title}
            content={room.content}
            date={room.date}
            tagId={room.tagId}
            groupNum={room.groupNum}
            isLiked={room.isLiked}
          >
            하이!
          </Room>
        );
      })}
    </RoomListCont>
  );
};

export default RoomList;

const RoomListCont = styled.div`
  width: 100%;
  margin-bottom: 100px;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; */
  /* justify-content: space-between; */
  /* flex-wrap: wrap;  */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(450px, auto));
  background-color: #f5f5f5;
  /* gap: 32px 24px; */
  gap: 1rem;
  /* padding: 0 5px; */
`;
