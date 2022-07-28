import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { setSearchWord, getSearchRooms } from "../../redux/modules/roomSlice";
import { validateWord } from "../../shared/reg";

import { ReactComponent as SearchIcon } from "../../shared/mainpage-assets/search_icon.svg";

function SearchBanner() {
  useEffect(() => {
    getSearchRooms(initialWord);
  }, []);
  //맨 처음 메인에서 전달해준 keyword
  let initialWord = useSelector((state) => state.room.initialWord);
  console.log(initialWord);
  const dispatch = useDispatch();
  const word = useRef();
  //검색된 결과인 방들을 searchResults로 가져온다.
  const list = useSelector((state) => state.room?.searchRooms);
  console.log(list);
  // const [list, setList] = useState(InitialSearchList ? InitialSearchList : []);
  const isLoading = useSelector((state) => state.room.isLoading);

  const [searchParams] = useSearchParams();
  // console.log(searchParams);
  // const detail = searchParams.get("detail") === "true";

  function search(e) {
    e.preventDefault();
    //단어를 테스트해서 clearWord에 결과값을 넣어줌
    let clearWord = validateWord(word.current.value);
    //리덕스있는 word state를 변경하고 해당 검색어로 리스트를 불러오는 함수 실행
    dispatch(setSearchWord(clearWord));
    dispatch(getSearchRooms(clearWord));
    //빈 값으로 재세팅
    word.current.value = "";
  }

  return (
    <SearchCont>
      <SearchTitle>관심있는 스터디명을 검색해주세요.</SearchTitle>
      <SearchBox onSubmit={(e) => search(e)}>
        <SearchInput
          type="text"
          placeholder="찾을 스터디명을 입력하세요."
          ref={word}
          defaultValue={initialWord ? initialWord : ""}
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
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: gray;
  background-position: center;
  /* background-size: cover; */
  background-size: 100% auto;
`;
const SearchBox = styled.form`
  border-radius: 4px;
  width: 25%;
  display: flex;
  overflow: hidden;
  margin-bottom: 120px;
`;
const SearchTitle = styled.h1`
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
  /* outline: none; */
  color: #40407a;
`;
