import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import "../styles/reset.css";

import Header from "../components/Header";
import SearchBanner from "../components/mainpage/SearchBanner";
import RoomList from "../components/mainpage/RoomList";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <>
      <MainCont>
        <Header />
        <SearchBanner />
        <RoomListSection>
          <RoomList />
        </RoomListSection>
        <Footer />
      </MainCont>
    </>
  );
}

export default MainPage;

const MainCont = styled.div`
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--blue-black);
`;

const RoomListSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //지금은 카테고리랑 리스트가 RoomListEx에 같이있어서 column으로 설정
  flex-direction: column;

  /* padding: 0 300px; */
`;
