import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/reset.css";
import axios from "axios";
import { getMainList } from "../redux/modules/roomSlice";

import styled from "styled-components";
import Header from "../components/Header";
import SearchBanner from "../components/mainpage/SearchBanner";
import Category from "../components/mainpage/Category";
import RoomList from "../components/mainpage/RoomList";
import Footer from "../components/Footer";

import { DUMMY_ROOM_LIST } from "../components/mypage/RoomList";

const CATEGORY_DUMMY = [
  {
    index: 0,
    name: "전체",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 1,
    name: "자격증",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 2,
    name: "대입",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 3,
    name: "독서",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 4,
    name: "자기계발",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },

  {
    index: 5,
    name: "취미",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 6,
    name: "어학",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 7,
    name: "코딩",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 8,
    name: "공무원",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
  {
    index: 9,
    name: "자유주제",
    imageUrl:
      "https://ldb-phinf.pstatic.net/20200714_113/1594691212411H8ptA_JPEG/4ZyjkVgbisSaFyhszYkEN7IJ.jpg?type=f804_408_60_sharpen",
  },
];

function MainPage() {
  const category = useSelector((state) => state.room.category);
  useEffect(() => {
    dispatch(getMainList());
  }, []);

  useEffect(() => {}, [category]);
  // window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("전체");
  const [categoryIndex, setCategoryIndex] = useState("0");
  const [roomList, setRoomList] = useState([]);

  // 카테고리 {index(혹은 id): 0, name:"전체"} 현재 내가 쓰는 거
  // 카테고리 { 0 : "전체"} -> 이렇게 줄 건지?

  //받아온 메인 룸 리스트
  const list = useSelector((state) => state.room.roomList);
  const loadingState = useSelector((state) => state.room?.axiosState);
  console.log(loadingState);

  return (
    <div style={{ width: "1920px" }}>
      <Header />
      <MainCont>
        <SearchBanner />
        <CategorySection>
          <Category />
        </CategorySection>
        <RoomListSection>
          <RoomList roomList={list} />
        </RoomListSection>
      </MainCont>
      <Footer />
    </div>
  );
}

export default MainPage;

const MainCont = styled.div`
  margin: 0 auto;
  width: 1920px;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BasicSection = styled.section`
  /* width: 100%; */
`;
const CategorySection = styled(BasicSection)`
  width: 100%;
  margin-bottom: 60px;
`;
const RoomListSection = styled(BasicSection)`
  /* background-color: #f5f5f5; */
  width: 100%;
  padding: 0 300px;
`;

const RoomGrid = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 450px);
  grid-column-gap: 24px;
  grid-row-gap: 30px;
`;

//❕ 아래는 카테고리
const Title = styled.h2`
  /* margin-bottom: 25px; */
  margin-top: 60px;
  padding-left: 5px;
  font-size: 30px;
  font-weight: 700;
  line-height: 42px;
`;
const CategoryContent = styled.div`
  /* width: 1200px; */
  /* width: 100%; */
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  padding: 0 5px;
`;
const OneCateCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;
const CategoryImage = styled.div`
  min-width: 140px;
  min-height: 140px;
  border-radius: 50%;
  background: url(${(props) => props.imageUrl});
`;
const CateName = styled.span`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
`;
