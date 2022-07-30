import React from "react";
import styled from "styled-components";
import { ReactComponent as Search404 } from "../../shared/searchpage-assets/icon-warning-no-result.svg";

function SearchNotFound() {
  return (
    <Container>
      <Search404 />
      <span>검색 결과가 없습니다.</span>
    </Container>
  );
}

export default SearchNotFound;

const Container = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 380px;
  gap: 30px;

  & > span {
    font-size: 20px;
  }
`;
