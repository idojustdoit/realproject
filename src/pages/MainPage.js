import React, { useEffect, useRef, useState } from "react";
import { useSelect, useDispatch } from "react-redux";
import "../styles/reset.css";

import styled from "styled-components";
import Header from "../components/mainpage/Header";
import Footer from "../components/mainpage/Footer";
import SearchBanner from "../components/mainpage/SearchBanner";
import RoomList from "../components/mainpage/RoomList";
import { getAllListsDB } from "../redux/modules/groupSlice";

import axios from "axios";
import Category from "../components/mainpage/Category";

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

// 카테고리랑 메인페이지 분리하고싶은데 리덕스로 안뽑아서 같은 형제컴포라 상위에서 어떤 카테고리
// 눌렀는지 정보 props로 내려주려고 이렇게 만듦
function MainPage() {
  const BASE_URL = ``;
  useEffect(() => {
    // dispatch(getAllListsDB());
    axios.get(`${BASE_URL}/rooms`).then((response) => {
      console.log(response.data);
      // dispatch(loadAllPost(response.data.result));
    });

    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("전체");
  const [categoryIndex, setCategoryIndex] = useState("0");
  const [roomList, setRoomList] = useState([]);
  // 카테고리 {index(혹은 id): 0, name:"전체"} 현재 내가 쓰는 거
  // 카테고리 { 0 : "전체"} -> 이렇게 줄 건지?

  function categoryClickHandler(name, index) {
    console.log(name, index);
    axios.get(`${BASE_URL}/rooms/tag/${index}`).then((res) => {
      console.log(res.data.roomList);
      let data = res.data.roomList;
      setRoomList(data);
    });
    // setRoomList(data);
    setCategoryName(name);
    setCategoryIndex(index);
  }
  useEffect(() => {}, [categoryName, categoryIndex]);

  return (
    <div style={{ width: "1920px" }}>
      <Header />
      <SearchBanner />
      <MainCont>
        <CategorySection>
          <Category />
        </CategorySection>
        <RoomListSection>
          <RoomList roomList={roomList} />
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const BasicSection = styled.section`
  /* width: 100%; */
`;
const CategorySection = styled(BasicSection)`
  background-color: #f5f5f5;
  width: 100%;
`;
const RoomListSection = styled(BasicSection)`
  background-color: #f5f5f5;
  padding: 0 300px;
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
