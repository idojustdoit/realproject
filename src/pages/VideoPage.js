import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import VideoHeader from "../components/videoPage/mainScreen/VideoHeader";
import SideView from "../components/videoPage/sideBar/SideView";

import Timer from "../components/Timer";
import axios from "axios";

import Peer from "simple-peer";

import "../App.css";

import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import UnderBar from "../components/videoPage/mainScreen/UnderBar";

import { AiFillAudio } from "react-icons/ai";
import { BsFillMicMuteFill } from "react-icons/bs";
import { TbVideo, TbVideoOff } from "react-icons/tb";

//socket
import io from "socket.io-client";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

// const socket = io.connect("http://3.35.26.55");
// const socket = io.connect("https://www.e-gloo.link");
// const peer = new Peer();

<<<<<<< HEAD
const socket = io.connect("https://egloo.shop");
=======
// const socket = io.connect("https://egloo.shop");
const socket = "";
>>>>>>> dev

const VideoPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  //camera, audioState control
  const [videoState, setVideoState] = useState(false);
  const [audioState, setAudioState] = useState(false);

  const [openBar, setOpenBar] = useState(true);

  const nickname = localStorage.getItem("nickname");

  const sideBarHandler = () => {
    if (openBar) {
      setOpenBar(false);
    } else {
      setOpenBar(true);
    }
  };

  //camera on/off btn click
  const cameraClick = () => {
    userVideo.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!videoState) {
      setVideoState(true);
    } else {
      setVideoState(false);
    }
  };

  //audioState on/off btn click
  const muteClick = () => {
    userVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!audioState) {
      setAudioState(true);
    } else {
      setAudioState(false);
    }
  };

  const exitRoomHandler = () => {
    console.log(userVideo.current.srcObject);
    alert("진짜 나감?");
    userVideo.current.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });
    userVideo.current.srcObject.getAudioTracks().forEach((track) => {
      track.stop();
    });
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    socketRef.current = socket;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        setStream(stream);
        const data = {
          roomId,
          nickname,
        };
        socketRef.current.emit("join room", data);
        socketRef.current.on("all users", (users) => {
          users.forEach((user) => {
            const peer = createPeer(
              user.socketId,
              socketRef.current.id,
              stream
            );
            const peerObj = {
              peerID: user.socketId,
              peerNickname: user.nickname,
              peer,
            };
            peersRef.current.push(peerObj);
            setPeers((users) => [...users, peerObj]);
          });
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          const newPeer = {
            peerId: payload.callerID,
            peerNickname: payload.callerNickname,
            peer,
          };
          peersRef.current.push(newPeer);

          setPeers((users) => [...users, newPeer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });

    socketRef.current.on("user left", (payload) => {
      alert(payload.userInfo.nickname + "님이 나갔습니다.");
      console.log("user left");
      const peerObj = peersRef.current.find(
        (p) => p.peerNickname === payload.userInfo.nickname
      );
      if (peerObj) {
        peerObj.peer.on("close", () => {
          //peer연결 끊기
          peerObj.peer.destroy();
        });
      }
      const newPeers = peersRef.current.filter(
        (p) => p.peerId !== payload.socketId
      );
      peersRef.current = newPeers;

      setPeers((oldPeers) =>
        oldPeers.filter((p) => p.peerNickname !== payload.userInfo.nickname)
      );
    });
  }, [roomId, nickname]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  // const [peers, setPeers] = useState([]);
  // const socketRef = useRef();
  // const userVideo = useRef();
  // const peersRef = useRef([]);

  // const socket = io.connect("http://localhost:3001");

  // const nickname = localStorage.getItem("nickname");

  // // const roomId = "스터디";

  // const [openBar, setOpenBar] = useState(true);

  // const sideBarHandler = () => {
  //   if (openBar) {
  //     setOpenBar(false);
  //   } else {
  //     setOpenBar(true);
  //   }
  // };
  // useEffect(() => {
  //   socketRef.current = socket;
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: false })
  //     .then((stream) => {
  //       userVideo.current.srcObject = stream;

  //       const data = {
  //         roomId,
  //         nickname,
  //       };

  //       socketRef.current.emit("join room", data);
  //     });
  // }, [nickname, roomId]);

  // useEffect(() => {
  //   // 유저 입장했을 때

  //   //방에 나를 제외한 누군가가 있는지 보여줌
  //   socketRef.current.on("send users", (payload) => {
  //     console.log(payload);
  //     let peers = [];
  //     payload.otherSockets.forEach((user) => {
  //       //유저 한명당 create를 해줌
  //       console.log(stream);
  //       const peer = createPeer(user.socketId, socket.id, stream);
  //       console.log(peer);

  //       const peerObj = {
  //         peerId: user.socketId,
  //         peerNickname: user.nickname,
  //         peer,
  //       };

  //       peersRef.current.push(peerObj);
  //       peers.push(peer);
  //       setPeers(peers);
  //     });
  //   });

  //   return () => {
  //     socketRef.current.off("send users");
  //   };
  // }, []);

  // useEffect(() => {
  //   // 다른 사람이 입장했을 때
  //   const onUserJoined = (payload) => {
  //     console.log(payload);
  //     const peer = addPeer(payload.signal, payload.callerId, stream);
  //     console.log(peer);
  //     const newPeer = {
  //       peerId: payload.callerId,
  //       peerNickname: payload.callerNickname,
  //       peer,
  //     };
  //     peersRef.current.push(newPeer);
  //     setPeers((prevPeers) => [...prevPeers, newPeer]);
  //   };

  //   socketRef.current.on("user joined", onUserJoined);

  //   return () => {
  //     socketRef.current.off("user joined", onUserJoined);
  //   };
  // }, [stream]);

  // useEffect(() => {
  //   //잘 받았다고 확인하는 용(?)
  //   socketRef.current.on("receive returned signal", (payload) => {
  //     console.log(payload);
  //     const item = peersRef.current.find((p) => p.peerId === payload.id);
  //     item.peer.signal(payload.signal);
  //   });

  //   return () => {
  //     socketRef.current.off("receive returned signal");
  //   };
  // }, [stream, peers]);

  // function createPeer(userToSignal, callerId, stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     console.log(signal);
  //     socketRef.current.emit("send signal", {
  //       config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
  //       userToSignal,
  //       callerId,
  //       signal,
  //     });
  //   });

  //   return peer;
  // }

  // function addPeer(incomingSignal, callerId, stream) {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     console.log(signal);
  //     socketRef.current.emit("returning signal", { signal, callerId });
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // }

  const video_ref = useRef();
  const second_video_ref = useRef();

  //camera, audio device select
  const [cameraDevice, setCameraDevice] = useState([]);
  const [audioDevice, setAudioDevice] = useState([]);

  //선택한 device 적용
  const [audioId, setAudioId] = useState();
  const [cameraId, setCameraId] = useState();

  // const user_video = video_ref.current; //video tag ref값 추출

  // //camera on/off btn click
  // const cameraClick = () => {
  //   user_video.srcObject
  //     .getVideoTracks()
  //     .forEach((track) => (track.enabled = !track.enabled));
  //   if (!videoState) {
  //     setVideoState(true);
  //   } else {
  //     setVideoState(false);
  //   }
  // };

  // //audioState on/off btn click
  // const muteClick = () => {
  //   user_video.srcObject
  //     .getAudioTracks()
  //     .forEach((track) => (track.enabled = !track.enabled));
  //   if (!audioState) {
  //     setAudioState(true);
  //   } else {
  //     setAudioState(false);
  //   }
  // };

  //Media 실행(user video, audio)
  // useEffect(() => {
  //   // let myStream;
  //   // let myPeerConnection;

  //   // const myFace = document.getElementById("myFace");
  //   // const peerFace = document.getElementById("peerFace");

  //   //user device(camera) 정보 불러오기

  //   const getCameras = async () => {
  //     try {
  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const cameras = devices.filter(
  //         (device) => device.kind === "videoinput"
  //       );
  //       const audios = devices.filter((device) => device.kind === "audioinput");
  //       // console.log(devices);

  //       //enumerateDevices로 kind = videoinput 정보 불러와서  sellect -> option에 state 값으로 value, label 삽입.
  //       setCameraDevice(cameras);
  //       setAudioDevice(audios);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const getMedia = async () => {
  //     // console.log(`오디오 선택: ${audioId}`);
  //     const initialConstrains = {
  //       audio: false,
  //       // video: { facingMode: "user" }, //selfie mode
  //       video: true,
  //     };

  //     const deviceConstraints = {
  //       audio: { deviceId: { exact: audioId } },
  //       video: { deviceId: { exact: cameraId } },
  //     };

  //     try {
  //       myStream = await navigator.mediaDevices.getUserMedia(
  //         audioId || cameraId ? deviceConstraints : initialConstrains
  //       );

  //       // myFace.srcObject = myStream;
  //       // console.log(myStream.getAudioTracks());

  //       await getCameras();

  //       //socket

  //       socket.emit("join_room", nick, roomId);

  //       // socket.on("welcome", async () => {
  //       //   const offer = await myPeerConnection.createOffer();
  //       //   myPeerConnection.setLocalDescription(offer);
  //       //   console.log("sent the offer");
  //       //   socket.emit("offer", offer, roomId);
  //       // });

  //       // socket.on("offer", async (offer) => {
  //       //   console.log(offer);
  //       //   await myPeerConnection.setRemoteDescription(offer);
  //       //   const answer = await myPeerConnection.createAnswer();
  //       //   myPeerConnection.setLocalDescription(answer);
  //       //   socket.emit("answer", answer, roomId);
  //       // });

  //       // socket.on("answer", async (answer) => {
  //       //   console.log(answer);
  //       //   await myPeerConnection.setRemoteDescription(answer);
  //       // });
  //       // socket.on("ice", async (ice) => {
  //       //   console.log("receive candidate");
  //       //   await myPeerConnection.addIceCandidate(ice);
  //       // });

  //       // // RTC

  //       // myPeerConnection = new RTCPeerConnection({
  //       //   iceServers: [
  //       //     {
  //       //       urls: [
  //       //         "stun:stun.l.google.com:19302",
  //       //         "stun:stun1.l.google.com:19302",
  //       //         "stun:stun2.l.google.com:19302",
  //       //         "stun:stun3.l.google.com:19302",
  //       //         "stun:stun4.l.google.com:19302",
  //       //       ],
  //       //     },
  //       //   ],
  //       // });
  //       // myPeerConnection.addEventListener("icecandidate", (data) => {
  //       //   socket.emit("ice", data.candidate, roomId);
  //       //   console.log("sent candidate");
  //       // });
  //       // myPeerConnection.addEventListener("addstream", (data) => {
  //       //   peerFace.srcObject = data.stream;
  //       // });

  //       // myStream
  //       //   .getTracks()
  //       //   .forEach((track) => myPeerConnection.addTrack(track, myStream));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getMedia();

  //   setAudioState(false);
  //   setVideoState(false);
  // }, [roomId, nick, audioId, cameraId]);

  // const cameraSelect = (e) => {
  //   setCameraId(e.target.value);
  // };

  // const audioSelect = (e) => {
  //   setAudioId(e.target.value);
  // };
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
          <VideoHeader
            exitRoomHandler={exitRoomHandler}
            openBar={openBar}
            roomId={roomId}
          />
          <Timer roomId={roomId} />

          <div
            className="video-area"
            style={{ display: "flex", alignItems: "center" }}
          >
            {/* video 화면 grid */}
            <Screen BarState={!openBar}>
              {/* 내 화면 */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                <VideoInfo
                  nickname={nickname}
                  audioState={audioState}
                  videoState={videoState}
                />
              </div>

              {peers.map((peer, index) => {
                return (
                  // 다른 유저 입장시 화면
                  <div
                    key={index}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Video peer={peer.peer} />
                    <VideoInfo
                      nickname={peer.peerNickname}
                      audioState={audioState}
                      videoState={videoState}
                    />
                  </div>
                );
              })}
            </Screen>

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
            {/* <UnderPlusBar
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
                      {!audioState ? <BsFillMicMuteFill /> : <AiFillAudio />}
                    </div>
                    <div className="camera" onClick={cameraClick}>
                      {!videoState ? <TbVideoOff /> : <TbVideo />}
                    </div>
                  </DeviceSelctor>
                </UnderPlusBar> */}

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

          <UnderBar
            openBar={openBar}
            sideBarHandler={sideBarHandler}
            cameraHandler={cameraClick}
            audioHandler={muteClick}
            videoState={videoState}
            audioState={audioState}
          />
        </div>

        {/* sideBar */}

        <SideView
          openBar={openBar}
          socket={socket}
          nick={nickname}
          roomId={roomId}
        />

        {/* sideBar */}
      </ScreenWrapper>
    </>
  );
};

const Video = (props) => {
  const ref = useRef();

  props.peer.on("stream", (stream) => {
    ref.current.srcObject = stream;
  });

  return <StyledVideo playsInline autoPlay ref={ref} />;
};
const VideoInfo = (props) => {
  return (
    <UnderPlusBar
      style={{
        width: "100%",
        height: "17%",
        backgroundColor: "#333333",
      }}
    >
      <div>
        <div className="user_img"></div>
        <span className="user_name">{props.nickname}</span>
      </div>
      <span>00:00:00</span>
      <DeviceSelctor className="video_control_btn">
        <div className="audio">
          {props.audioState ? <BsFillMicMuteFill /> : <AiFillAudio />}
        </div>
        <div className="camera">
          {props.videoState ? <TbVideoOff /> : <TbVideo />}
        </div>
      </DeviceSelctor>
    </UnderPlusBar>
  );
};

const StyledVideo = styled.video`
  height: 83%;
  width: 100%;
  object-fit: cover;
`;

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
    props.BarState ? "25vw 25vw" : "20vw 20vw"};
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
    background-color: black;
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
    background-color: black;
    color: lightgray;
    border-radius: 50%;
    font-size: 23px;
    padding: 5px;
    box-sizing: border-box;
  }
`;

export default VideoPage;
