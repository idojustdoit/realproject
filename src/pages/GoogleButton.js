import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import google from "../shared/login-assets/google.png";

const clientId = process.env.REACT_APP_CLIENT_ID;

const GoogleButton = ({ onSocial }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  // const navigate = useNavigate();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  const onSuccess = (response) => {
    const tokenId = response.tokenId;
    const nickname = response.profileObj.name;
    const email = response.profileObj.email;
    const iconUrl = response.profileObj.imageUrl;

    let body = {
      data: {
        tokenId: tokenId,
        nickname: nickname,
        email: email,
        iconUrl: iconUrl,
      },
    };

    axios.post(`${API_URL}/api/google/login`, body).then((res) => {
      console.log(res);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userId", res.data.userId);
    });
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          style={{
            backgroundImage: `url(${google})`,
            width: "360px",
            height: "50px",
            border: "0px",
          }}
        ></button>
      )}
    />
  );
};

export default GoogleButton;
