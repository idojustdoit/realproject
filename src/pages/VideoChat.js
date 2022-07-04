import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/videoPage/mainScreen/Header";
import TimeBar from "../components/videoPage/mainScreen/TimeBar";
import UserScreens from "../components/videoPage/mainScreen/UserScreens";
import SideView from "../components/videoPage/sideBar/SideView";

import { BsChatDots, BsChatDotsFill } from "react-icons/bs";

const Video = () => {
  const [openBar, setOpenBar] = useState(true);

  const sideBarHandler = () => {
    if (openBar) {
      setOpenBar(false);
    } else {
      setOpenBar(true);
    }
  };
  return (
    <>
      <ScreenWrapper>
        <ScreenView>
          {/* Main Screen */}
          <Header />
          <TimeBar />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Screen BarState={!openBar}>
              {/* User Screen */}
              <UserScreens BarState={!openBar} />
              <UserScreens BarState={!openBar} />
              <UserScreens BarState={!openBar} />

              {/* User Screen */}
            </Screen>
          </div>
          {/* Main Screen 하단 기능 아이콘 */}
          <PlusBar>
            <SideBtn onClick={sideBarHandler}>
              {openBar ? <BsChatDots /> : <BsChatDotsFill />}
            </SideBtn>
          </PlusBar>
          {/* Main Screen 하단 기능 아이콘 */}

          {/* Side Bar On/Off Toggle Btn */}
          <Btn onClick={sideBarHandler}>{openBar ? ">" : "<"}</Btn>
          {/* Side Bar On/Off Toggle Btn */}
        </ScreenView>
        {/* Main Screen */}

        {/* sideBar */}
        <SideView openBar={openBar} />
        {/* sideBar */}
      </ScreenWrapper>
    </>
  );
};

const ScreenWrapper = styled.div`
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  &:nth-child(1) {
    grid-column: 1 / 3;
  } */
  display: flex;
  background-color: gray;
  height: 100vh;
`;

const ScreenView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PlusBar = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  width: inherit;
  height: 70px;
  align-items: center;
  justify-content: center;
  background-color: orange;
`;

const Screen = styled.main`
  display: grid;
  margin: 35px 15px;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
`;

const SideBtn = styled.div`
  font-size: 30px;
  color: white;
  cursor: pointer;
`;

const Btn = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
`;

export default Video;
