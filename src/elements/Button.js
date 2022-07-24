import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BasicBtn = ({ roomId }) => {
  const navigate = useNavigate();

  const postTimerData = () => {
    navigate("/");
    const token = localStorage.getItem("accessToken");
    axios({
      method: "POST",
      url: `/api/room/exit/${roomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },

      baseURL: "http://15.164.164.17:3000",
    })
      .then((response) => {
        console.log(response);
        alert("성공");
      })
      .catch((error) => {
        console.log(error);
        alert("실패");
      });
  };
  return (
    <div>
      <Button onClick={postTimerData}>스터디 종료</Button>
    </div>
  );
};

const Button = styled.button`
  border: none;
  outline: none;
  width: 90px;
  height: 35px;
  border-radius: 5px;
  background-color: black;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  margin: 15px;
`;
