// import React from "react";
// import styled from "styled-components";

// const User = () => {
//     return(
//         <Wrapper>
//                 {/* video 화면 */}

//                 <div style={{ width: "100%", height: "85%" }}>
//                   <video
//                     ref={video_ref}
//                     id="myFace"
//                     autoPlay
//                     playsInline
//                     style={{
//                       width: "100%",
//                       height: "100%",

//                       backgroundColor: "white",
//                     }}
//                   ></video>
//                 </div>

//                 <UnderPlusBar
//                   style={{
//                     width: "100%",
//                     height: "15%",
//                     backgroundColor: "#808080",
//                   }}
//                 >
//                   <div>
//                     <div className="user_img"></div>
//                     <span className="user_name">Name</span>
//                   </div>
//                   <span>00:00:00</span>
//                   <DeviceSelctor className="video_control_btn">
//                     <div className="audio" onClick={muteClick}>
//                       {!mute ? <BsFillMicMuteFill /> : <AiFillAudio />}
//                     </div>
//                     <div className="camera" onClick={cameraClick}>
//                       {!videoCtrl ? <TbVideoOff /> : <TbVideo />}
//                     </div>
//                   </DeviceSelctor>
//                 </UnderPlusBar>
//                 {/* viedo 상태 바 */}
//               </Wrapper>
//     );
// }

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   background-color: pink;
// `;

// const UnderPlusBar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   place-items: center;
//   color: lightgray;
//   font-weight: bold;
//   padding: 10px;
//   div {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .user_img {
//     width: 33px;
//     height: 33px;
//     background-color: lightgray;
//     border-radius: 50%;
//   }
// `;

// export default User;
