import "../styles/reset.css";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// import { getMypageInfos } from "../redux/modules/roomSlice";

import { ReactComponent as EditUserInfoIcon } from "../shared/mypage-assets/icon-update-userInfo.svg";
import userAvatar from "../shared/mypage-assets/user-basic-img.png";

import Header from "../components/Header";
import Graph from "../components/Graph";
import Tab from "../components/mypage/Tab";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

const Mypage = () => {
  const USER_ID = localStorage.getItem("userId");
  const API_URL = process.env.REACT_APP_API_URL;
  const TOKEN = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const modify = () => {
    navigate("/modify");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [attendRooms, setAttendRooms] = useState([]);
  const [hostRooms, setHostRooms] = useState([]);
  const [likeRooms, setLikeRooms] = useState([]);
  const [email, setEmail] = useState("");
  const [nickname, setNickName] = useState("");

  const dispatch = useDispatch();

  const getMypageInfos = useCallback(async () => {
    axios
      .get(`${API_URL}/api/mypage/${USER_ID}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        setIsLoading(true);
        console.log(res.data);
        if (res.data.result) {
          setIsLoading(false);
          setAttendRooms(res.data.myPage?.attendRoom);
          setHostRooms(res.data.myPage?.hostRoom);
          setLikeRooms(res.data.myPage?.userLike);
          setEmail(res.data.myPage?.email);
          setNickName(res.data.myPage?.nickname);
        }
      })
      .catch((e) => console.log(e));
  });

  useEffect(() => {
    getMypageInfos();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <MypageCont>
      <Header />
      <ContentBox>
        <UpperCont>
          <h2>마이페이지</h2>
          <Cont>
            <UserCardCont>
              <UserCardTop>
                <img alt="user" src={userAvatar} />
                <FlexCont>
                  <UserInfo>
                    <div>
                      {nickname}님
                      <EditButton onClick={modify}>
                        <EditUserInfoIcon />
                      </EditButton>
                    </div>
                    <span>{email}</span>
                  </UserInfo>
                </FlexCont>
              </UserCardTop>
              <UserCardBottom>
                <li>
                  참여중<span>{attendRooms.length}</span>
                </li>
                <li>
                  호스팅중<span>{hostRooms.length}</span>
                </li>
                <li>
                  찜<span>{likeRooms.length}</span>
                </li>
              </UserCardBottom>
            </UserCardCont>
            <GraphCard>
              <Graph />
            </GraphCard>
          </Cont>
        </UpperCont>
        <RoomsCont className="menu-nav__cont">
          <Tab
            attendRooms={attendRooms}
            hostRooms={hostRooms}
            likeRooms={likeRooms}
            isLoading={isLoading}
          />
        </RoomsCont>
      </ContentBox>
      <Footer />
    </MypageCont>
  );
};
const MypageCont = styled.div`
  color: var(--blue-black);
  width: 1920px;
  margin: 0 auto;
  height: auto;
  padding-top: 80px;
`;
const ContentBox = styled.div`
  //헤더fixed라서 헤더만큼 공간 띄워주기
`;
const UpperCont = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 300px;
  background-color: #f6f6f6;

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
  width: 648px;
  height: 370px;
  background-color: #fff;
  border-radius: 10px;
  -webkit-box-shadow: var(--card-box-shadow);
  box-shadow: var(--card-box-shadow);
  overflow: hidden;
`;

const UserCardTop = styled.div`
  background-color: #fff;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 47px 28px;
  border-bottom: 3px solid #e5e5e5;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #d0d0d0;
    object-fit: cover;
    /* background: center; */
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
    align-items: center;
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
  height: 20px;
  background: none;
  border: none;
  padding: 0;
  /* font-size: 16px; */
`;

const UserCardBottom = styled.ul`
  height: 45%;
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
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--card-box-shadow);
`;
// const GraphCard = styled(UserCardCont)``;

const RoomsCont = styled.div`
  padding: 60px 276px;
  height: 50%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default Mypage;
