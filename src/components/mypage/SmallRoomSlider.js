import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import SmallRoom from "./SmallRoom";

//그룹 구성원은 무조건 default 최소 1(호스트) 시작 최대 4
export const DUMMY_ROOM_LIST = [
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

const SmallRoomSlider = (props) => {
  //아래의 리스트에 axios에서 가져온 리스트의 값을 넣어준다. 기본값은 아무것도 없는 것으로 지정
  console.log(DUMMY_ROOM_LIST);
  return (
    <RoomListCont>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {DUMMY_ROOM_LIST.map((room) => {
          return (
            <SwiperSlide>
              <SmallRoom
                key={room.roomId}
                roomId={room.roomId}
                imageUrl={room.imageUrl}
                title={room.title}
                date={room.date}
                groupNum={room.groupNum}
              ></SmallRoom>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </RoomListCont>
  );
};

export default SmallRoomSlider;

const RoomListCont = styled.div`
  width: 100%;
  margin-bottom: 100px;
  /* padding: 10px; */

  background-color: #f5f5f5;
`;
