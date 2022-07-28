import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { AiFillAudio } from "react-icons/ai";
import { BsFillMicMuteFill } from "react-icons/bs";
import { TbVideo, TbVideoOff } from "react-icons/tb";

const UserScreen = ({ socket, nick, room, roomId }) => {
  const video_ref = useRef();
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

        video_ref.current.srcObject = myStream;
        console.log(myStream.getAudioTracks());

        await getCameras();

        // RTC code

        myPeerConnection = new RTCPeerConnection();
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

    socket.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      console.log("sent the offer");
      socket.emit("offer", offer, room);
    });

    socket.on("offer", async (offer) => {
      console.log(offer);
      await myPeerConnection.setRemoteDescription(offer);
    });
  }, [socket, room, audioId, cameraId]);

  const cameraSelect = (e) => {
    setCameraId(e.target.value);
  };

  const audioSelect = (e) => {
    setAudioId(e.target.value);
  };

  return (
    <>
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

      <UnderBar
        style={{ width: "100%", height: "15%", backgroundColor: "#808080" }}
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
      </UnderBar>
      {/* viedo 상태 바 */}
    </>
  );
};

const UnderBar = styled.div`
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

// export default UserScreen;
