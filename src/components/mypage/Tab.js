import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Tab.modules.css";
import SmallRoomSlider from "./SmallRoomSlider";

function Tab() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const enteredRooms = useSelector((state) => state.room?.enteredRooms);
  const hostingRooms = useSelector((state) => state.room?.hostingRooms);
  const likedRooms = useSelector((state) => state.room?.likedRooms);
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
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <SmallRoomSlider enterdRooms={enteredRooms} />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <SmallRoomSlider hostingRooms={hostingRooms} />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <SmallRoomSlider likedRooms={likedRooms} />
        </div>
      </div>
    </div>
  );
}

export default Tab;
