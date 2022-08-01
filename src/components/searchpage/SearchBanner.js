import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { setWord, getSearchRooms } from "../../redux/modules/searchSlice";

import { ReactComponent as SearchIcon } from "../../shared/mainpage-assets/search_icon.svg";

function SearchBanner() {
  const [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("q");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  console.log("렌더링?");
  function searchQuery(q) {
    dispatch(getSearchRooms(q));
    dispatch(setWord(q));
  }
  useEffect(() => {
    searchQuery(query);
  }, [query]);

  //맨 처음 메인에서 전달해준 keyword
  let word = useSelector((state) => state.search.word);

  const inputWord = useRef();
  const isLoading = useSelector((state) => state.search.isLoading);

  function search(e) {
    e.preventDefault();
    //단어를 테스트해서 clearWord에 결과값을 넣어줌

    if (inputWord.current.value !== "") {
      let clearWord = inputWord.current.value.trim();
      if (clearWord !== undefined && typeof clearWord == "string") {
        // dispatch(setWord(clearWord));
        // dispatch(getSearchRooms(clearWord));
        setSearchParams({ q: `${clearWord}` });
      } else {
        alert("키워드를 정확히 입력해주세요.");
        return;
      }
      inputWord.current.value = "";
    } else {
      alert("검색어를 입력해주세요.");
      return;
    }
  }

  // let clearWord = validateWord(inputWord.current.value.trim());

  //리덕스있는 word state를 변경하고 해당 검색어로 리스트를 불러오는 함수 실행

  return (
    <SearchCont>
      <SearchTitle>관심있는 스터디명을 검색해주세요.</SearchTitle>
      <SearchBox onSubmit={(e) => search(e)}>
        <SearchInput
          type="text"
          placeholder="찾을 스터디명을 입력하세요."
          ref={inputWord}
          defaultValue={word ? word : ""}
        ></SearchInput>
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
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eff3f6;
  background-position: center;
  /* background-size: cover; */
  background-size: 100% auto;
`;
const SearchBox = styled.form`
  border-radius: 4px;
  width: 25%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const SearchTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  margin: 0px 20px 20px 20px;
  line-height: 42px;
  color: black;
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
  /* outline: none; */
  color: #40407a;
`;
