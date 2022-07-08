import React from "react";
import styled from "styled-components";
// import { MdSearch } from "react-icons/md";
import bgImage from "../../shared/mainpage-assets/search_background.png";
import { ReactComponent as SearchIcon } from "../../shared/mainpage-assets/search_icon.svg";

function SearchBanner() {
  return (
    <SearchCont>
      <SearchTitle>어떤 스터디를 찾고 계신가요?</SearchTitle>
      <SearchBox>
        <SearchInput type="text"></SearchInput>
        <SearchBtn type="submit">
          <SearchIcon />
        </SearchBtn>
      </SearchBox>
    </SearchCont>
  );
}

export default SearchBanner;

const SearchCont = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${bgImage});
  background-size: cover;
`;
const SearchBox = styled.div`
  border-radius: 7px;
  width: 25%;
  display: flex;
`;
const SearchTitle = styled.h1`
  /* filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)); */

  font-size: 30px;
  font-weight: 700;
  margin: 10px 20px 20px 20px;
  line-height: 42px;
  color: white;
`;

const SearchBtn = styled.button`
  width: 40px;
  /* height: 36px; */
  border: 1px solid #ddd;
  border-left: none;
  background: #fff;
  color: black;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 28px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 500px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-right: none;
  padding: 5px 10px;
  height: 40px;
  border-radius: 4px 0 0 4px;
  outline: none;
  color: #40407a;

  &:focus,
  &:active {
  }
`;
