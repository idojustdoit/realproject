import React from "react";
import styled from "styled-components";
import "../styles/reset.css";

import { ReactComponent as FooterLogo } from "../shared/footer-assets/icon-logo.svg";
import { ReactComponent as ReactLogo } from "../shared/footer-assets/icon-react.svg";
import { ReactComponent as NodeLogo } from "../shared/footer-assets/logo-nodejs.svg";
import { ReactComponent as GithubLogo } from "../shared/footer-assets/icon-github.svg";
import { ReactComponent as FigmaLogo } from "../shared/footer-assets/icon-figma.svg";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterCont>
      <FooterContent>
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
              Designed by Freepik | ⓒ 2022. E-GLOO allrights reserved.
            </li>
          </LeftContentBottom>
        </LeftContBox>
        <RightCont>
          <LogoDiv>
            <ReactLogo style={{ color: "white" }} />
          </LogoDiv>
          <LogoDiv>
            <NodeLogo />
          </LogoDiv>
          <LogoDiv>
            <GithubLogo />
          </LogoDiv>
          <FigmaLogo
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </RightCont>
      </FooterContent>
    </FooterCont>
  );
};

export default Footer;

const FooterCont = styled.footer`
  color: var(--blue-black);
  width: 100%;
  height: 250px;
  background-color: var(--blue-black);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50%);
`;

const FooterContent = styled.div`
  width: 1200px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;
const LeftContBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  background-color: #5d5d5d;
`;
