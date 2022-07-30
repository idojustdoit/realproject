import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setWord, getSearchRooms } from "../../redux/modules/searchSlice";

import bgImage from "../../shared/mainpage-assets/search_background_img.png";
import { ReactComponent as SearchIcon } from "../../shared/mainpage-assets/search_icon.svg";

function SearchBanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const word = useRef();

  function search(e) {
    e.preventDefault();
    if (word.current.value !== "") {
      let clearWord = word.current.value.trim();
      if (clearWord !== undefined && typeof clearWord == "string") {
        dispatch(setWord(clearWord));
        dispatch(getSearchRooms(clearWord));
        navigate(`/search?q=${clearWord}`);
      } else {
        alert("키워드를 정확히 입력해주세요.");
        return;
      }
      word.current.value = "";
    } else {
      alert("검색어를 입력해주세요.");
      return;
    }
  }

  return (
    <SearchCont>
      <SearchTitle>어떤 스터디를 찾고 계신가요?</SearchTitle>
      <SearchBox onSubmit={(e) => search(e)}>
        <SearchInput
          type="text"
          placeholder="찾을 스터디명을 검색하세요."
          ref={word}
          required
        ></SearchInput>
        <SearchBtn>
          <SearchIcon />
        </SearchBtn>
      </SearchBox>
    </SearchCont>
  );
}

export default SearchBanner;

const SearchCont = styled.div`
  width: 100%;
  /* min-width: 1920px; */
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${bgImage}) no-repeat;
  background-position: center;
  background-size: 100% 100%;
`;
const SearchBox = styled.form`
  border-radius: 4px;
  width: 25%;
  display: flex;
  overflow: hidden;
  margin-bottom: 120px;
`;
const SearchTitle = styled.h1`
  /* filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)); */
  font-size: 30px;
  font-weight: 700;
  margin: 0px 20px 20px 20px;
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
  /* border-radius: 0 4px 4px 0; */
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
  /* border-radius: 4px 0 0 4px; */
  outline: none;
  color: #40407a;

  &:focus,
  &:active {
  }
`;
