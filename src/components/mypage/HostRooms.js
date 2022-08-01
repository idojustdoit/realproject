import axios from "axios";
import React from "react";
import styled from "styled-components";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import basicRoomImg from "../../shared/mainpage-assets/basic-room-img.png";
import "../../styles/swiper.css";

import SmallRoom from "./SmallRoom";

//그룹 구성원은 무조건 default 최소 1(호스트) 시작 최대 4

const HostRooms = ({ hostRooms }) => {
  return (
    <RoomListCont>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        //반응형 적용x
      >
        {hostRooms.length > 0 ? (
          <>
            {hostRooms.map((room) => {
              return (
                <SwiperSlide>
                  <SmallRoom
                    key={room.roomId}
                    roomId={room.roomId}
                    imgUrl={room.imgUrl ? room.imgUrl : basicRoomImg}
                    title={room.title}
                    date={room.date}
                    groupNum={room.groupNum}
                    lock={room.lock}
                  ></SmallRoom>
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <NoContent>리스트가 없습니다.😪</NoContent>
        )}
      </Swiper>
    </RoomListCont>
  );
};

export default HostRooms;

const RoomListCont = styled.div`
  width: 100%;
  margin-bottom: 100px;
  /* padding: 10px; */
`;
const NoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  font-weight: 700;
`;
