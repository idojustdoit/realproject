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
  // const [minutes, setMinutes] = React.useState(0);
  // const [hours, setHours] = React.useState(0);

  let hours = 2;
  let minutes = 44;

  const studytime = ((hours * 60 + minutes) / 60).toFixed(2);
  // const [data, setData] = React.useState([]);
  const data = [
    { name: "월", studytime },
    { name: "화", studytime },
  ];

  const Getdata = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios({
      method: "GET",
      url: `/api/room/${userId}/studytime`,
      baseURL: "http://15.164.164.17:3000",

      headers: {
        Authorization: `Bearer ${token}`,
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
  console.log(data);
  useEffect(() => {
    Getdata();
  }, []);
  //단위 변경해서 넣어주고 변수 명 체크하기

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
          dataKey="studytime"
          fill="url(#colorPv)"
          style={{ borderRadius: "10px" }}
          barSize={30}
        />
      </BarChart>
    </div>
  );
}

export default Graph;
