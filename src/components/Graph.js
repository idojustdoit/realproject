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
  // const [data,setData] = React.useState([])

  const Getdata = () => {
    axios.defaults.withCredentials = true;
    axios({
      method: "GET",
      url: "지금까지 공부시간받는 api",
      baseURL: "",

      headers: {
        authorization: localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };
  useEffect(() => {
    Getdata();
  }, []);
  //단위 변경해서 넣어주고 변수 명 체크하기
  const data = [
    { name: "월", 공부시간: 7.3 },
    { name: "화", 공부시간: 5.2 },
    { name: "수", 공부시간: 2 },
    { name: "목", 공부시간: 2.1 },
    { name: "금", 공부시간: 7.5 },
    { name: "토", 공부시간: 5 },
    { name: "일", 공부시간: 0 },
  ];

  return (
    <div style={{ marginTop: "40px" }}>
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="공부시간"
          fill="url(#colorPv)"
          style={{ borderRadius: "10px" }}
          barSize={30}
        />
      </BarChart>
    </div>
  );
}

export default Graph;
