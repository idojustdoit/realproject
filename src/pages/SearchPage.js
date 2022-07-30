import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import SearchBanner from "../components/searchpage/SearchBanner";
import SearchRoomList from "../components/searchpage/SearchRoomList";
import Footer from "../components/Footer";

const SearchPage = () => {
  return (
    <MypageCont>
      <Header />
      <SearchBanner />
      <ContentCont>
        <SearchRoomList />
      </ContentCont>
      <Footer />
    </MypageCont>
  );
};

export default SearchPage;

const MypageCont = styled.div`
  margin: 0 auto;
  width: 1920px;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentCont = styled.section`
  width: 100%;
`;
