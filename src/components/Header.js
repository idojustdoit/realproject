import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLoginState } from "../redux/modules/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "../styles/reset.css";

import styled from "styled-components";
// import { Button } from "@mui/material";
import { ReactComponent as LogoIcon } from "../shared/header-assets/icon-logo-header.svg";
import { ReactComponent as AlarmIcon } from "../shared/header-assets/icon-alarm-mono.svg";
import { ReactComponent as MyPageIcon } from "../shared/header-assets/login_user.svg";
import { ReactComponent as LogoutIcon } from "../shared/header-assets/icon-out-mono.svg";

function Header() {
  //loginState 기본값 false
  const loginState = useSelector((state) => state.user.isLogin);

  //isLogin 기본 state값 false
  // const [isLogin, setIsLogin] = useState(loginState);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(changeLoginState(loginState));
  };

  const loginHandler = () => {
    dispatch(changeLoginState(loginState));
    //로그인 모달 열림
  };
  const signupHandler = () => {
    //회원가입 모달열림
  };

  return (
    <HeaderCont className="header">
      <FlexBox>
        <LeftCont>
          <LogoCont>
            <LogoIcon />
          </LogoCont>
          <Ul>
            <Li>
              <Link to="/">이글루 소개</Link>
            </Li>
            <Li>
              <Link to="/">이용 가이드</Link>
            </Li>
            <Li>
              <Link to="/">커뮤니티</Link>
            </Li>
            <Li>
              <Link to="/">스터디 목록</Link>
            </Li>
          </Ul>
        </LeftCont>
        {loginState ? (
          <Ul>
            <li>
              <StudyBtn>+스터디 생성</StudyBtn>
            </li>
            <li>
              <Link to="/mypage">
                <MyPageIcon style={{ cursor: "pointer" }} />
              </Link>
            </li>
            <li>
              <Link to="/알람모달?">
                <AlarmIcon style={{ cursor: "pointer" }} />
              </Link>
            </li>
            <li>
              <LogoutIcon style={{ cursor: "pointer" }} onClick={logoutHandler}>
                로그아웃
              </LogoutIcon>
            </li>
          </Ul>
        ) : (
          <Ul>
            <li>
              <HeaderBtn onClick={loginHandler}>로그인</HeaderBtn>
            </li>
            <li>
              <HeaderBtn onClick={signupHandler}>회원가입</HeaderBtn>
            </li>
          </Ul>
        )}
      </FlexBox>
    </HeaderCont>
  );
}

const HeaderCont = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  width: 1920px;
  min-height: 80px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: black;
  font-size: 15px;
  padding: 0 300px;
  /* -webkit-box-shadow: 0px 10px 9px -7px #737373;
  box-shadow: 0px 10px 9px -7px #737373; */
`;
const FlexBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftCont = styled.div`
  display: flex;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 15px;
`;

const Li = styled.li`
  & > * {
    font-weight: 700;
    font-size: 16px;
    line-height: 19.2px;
  }
`;

const LogoCont = styled.div`
  display: flex;
  width: 130px;
  height: 24px;
  /* left: 300px; */
  top: 28px;
  margin-right: 50px;
`;

const HeaderBtn = styled.button`
  font-size: 16px;
  width: 96px;
  height: 40px;
  font-weight: 400;
  padding: 11px, 40px, 11px, 40px;
  border-radius: 4px;
  //border radius를 주면 border굵기 조정 불가
  border: 1px solid #000000;
  background-color: white;
`;

//HeaderBtn 의 내용을 전체 상속
const StudyBtn = styled(HeaderBtn)`
  width: 114px;
  background-color: white;

  margin-right: 12px;
`;

export default Header;
