import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMainList,
  getRoomListByCategory,
} from "../../redux/modules/roomSlice";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Room from "./Room";
import { listAll } from "firebase/storage";
import { lineHeight } from "@mui/system";

//userNum은 무조건 default 최소 1 시작 최대 4

const RoomListEx = () => {
  // isLiked? true false값으로 표시해줘야 할듯
  const dispatch = useDispatch();

  //받아온 메인 룸 리스트
  const [isLoading, setIsLoading] = useState(false);

  const [List, setList] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(6);
  const [ListSize, setlistSize] = useState(0);

  useEffect(() => {
    let data = {
      skip: Skip,
      limit: Limit,
    };
    getMainList(data);
  }, []);

  const getMainList = (data) => {
    axios.post("/api/prodict/products", data).then((res) => {
      if (res.data.success) {
        console.log(res.data.roomList);
        if (data.loadMore) {
          //더보기 버튼 클릭됐을 때
          setList([...List, ...res.data.roomList]);
        } else {
          setList(res.data.roomList);
        }
        // 백에서 listSize 즉, 해당 데이터의 전체길이를 받아와야한다.
        setlistSize(res.data.listSize);
      } else {
        // 데이터가 data.success가 아닐 때
        alert("리스트를 가져오는데 실패했습니다. 😥");
      }
    });
  };

  // Limit 과 skip은 몽고 db메소드
  // limit? 처음 데이터를 가져올 때 더보기 버튼을 눌러서 가져오면 최대 얼마만큼의 데이터를
  //가져올지 정해주는 메소드
  //skip?
  // 어디서부터 데이터를 가져오는 지에 대한 위치
  // 처음 0부터 시작, limit이 6이라면 다음번엔 2rd , skip = 0 + 6
  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: Skip,
      limit: Limit,
    };

    getMainList(body);
    setSkip(skip);
  };

  return (
    <div>
      {List.length > 0 ? (
        <>
          <RoomListCont>
            {List.map((room) => {
              return (
                <Room
                  key={room._id}
                  roomId={room.roomId}
                  imageUrl={
                    room.imageUrl
                      ? room.imageUrl
                      : `${process.env.PUBLIC_URL}/img/sgether.JPG`
                  }
                  title={room.title}
                  content={room.content}
                  date={room?.date}
                  tagName={room?.tagName}
                  groupNum={room?.groupNum}
                  isLiked={room.isLiked ? room.isLiked : false}
                ></Room>
              );
            })}
          </RoomListCont>
        </>
      ) : (
        <Div> 게시물이 없습니다. </Div>
      )}

      {ListSize >= Limit && (
        <ButtonBox>
          <Btn onClick={loadMoreHandler}>Load more</Btn>
        </ButtonBox>
      )}
    </div>
  );
};

export default RoomListEx;

const RoomListCont = styled.div`
  /* width: 100%; */
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(424px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 30px;
  margin-bottom: 100px;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.button`
  width: 200px;
`;
const Div = styled.div`
  -webkit-margin-collapse: collapse;
  margin: 40px auto 100px;
`;
