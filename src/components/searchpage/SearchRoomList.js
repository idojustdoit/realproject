import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { setWord } from "../../redux/modules/searchSlice";
import { useDispatch } from "react-redux";

import Room from "../mainpage/Room";
import SearchNotFound from "./SearchNotFound";
import roomImg from "../../shared/mainpage-assets/basic-room-img.png";

function SearchRoomList() {
  const location = useLocation();
  const dispatch = useDispatch();

  let word = useSelector((state) => state.search.word);
  let isLoading = useSelector((state) => state.search.isLoading);
  let list = useSelector((state) => state.search.searchRooms);

  return (
    <SearchCont>
      <SearchTitle>
        "{word}"<span>에 대한 결과입니다.</span>
      </SearchTitle>
      {isLoading ? (
        <Spinner style={{ height: "380px" }} />
      ) : list.length > 0 ? (
        <RoomListCont>
          {list.map((room) => {
            return (
              <Room
                key={room._id}
                roomId={room.roomId}
                imgUrl={room.imgUrl ? room.imgUrl : roomImg}
                title={room.title}
                content={room.content}
                date={room?.date}
                tagName={room?.tagName}
                groupNum={room?.groupNum}
                //만약에 isLiked 가 없으면 false값을 내려준다.
                isLiked={room.likeUser ? room.likeUser : false}
                lock={room.lock}
              ></Room>
            );
          })}
        </RoomListCont>
      ) : (
        <SearchNotFound />
      )}
    </SearchCont>
  );
}

export default SearchRoomList;
const SearchCont = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  min-height: 500px;
`;
const RoomListCont = styled.div`
  padding: 60px 20px;
  width: 1200px;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-column-gap: 25px;
  grid-row-gap: 25px;
`;

const SearchTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin: 20px;
  line-height: 42px;
  color: black;

  & > span {
    font-weight: 400;
  }
`;
