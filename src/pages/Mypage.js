import React from "react";
import "../styles/reset.css";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Header from "../components/mainpage/Header";
import Footer from "../components/mainpage/Footer";
import RoomList from "../components/mainpage/RoomList";

const Mypage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Section>
      <Header />
      <UserCont>
        <h2>마이페이지</h2>
        <UserCard></UserCard>
        <UserCard></UserCard>
      </UserCont>
      <StudyCont className="menu-nav__cont">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="참여중인 스터디" value="1" />
              <Tab label="호스팅중인 스터디" value="2" />
              <Tab label="찜한 스터디" value="3" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: "0", paddingTop: "62px" }} value="1">
            <RoomList />
          </TabPanel>
          <TabPanel value="2">
            <RoomList />
          </TabPanel>
          <TabPanel value="3">
            <RoomList />
          </TabPanel>
        </TabContext>
      </StudyCont>
      <Footer />
    </Section>
  );
};

const Section = styled.section`
  width: 100%;
  /* height: calc(100vh - (80px + 149px)); */
  height: 1561px; //디자이너님이 써주신거
  /* padding: 0 300px; */
`;
const UserCont = styled.div`
  height: 50%;
  display: flex;
  gap: 24px;
`;

const UserCard = styled.div``;

const StudyCont = styled.div`
  height: 50%;
  overflow: hidden;
  /* bottom: 0; */
`;

export default Mypage;
