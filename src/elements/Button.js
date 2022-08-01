import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";

export const BasicBtn = ({ roomId, userVideo }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const postTimerData = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios({
      method: "POST",
      url: `/api/room/exit/${roomId}/${userId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      baseURL: API_URL,
    })
      .then((response) => {
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {});
  };

  const outAlert = () => {
    MySwal.fire({
      title: "EXIT",
      text: "정말 나가시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "승인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        postTimerData();

        userVideo.current.srcObject.getVideoTracks().forEach((track) => {
          track.stop();
        });
        userVideo.current.srcObject.getAudioTracks().forEach((track) => {
          track.stop();
        });
      }
    });
  };
  return (
    <div>
      <Button onClick={outAlert}>스터디 종료</Button>
    </div>
  );
};

const Button = styled.button`
  border: none;
  outline: none;
  width: 90px;
  height: 35px;
  border-radius: 5px;
  background-color: #1d9ffd;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  margin: 15px;
`;