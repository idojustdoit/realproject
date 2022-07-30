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
          <li>정오현</li>
          <li>하율찬</li>
          <li>조성인</li>
          <li>채예찬</li>
          <li>이호욱</li>
          <li>기영석</li>
          <li>조원희</li>
        </LeftContent>
        <LeftContentBottom>
          <li>
            <FooterLogo />
          </li>
          <li>대표자: 팀 이글루 | 프로젝트 기간: 2022-06-27 ~ 2022-07-30 </li>
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
  color: var(--blue-black);
  width: 100%;
  /* min-width: 1920px; */
  height: 250px;
  padding: 40px 250px 45px;
  background-color: var(--blue-black);
  display: flex;
  justify-content: space-between;
  transform: translateY(50%);
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
