import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { setWord } from "../../redux/modules/searchSlice";
import { useDispatch } from "react-redux";

import Room from "../mainpage/Room";
import SearchNotFound from "./SearchNotFound";
import roomLogo from "../../shared/mainpage-assets/icon-room-logo.svg";

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
                imageUrl={room.imageUrl ? room.imageUrl : roomLogo}
                title={room.title}
                content={room.content}
                date={room?.date}
                tagName={room?.tagName}
                groupNum={room?.groupNum}
                //만약에 isLiked 가 없으면 false값을 내려준다.
                isLiked={room.isLiked ? room.isLiked : false}
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
  padding: 60px 300px;
  display: flex;
  flex-direction: column;
  min-height: 380px;
`;
const RoomListCont = styled.div`
  /* padding: 60px 300px; */
  /* width: 100%; */
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(424px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 30px;
  margin-bottom: 100px;
`;

const SearchTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin: 0px 20px;
  line-height: 42px;
  color: black;

  & > span {
    font-weight: 400;
  }
`;
