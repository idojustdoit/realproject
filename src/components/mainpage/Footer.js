import React from "react";
import styled from "styled-components";
import { ReactComponent as FooterLogo } from "../../shared/mainpage-assets/icon-logo-footer 1.svg";
import "../../styles/reset.css";

const Footer = () => {
  return (
    <FooterCont>
      <LeftCont>
        <li style={{ marginRight: "60px" }}>
          <FooterLogo />
        </li>
        <li>회사소개</li>
        <li>스게더</li>
        <li>공지사항</li>
        <li>1:1문의</li>
        <li>FAQ</li>
      </LeftCont>
      <RightCont>
        <li>대표자: 사업자 등록번호: 783-86-01715</li>
        <li>주소: 서울특별시 강남구 테헤란로44길 8 12층</li>
        <li>이메일: contact@teamsparta.co 전화: 1522-8016</li>
      </RightCont>
    </FooterCont>
  );
};

export default Footer;

const FooterCont = styled.div`
  /* width: 100%; */
  height: 149px;
  padding: 36px 300px 0 300px;
  background-color: #717171;
  display: flex;
  justify-content: space-between;
  /* display: flex; */
`;

const LeftCont = styled.ul`
  display: flex;
  gap: 1.5rem;
  & > li {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
`;

const RightCont = styled.ul`
  padding-right: 20px;
  font-weight: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > li {
    font-size: 16px;
    color: white;
    font-weight: 400;
  }
`;
