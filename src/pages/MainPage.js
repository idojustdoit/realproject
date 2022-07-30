import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import "../styles/reset.css";

import Header from "../components/Header";
import SearchBanner from "../components/mainpage/SearchBanner";
import RoomList from "../components/mainpage/RoomList";
import RoomListEx from "../components/mainpage/RoomListEx";
import Footer from "../components/Footer";

function MainPage() {
  return (
    <>
      <MainCont>
        <Header />
        <SearchBanner />
        <RoomListSection>
          <RoomListEx />
        </RoomListSection>
        <Footer />
      </MainCont>
    </>
  );
}

export default MainPage;

const MainCont = styled.div`
  width: 1920px;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--blue-black);
`;

const BasicSection = styled.section`
  width: 100%;
`;

const RoomListSection = styled(BasicSection)`
  width: 100%;

  /* padding: 0 300px; */
`;
