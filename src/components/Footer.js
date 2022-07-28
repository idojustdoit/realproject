import React from "react";
import styled from "styled-components";
import "../styles/reset.css";

import { ReactComponent as FooterLogo } from "../shared/footer-assets/icon-logo.svg";
import { ReactComponent as FacebookLogo } from "../shared/footer-assets/icon-facebook.svg";
import { ReactComponent as InstaLogo } from "../shared/footer-assets/icon-insta.svg";
import { ReactComponent as TweeterLogo } from "../shared/footer-assets/icon-tweeter.svg";
import { ReactComponent as YoutubeLogo } from "../shared/footer-assets/icon-youtube.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterCont>
      <LeftContBox>
        <LeftContent>
          <li>회사소개</li>
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>공지사항</li>
          <li>FAQ</li>
          <li>1:1문의</li>
          <li>제휴문의</li>
        </LeftContent>
        <LeftContentBottom>
          <li>
            <FooterLogo />
          </li>
          <li>대표자: 이글루 | 사업자 등록번호: 222-22-22222</li>
          <li>
            주소: 서울특별시 강남구 테헤란로22길 2 22층 | 이메일 :
            egloo@gmail.com
          </li>
          <li style={{ color: "#5d5d5d" }}>
            ⓒ 2022. E-GLOO allrights reserved.
          </li>
        </LeftContentBottom>
      </LeftContBox>
      <RightCont>
        <Link to="/">
          <FacebookLogo />
        </Link>
        <Link to="/">
          <InstaLogo />
        </Link>
        <Link to="/">
          <TweeterLogo />
        </Link>
        <Link to="/">
          <YoutubeLogo />
        </Link>
      </RightCont>
    </FooterCont>
  );
};

export default Footer;

const FooterCont = styled.footer`
  width: 100%;
  min-width: 1920px;
  height: 250px;
  padding: 40px 250px 45px;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  /* display: flex; */
`;
const LeftContBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LeftContent = styled.ul`
  display: flex;
  gap: 40px;
  & > li {
    font-size: 20px;
    font-weight: 700;
    color: #a8a8a8;
  }
`;

const LeftContentBottom = styled(LeftContent)`
  flex-direction: column;
  gap: 12px;
  & > li {
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
  }
`;

const RightCont = styled.ul`
  padding-right: 20px;
  display: flex;
  /* flex-direction: column; */
  gap: 12px;
`;
