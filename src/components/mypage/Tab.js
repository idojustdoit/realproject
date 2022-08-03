import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Tab.modules.css";
import AttendRooms from "./AttendRooms";
import HostRooms from "./HostRooms";
import LikeRooms from "./LikeRooms";
import Spinner from "../Spinner";

function Tab() {
  const [toggleState, setToggleState] = useState(1);

  const attendRooms = useSelector((state) => state.myRoom.attendRooms);
  const hostRooms = useSelector((state) => state.myRoom.hostRooms);
  const likeRooms = useSelector((state) => state.myRoom.likeRooms);
  const isLoading = useSelector((state) => state.myRoom.isLoading);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          참여중인 스터디
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          호스팅중인 스터디
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          찜한 스터디
        </button>
      </div>

      <div className="content-tabs">
        {!isLoading ? (
          <>
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <AttendRooms attendRooms={attendRooms} />
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <HostRooms hostRooms={hostRooms} />
            </div>

            <div
              className={
                toggleState === 3 ? "content  active-content" : "content"
              }
            >
              <LikeRooms likeRooms={likeRooms} />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Tab;
