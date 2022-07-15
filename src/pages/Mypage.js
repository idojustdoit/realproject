import React, { useEffect, useState, useRef } from "react";
import "../styles/reset.css";
import styled from "styled-components";
import axios from "axios";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { ReactComponent as EditUserInfoIcon } from "../shared/mypage-assets/icon-update-userInfo.svg";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RoomList from "../components/mypage/RoomList";
import SmallRoom from "../components/mypage/SmallRoom";
import SmallRoomSlider from "../components/mypage/SmallRoomSlider";

const Mypage = () => {
  const BASE_URL = `서버주소`;
  const [listValue, setListValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setListValue(newValue);
    //newValue 값으로 axios 요청보내서 해당하는 자료 가져오기
  };

  const [items, setItems] = useState([]);

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Section>
        <UserCont>
          <h2>마이페이지</h2>
          <Cont>
            <UserCardCont>
              <UserCardTop>
                <img
                  alt="user"
                  src="https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg"
                />
                <FlexCont>
                  <UserInfo>
                    <div>
                      스게더님{" "}
                      <EditButton>
                        <EditUserInfoIcon />
                      </EditButton>
                    </div>
                    <span>sgether@gmail.com</span>
                  </UserInfo>
                </FlexCont>
              </UserCardTop>
              <hr />
              <UserCardBottom>
                <li>
                  참여중<span>3</span>
                </li>
                <li>
                  호스팅중<span>0</span>
                </li>
                <li>
                  찜<span>2</span>
                </li>
              </UserCardBottom>
            </UserCardCont>
            <GraphCard></GraphCard>
          </Cont>
        </UserCont>
        <StudyCont className="menu-nav__cont">
          <TabContext value={listValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="tab list"
                textColor="inherit"
                indicatorColor="primary"
                className="user-list"
              >
                <CustomBtn
                  label="참여중인 스터디"
                  value="1"
                  sx={{ fontSize: "20px" }}
                />
                <CustomBtn
                  label="호스팅중인 스터디"
                  value="2"
                  sx={{ fontSize: "20px" }}
                />
                <CustomBtn
                  label="찜한 스터디"
                  value="3"
                  sx={{ fontSize: "20px" }}
                />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: "0", paddingTop: "62px" }} value="1">
              <SmallRoomSlider />
            </TabPanel>
            <TabPanel sx={{ padding: "0", paddingTop: "62px" }} value="2">
              <RoomList />
            </TabPanel>
            <TabPanel sx={{ padding: "0", paddingTop: "62px" }} value="3">
              <RoomList />
            </TabPanel>
          </TabContext>
        </StudyCont>
      </Section>
      <Footer />
    </div>
  );
};

const Section = styled.section`
  /* height: calc(100vh - (80px + 149px)); */
  height: 1561px; //디자이너님이 써주신거
  //헤더fixed라서 헤더만큼 공간 띄워주기
  padding-top: 80px;
`;
const UserCont = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 300px;
  background-color: #f6f6f6;
  /* gap: 24px; */

  & > h2 {
    margin: 60px 0 40px 0;
    font-weight: 700;
    font-size: 30px;
  }
`;
const Cont = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 100px;
`;

const UserCardCont = styled.div`
  width: 100%;
  height: 370px;
  background-color: #ffaab8;
  border-radius: 10px;
  -webkit-box-shadow: 1px 8px 12px -7px #8f8f8f;
  box-shadow: 1px 8px 12px -7px #8f8f8f;
  overflow: hidden;
`;

const UserCardTop = styled.div`
  background-color: antiquewhite;
  display: flex;
  gap: 16px;
  align-items: center;
  /* justify-content: space-between; */
  padding: 47px 28px;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: gray;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > div {
    font-weight: 700;
    font-size: 30px;
    display: flex;
    align-items: stretch;
    gap: 14px;
  }
  & > span {
    font-weight: 700;
    font-size: 20px;
  }
`;

const FlexCont = styled.div`
  display: flex;
  /* gap: 140px; */
`;
const EditButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  /* font-size: 16px; */
`;

const UserCardBottom = styled.ul`
  padding: 34px 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    font-size: 30px;
    font-weight: 700;
    & > span {
      font-size: 30px;
      font-weight: 400;
    }
  }
`;

const GraphCard = styled(UserCardCont)`
  background-color: #a6a6fa;
`;

const StudyCont = styled.div`
  margin-top: 60px;
  padding: 0 300px;
  height: 50%;
  overflow: hidden;
  /* bottom: 0; */
`;

const CustomBtn = styled(Tab)`
  &:active,
  &:focus {
    font-weight: 700;
  }
`;

export default Mypage;
