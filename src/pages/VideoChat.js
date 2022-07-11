import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/videoPage/mainScreen/Header";
import UserScreens from "../components/videoPage/mainScreen/UserScreens";
import SideView from "../components/videoPage/sideBar/SideView";

import "../App.css";

import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import UnderBar from "../components/videoPage/mainScreen/UnderBar";

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
        {/* Main Screen */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Header openBar={openBar} />

          <div style={{ display: "flex", alignItems: "center" }}>
            <Screen BarState={!openBar}>
              {/* User Screen */}
              <UserScreens BarState={!openBar} />
              <UserScreens BarState={!openBar} />
              <UserScreens BarState={!openBar} />
              <UserScreens BarState={!openBar} />

              {/* User Screen */}
            </Screen>

            <Btn onClick={sideBarHandler}>
              {openBar ? (
                <div>
                  <MdArrowForwardIos />
                </div>
              ) : (
                <div>
                  <MdArrowBackIos />
                </div>
              )}
            </Btn>
          </div>

          {/* Main Screen 하단 기능 아이콘 */}

          <UnderBar openBar={openBar} sideBarHandler={sideBarHandler} />
        </div>

        {/* Main Screen 하단 기능 아이콘 */}

        {/* Side Bar On/Off Toggle Btn */}

        {/* Side Bar On/Off Toggle Btn */}

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
  background-color: black;
  height: inherit;
  width: inherit;
  overflow: hidden;
`;

const Screen = styled.main`
  display: grid;
  width: ${(props) => (props.BarState ? "100vw" : "77vw")};
  padding: 40px;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${(props) =>
    props.BarState ? "22vw 22vw" : "19vw 19vw"};
  transition: all 0.5s;
`;

const Btn = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  margin: auto 0;
  align-items: center;
  right: 0;
  height: 100px;
  width: 0;
  border-right: 25px solid #e9e9e9;
  border-top: 20px solid black;
  border-bottom: 20px solid black;
  cursor: pointer;

  div {
    padding-left: 5px;
    font-size: 20px;
    color: #8b95a1;
  }
`;
// const Btn = styled.div`
//   position: absolute;
//   right: 0;
//   height: 70px;
//   width: 60px;
//   background-color: #e9e9e9;
//   transform: perspective(100px) rotateY(-69deg);
//   border-top-left-radius: 10px;
//   border-bottom-left-radius: 10px;
// `;

export default Video;
