import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Kakaologin() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const href = window.location.href;
    let params = new URL(href).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/kakaotalk&code=${code}`,
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
          .post("https://egloo.shop/api/kakao/login", {
            access_token,
            refresh_token,
          })
          .then((res) => {
            console.log(res);
            const user_id = res.data.id;
            const user_email = res.data.kakao_account.email;
            const user_nickname = res.data.kakao_account.profile.nickname;
            const user_url = res.data.kakao_account.profile.profile_image_url;
            axios
              .post(
                "https://egloo.shop/api/kakao/newuser",
                {
                  user_id: user_id,
                  user_email: user_email,
                  user_nickname: user_nickname,
                  user_url: user_url,
                },
                {
                  "content-type": "application/json",
                }
              )
              .then((res) => {
                console.log(res);
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("userId", res.data.snsId);
                localStorage.setItem("imgUrl", res.data.imgUrl);

                navigate("/");
              })
              .catch((error) => {
                console.log(error);
              });
          });
      });
  }, []);
  return null;
}

export default Kakaologin;
