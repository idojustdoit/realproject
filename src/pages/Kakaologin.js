import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Kakaologin() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = process.env.REACT_APP_CLIENT_ID;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/Kakaologin&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        const access_token = res.data.access_token;
        const refresh_token = res.data.refresh_token;
        axios
          .post(`${API_URL}/api/kakao/login`, {
            access_token,
            refresh_token,
          })
          .then((res) => {
            const user_id = res.data.id;
            const user_email = res.data.kakao_account.email;
            const user_nickname = res.data.kakao_account.nickname;
            const user_url = res.data.kakao_account.profile.profile_image_url;
            axios
              .post(`${API_URL}/api/kakao/newuser`, {
                user_id,
                user_email,
                user_nickname,
                user_url,
              })
              .then((res) => {
                console.log(res);
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("userId", res.data.snsId);
                navigate("/");
              });
          });
      });
  }, []);
  return <div> Kakaologin</div>;
}

export default Kakaologin;
