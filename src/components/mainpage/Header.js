import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../../redux/modules/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/reset.css";
import SignUp from "../Signup";
import Portal from "../Portal";
import LogIn from "../Login";
import Creatroom from "../Createroom";
// import Invite from "../components/Invite";

import styled from "styled-components";
// import { Button } from "@mui/material";
import { ReactComponent as LogoIcon } from "../../shared/mainpage-assets/logo.svg";
import { ReactComponent as AlarmIcon } from "../../shared/mainpage-assets/icon-alarm-mono.svg";
import { ReactComponent as MyPageIcon } from "../../shared/mainpage-assets/login_user.svg";
import { ReactComponent as LogoutIcon } from "../../shared/mainpage-assets/icon-out-mono.svg";

function Header() {
  //isAuth는 리덕스용
  const isAuth = useSelector((state) => state.auth.isAuth);

  //isLogin 기본 state값 false
  const token = sessionStorage.getItem("accessToken");
  // const dispatch = useDispatch();

  const logoutHandler = (e) => {
    // dispatch(authActions.logout());
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const [LogInOpen, setIsLogInOpen] = React.useState(false);
  const [SignUpOpen, setSignUpOpen] = React.useState(false);
  const [CreateOpen, setCreateOpen] = React.useState(false);

  // const [InviteOpen, setInviteOpen] = React.useState(false);

  const LoginModal = () => {
    setIsLogInOpen(!LogInOpen);
    //로그인 모달 열림
  };

  const SignupModal = () => {
    setSignUpOpen(!SignUpOpen);
    //회원가입 모달열림
  };

  const createModal = () => {
    setCreateOpen(!CreateOpen);
  };

  // const InviteModal = () => {
  //   setInviteOpen(!InviteOpen);
  // }; 초대 모달

  return (
    <HeaderCont className="header">
      <FlexBox>
        <LeftCont>
          <LogoCont>
            <LogoIcon />
          </LogoCont>
          <Ul>
            <Li>
              <Link to="/">스터디 소개</Link>
            </Li>
            <Li>
              <Link to="/">스터디 목록</Link>
            </Li>
            <Li>
              <Link to="/">커뮤니티</Link>
            </Li>
          </Ul>
        </LeftCont>
        {token ? (
          <Ul>
            <li>
              <StudyBtn onClick={createModal}>+스터디 생성</StudyBtn>
              <Portal>
                {CreateOpen && <Creatroom onClose={createModal} />}
              </Portal>
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
              <HeaderBtn onClick={LoginModal}>로그인</HeaderBtn>
              <Portal>
                {LogInOpen && (
                  <LogIn onClose={LoginModal} SignOpen={SignupModal} />
                )}
              </Portal>
            </li>
            <li>
              <HeaderBtn onClick={SignupModal}>회원가입</HeaderBtn>
              <Portal>
                {SignUpOpen && (
                  <SignUp onClose={SignupModal} LoginOpen={LoginModal} />
                )}
              </Portal>
            </li>
          </Ul>
        )}
      </FlexBox>
    </HeaderCont>
  );
}

const HeaderCont = styled.header`
  /* position: absolute; */
  top: 0;
  /* width: 100%; */
  min-height: 80px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background-color: #fff;
  color: black;
  /* padding: 0 10px; */
  font-size: 15px;
  padding: 0 300px;
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
  gap: 20px;
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
  cursor: pointer;
`;

//HeaderBtn 의 내용을 전체 상속
const StudyBtn = styled(HeaderBtn)`
  width: 114px;
  background-color: black;
  color: white;
  margin-right: 12px;
`;

export default Header;
