import React, { useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Graph() {
  const [data, setData] = React.useState(null);
  const [weektime, setWeektime] = React.useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  // 공부 시간 데이터 얻어오고 그래프 데이터 형식에 맞게 변환하기.

  const Getdata = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios({
      method: "GET",
      url: `/api/mypage/${userId}/time`,
      baseURL: API_URL,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setData(response.data.studytime);
        setWeektime(response.data.studytime.time);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    Getdata();
  }, []);
  //단위 변경해서 넣어주고 변수 명 체크하기

  return (
    <div style={{ marginTop: "40px" }}>
      <div
        style={{
          backgroundColor: "lightgray",
          width: "200px",
          marginLeft: "20px",
          bottom: "40",
        }}
      >
        {" "}
        1주일 공부량:{weektime}시간
      </div>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="time"
          fill="url(#colorPv)"
          style={{ borderRadius: "10px" }}
          barSize={30}
        />
      </BarChart>
    </div>
  );
}

export default Graph;
