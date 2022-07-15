import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Kakaologin() {
  const navigate = useNavigate();
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "75f121198efee416687964ae4caad0d5";
    console.log(code);
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?
        grant_type=${grant_type}
        &client_id=${client_id}
        &redirect_uri=http://localhost:3000/Kakaologin
        &code=${code}
        `,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("access_token", res.data.accessToken);
        sessionStorage.setItem("refresh_token", res.data.refreshToken);
        navigate("/");
      });
  }, []);
  return <div> Kakaologin</div>;
}

export default Kakaologin;
