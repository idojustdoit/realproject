import React, { useEffect, useState, useRef } from "react";
import {useParams } from "react-router-dom";
import styled from "styled-components";
import VideoHeader from "../components/videoPage/mainScreen/VideoHeader";
import SideView from "../components/videoPage/sideBar/SideView";

import "../App.css";

import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import UnderBar from "../components/videoPage/mainScreen/UnderBar";

import { AiFillAudio } from "react-icons/ai";
import { BsFillMicMuteFill } from "react-icons/bs";
import { TbVideo, TbVideoOff } from "react-icons/tb";

//socket
import io from "socket.io-client";

// const socket = io.connect("http://3.35.26.55");
const socket = io.connect("https://www.e-gloo.link");

const Video = () => {
  const nick = "성인";


  const {roomId} = useParams();

  const [openBar, setOpenBar] = useState(true);

  const sideBarHandler = () => {
    if (openBar) {
      setOpenBar(false);
    } else {
      setOpenBar(true);
    }
  };

  const video_ref = useRef();
  const second_video_ref = useRef();
  //camera, mute control
  const [videoCtrl, setVideoCtrl] = useState(false);
  const [mute, setMute] = useState(false);

  //camera, audio device select
  const [cameraDevice, setCameraDevice] = useState([]);
  const [audioDevice, setAudioDevice] = useState([]);

  //선택한 device 적용
  const [audioId, setAudioId] = useState();
  const [cameraId, setCameraId] = useState();

  const user_video = video_ref.current; //video tag ref값 추출
  //camera on/off btn click

  const cameraClick = () => {
    user_video.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!videoCtrl) {
      setVideoCtrl(true);
    } else {
      setVideoCtrl(false);
    }
  };

  //mute on/off btn click
  const muteClick = () => {
    user_video.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!mute) {
      setMute(true);
    } else {
      setMute(false);
    }
  };

  //Media 실행(user video, audio)
  useEffect(() => {
    let myStream;
    let myPeerConnection;

    const myFace = document.getElementById("myFace");
    const peerFace = document.getElementById("peerFace");
    //user device(camera) 정보 불러오기

    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const audios = devices.filter((device) => device.kind === "audioinput");
        // console.log(devices);

        //enumerateDevices로 kind = videoinput 정보 불러와서  sellect -> option에 state 값으로 value, label 삽입.
        setCameraDevice(cameras);
        setAudioDevice(audios);
      } catch (e) {
        console.log(e);
      }
    };

    const getMedia = async () => {
      // console.log(`오디오 선택: ${audioId}`);
      const initialConstrains = {
        audio: false,
        // video: { facingMode: "user" }, //selfie mode
        video: true,
      };

      const deviceConstraints = {
        audio: { deviceId: { exact: audioId } },
        video: { deviceId: { exact: cameraId } },
      };

      try {
        myStream = await navigator.mediaDevices.getUserMedia(
          audioId || cameraId ? deviceConstraints : initialConstrains
        );

        myFace.srcObject = myStream;
        console.log(myStream.getAudioTracks());

        await getCameras();

        //socket

        socket.emit("join_room", nick, roomId);

        socket.on("welcome", async () => {
          const offer = await myPeerConnection.createOffer();
          myPeerConnection.setLocalDescription(offer);
          console.log("sent the offer");
          socket.emit("offer", offer, roomId);
        });

        socket.on("offer", async (offer) => {
          console.log(offer);
          await myPeerConnection.setRemoteDescription(offer);
          const answer = await myPeerConnection.createAnswer();
          myPeerConnection.setLocalDescription(answer);
          socket.emit("answer", answer, roomId);
        });

        socket.on("answer", async (answer) => {
          console.log(answer);
          await myPeerConnection.setRemoteDescription(answer);
        });
        socket.on("ice", async (ice) => {
          console.log("receive candidate");
          await myPeerConnection.addIceCandidate(ice);
        });

        // RTC

        myPeerConnection = new RTCPeerConnection({
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
              ],
            },
          ],
        });
        myPeerConnection.addEventListener("icecandidate", (data) => {
          socket.emit("ice", data.candidate, roomId);
          console.log("sent candidate");
        });
        myPeerConnection.addEventListener("addstream", (data) => {
          peerFace.srcObject = data.stream;
        });
        myStream
          .getTracks()
          .forEach((track) => myPeerConnection.addTrack(track, myStream));
      } catch (e) {
        console.log(e);
      }
    };
    getMedia();

    setMute(false);
    setVideoCtrl(false);
  }, [roomId, nick, audioId, cameraId]);

  const cameraSelect = (e) => {
    setCameraId(e.target.value);
  };

  const audioSelect = (e) => {
    setAudioId(e.target.value);
  };

  return (
    <>
      <ScreenWrapper>
        {/* Main Screen */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <VideoHeader openBar={openBar} />

          <div style={{ display: "flex", alignItems: "center" }}>
            <Screen BarState={!openBar}>
              {/* User Screen */}
              <Wrapper>
                {/* video 화면 */}

                <div style={{ width: "100%", height: "85%" }}>
                  <video
                    ref={video_ref}
                    id="myFace"
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",

                      backgroundColor: "white",
                    }}
                  ></video>
                </div>

                {/* 장치 선택 */}
                {/* <div className="devices">
          
          <select id="cameras" onChange={cameraSelect}>
            {cameraDevice.map((camera, index) => {
              return (
                <option key={index} value={camera.deviceId}>
                  {camera.label}
                </option>
              );
            })}
          </select>
          
          <select onChange={audioSelect} id="audios">
            {audioDevice.map((audio) => {
              return (
                <option key={audio.deviceId} value={audio.deviceId}>
                  {audio.label}
                </option>
              );
            })}
          </select>
        </div> */}

                <UnderPlusBar
                  style={{
                    width: "100%",
                    height: "15%",
                    backgroundColor: "#808080",
                  }}
                >
                  <div>
                    <div className="user_img"></div>
                    <span className="user_name">Name</span>
                  </div>
                  <span>00:00:00</span>
                  <DeviceSelctor className="video_control_btn">
                    <div className="audio" onClick={muteClick}>
                      {!mute ? <BsFillMicMuteFill /> : <AiFillAudio />}
                    </div>
                    <div className="camera" onClick={cameraClick}>
                      {!videoCtrl ? <TbVideoOff /> : <TbVideo />}
                    </div>
                  </DeviceSelctor>
                </UnderPlusBar>
                {/* viedo 상태 바 */}
              </Wrapper>

              <Wrapper>
                {/* video 화면 */}

                <div style={{ width: "100%", height: "85%" }}>
                  <video
                    id="peerFace"
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",

                      backgroundColor: "white",
                    }}
                  ></video>
                </div>

                <UnderPlusBar
                  style={{
                    width: "100%",
                    height: "15%",
                    backgroundColor: "#808080",
                  }}
                >
                  <div>
                    <div className="user_img"></div>
                    <span className="user_name">Name</span>
                  </div>
                  <span>00:00:00</span>
                  <DeviceSelctor className="video_control_btn">
                    <div className="audio" onClick={muteClick}>
                      {!mute ? <BsFillMicMuteFill /> : <AiFillAudio />}
                    </div>
                    <div className="camera" onClick={cameraClick}>
                      {!videoCtrl ? <TbVideoOff /> : <TbVideo />}
                    </div>
                  </DeviceSelctor>
                </UnderPlusBar>
                {/* viedo 상태 바 */}
              </Wrapper>
              {/* User Screen */}
            </Screen>

            <Btn onClick={sideBarHandler}>
              {openBar ? (
                <div>
                  <MdArrowForwardIos />
                </div>
              ) : (
                <div>
                  <MdArrowBackIos />
                </div>
              )}
            </Btn>
          </div>

          {/* Main Screen 하단 기능 아이콘 */}

          <UnderBar openBar={openBar} sideBarHandler={sideBarHandler} />
        </div>

        {/* sideBar */}

        <SideView openBar={openBar} socket={socket} nick={nick} roomId={roomId} />

        {/* sideBar */}
      </ScreenWrapper>
    </>
  );
};

const ScreenWrapper = styled.div`
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  &:nth-child(1) {
    grid-column: 1 / 3;
  } */
  display: flex;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Screen = styled.main`
  display: grid;
  width: ${(props) => (props.BarState ? "100vw" : "77vw")};
  padding: 40px;
  gap: ${(props) => (props.BarState ? "5px" : "15px")};
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${(props) =>
    props.BarState ? "22vw 22vw" : "19vw 19vw"};
  transition: all 0.5s;
`;

const Btn = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  margin: auto 0;
  align-items: center;
  right: 0;
  height: 100px;
  width: 0;
  border-right: 25px solid #e9e9e9;
  border-top: 20px solid black;
  border-bottom: 20px solid black;
  cursor: pointer;

  div {
    padding-left: 5px;
    font-size: 20px;
    color: #8b95a1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: pink;
`;

const UnderPlusBar = styled.div`
  display: flex;
  justify-content: space-between;
  place-items: center;
  color: lightgray;
  font-weight: bold;
  padding: 10px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .user_img {
    width: 33px;
    height: 33px;
    background-color: lightgray;
    border-radius: 50%;
  }
`;

const DeviceSelctor = styled.div`
  .camera {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: dimgray;
    color: lightgray;
    border-radius: 50%;
    font-size: 23px;
    padding: 5px;
    box-sizing: border-box;
  }
  .audio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: dimgray;
    color: lightgray;
    border-radius: 50%;
    font-size: 23px;
    padding: 5px;
    box-sizing: border-box;
  }
`;

export default Video;
