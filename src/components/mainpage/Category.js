import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryState } from "../../redux/modules/roomSlice";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/swiper.css";

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

//😎 07 22 기준 RoomList에 합쳐지게 됐습니다!
const Category = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);

  function categoryClickHandler(e, clickedCateName) {
    setIsActive((prevState) => e.target.value);
    dispatch(setCategoryState(clickedCateName));
  }

  return (
    <Container>
      <TitleH2>카테고리</TitleH2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={8}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
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
          >
            <Img
              src={cate.imageUrl}
              className={"cate" + (idx === isActive ? "-active" : "")}
              onClick={(e) => {
                categoryClickHandler(e, cate.name);
              }}
              value={idx}
            />
            <Title>{cate.name}</Title>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

/*👾CSS에 vw 단위 들어간 거 1440px에선 조금씩 어긋남,
 header footer 에도 padding값 vw반영
미디어 쿼리 설정해야 함 (2022 07 19)
*/
const Container = styled.section`
  min-width: 1920px;
  min-height: 390px;
  padding: 40px 300px 60px;
  background-color: #eff3f6;
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
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 42px;
`;

export default Category;
