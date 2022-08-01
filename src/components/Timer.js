// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import moment from "moment";
// import Moment from "react-moment";
// import "moment/locale/ko";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const Timer = ({ roomId }) => {
//   const MySwal = withReactContent(Swal);
//   const API_URL = process.env.REACT_APP_API_URL;
//   const [seconds, setSeconds] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [hours, setHours] = useState(0);
//   const time_ref = useRef(null);

//   useEffect(() => {
//     time_ref.current = setInterval(() => {
//       setSeconds(seconds + 1);
//       if (seconds === 59) {
//         setMinutes(minutes + 1);
//         setSeconds(0);
//         if (seconds === 59 && minutes === 59) {
//           setHours(hours + 1);
//           setMinutes(0);
//           setSeconds(0);
//         }
//       }
//     }, 1000);
//     return () => clearInterval(time_ref.current);
//   });
//   //들어갈때
//   const poststartData = () => {
//     const token = localStorage.getItem("accessToken");
//     axios({
//       method: "POST",
//       url: `/api/room/public-room/${roomId}`,

//       baseURL: API_URL,
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         alert("타이머 성공");
//         setHours(response.data.hour);
//         setMinutes(response.data.minute);
//         setSeconds(response.data.second);
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("타이머 실패");
//       });
//   };
//   //나갈때
//   const postTimerData = () => {
//     const token = localStorage.getItem("accessToken");
//     axios({
//       method: "POST",
//       url: `/api/room/exit/${roomId}`,
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },

//       baseURL: API_URL,
//     })
//       .then((response) => {
//         console.log(response);

//         alert("성공");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("실패");
//       });
//   };
//   // 타이머 데이터 받아오기

//   useEffect(() => {
//     poststartData(); // 들어갈 때
//     const handleTabClose = (event) => {
//       return (event.returnValue = postTimerData);
//     };

//     window.addEventListener("beforeunload", postTimerData);

//     return () => {
//       window.removeEventListener("beforeunload", handleTabClose);
//       window.removeEventListener("beforeunload", postTimerData);
//     };
//   }, []);

//   return (
//     <div className="stopwatch">
//       <div className="numbers">
//         <StopWatch>
//           {hours < 10 ? "0" + hours : hours}:
//           {minutes < 10 ? "0" + minutes : minutes}:
//           {seconds < 10 ? "0" + seconds : seconds}
//         </StopWatch>
//       </div>
//     </div>
//   );
// };

// const StopWatch = styled.div`
//   background-color: white;
// `;
// export default Timer;
