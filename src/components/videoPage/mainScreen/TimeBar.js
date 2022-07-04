import React from "react";
import styled from "styled-components";

const TimeBar = () => {
  return (
    <Wrapper>
      <p>
        Timer: <span>00:00:00</span>
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  background-color: black;
  color: white;
  font-weight: bold;
  border-bottom: 2px solid blue;
  p {
    margin: 15px;
  }
`;
export default TimeBar;
