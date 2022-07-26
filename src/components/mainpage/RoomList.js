import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMainList,
  getRoomListByCategory,
  setCategoryState,
} from "../../redux/modules/roomSlice";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Room from "./Room";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/swiper.css";
import "./RoomList.modules.css";

import roomLogo from "../../shared/mainpage-assets/icon-room-logo.svg";

import cate0 from "../../shared/category-assets/icon-cate-0.svg";
import cate1 from "../../shared/category-assets/icon-cate-1.svg";
import cate2 from "../../shared/category-assets/icon-cate-2.svg";
import cate3 from "../../shared/category-assets/icon-cate-3.svg";
import cate4 from "../../shared/category-assets/icon-cate-4.svg";
import cate5 from "../../shared/category-assets/icon-cate-5.svg";
import cate6 from "../../shared/category-assets/icon-cate-6.svg";
import cate7 from "../../shared/category-assets/icon-cate-7.svg";
import cate8 from "../../shared/category-assets/icon-cate-8.svg";
import cate9 from "../../shared/category-assets/icon-cate-9.svg";

const CATEGORY_LIST = [
  {
    num: 0,
    name: "전체",
    imageUrl: cate0,
  },
  {
    num: 1,
    name: "자격증",
    imageUrl: cate1,
  },
  {
    num: 2,
    name: "대입",
    imageUrl: cate2,
  },
  {
    num: 3,
    name: "독서",
    imageUrl: cate3,
  },
  {
    num: 4,
    name: "자기계발",
    imageUrl: cate4,
  },

  {
    num: 5,
    name: "취미",
    imageUrl: cate5,
  },
  {
    num: 6,
    name: "어학",
    imageUrl: cate6,
  },
  {
    num: 7,
    name: "코딩",
    imageUrl: cate7,
  },
  {
    num: 8,
    name: "공무원",
    imageUrl: cate8,
  },
  {
    num: 9,
    name: "자유주제",
    imageUrl: cate9,
  },
];

const RoomList = () => {
  const dispatch = useDispatch();

  //받아온 메인 룸 리스트

  console.log("😎룸리스트 렌더링..!");
  const list = useSelector((state) => state.room.roomList);
  const isLoading = useSelector((state) => state.room.isLoading);

  let [visible, setVisible] = useState(6);
  const [limit, setLimit] = useState(0);
  const [category, setCategory] = useState("전체");
  const [isActive, setIsActive] = useState(null);
  //초기에는 모든 이미지가 컬러인 상태로 보여야해서 추가한 state
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    dispatch(getMainList());
  }, []);

  useEffect(() => {
    dispatch(getRoomListByCategory(category));
  }, [category]);

  function categoryClickHandler(e, clickedCategory) {
    //카테고리를 클릭하면 map을 돌리는 visible의 값을 기본값인 6으로 초기화시킨다.
    //이후, 카테고리를 클릭한 카테고리값으로 변경해준다.
    e.preventDefault();
    // setIsActive((prevState) => e.target.value);
    setVisible(6);
    setCategory(clickedCategory);
  }

  return (
    <>
      <Container>
        <TitleH2>카테고리</TitleH2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={8}
          navigation
          onClick={(swiper) => {
            setIsActive((prev) => swiper.clickedIndex);
            setIsClicked(true);
          }}
          //반응형 적용x
        >
          {CATEGORY_LIST.map((cate, idx) => (
            <SwiperSlide
              key={cate.num}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                border: "none",
                height: "200px",
              }}
              className={
                isClicked
                  ? idx === isActive
                    ? " -active"
                    : " -not-active"
                  : ""
              }
              onClick={(e) => {
                categoryClickHandler(e, cate.name);
              }}
              value={idx}
            >
              <Img src={cate.imageUrl} style={{ filter: "none" }} />
              <Title>{cate.name}</Title>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <div>
        {!isLoading ? (
          list.length > 0 ? (
            <>
              <RoomListCont>
                {list.slice(0, visible).map((room) => {
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
            </>
          ) : (
            <div>게시물이 없습니다.</div>
          )
        ) : (
          <div> 로딩 스피너 자리 </div>
        )}
        {/* 만약 현재보고있는 room의 수가 게시물의 길이보다 같거나 크다면 showmore
        버튼을 숨긴다. */}
        {/* {visible >= list.length ? (
          <div></div>
        ) : ( */}
        <ButtonBox>
          <Btn onClick={() => dispatch(getRoomListByCategory(category))}>
            Load more
          </Btn>
        </ButtonBox>
        {/* )} */}
      </div>
    </>
  );
};

export default RoomList;

const Container = styled.section`
  min-width: 1920px;
  min-height: 390px;
  padding: 60px 300px 60px;
  background-color: #eff3f6;
  //margin-bottom은 mainpage의 section에서 적용했던 것
`;

const OneCategoryBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: none;
  height: 200px;

  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  height: 140px;
  /* width: 12vw; */
  border-radius: 50%;
  margin: 20px 0 12px 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.div`
  /* margin: 0 10px 10px; */
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const TitleH2 = styled.h2`
  /* margin-bottom: 25px; */
  padding-left: 5px;
  /*원래 폰트사이즈 30px*/
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 42px;
`;
//여기서부터가 룸 리스트 CSS
const RoomListCont = styled.div`
  padding: 60px 300px;
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
  height: 60px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 700;
  background-color: #fff;
`;
const Div = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;
