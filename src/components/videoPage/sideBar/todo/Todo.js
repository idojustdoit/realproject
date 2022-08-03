import React, { useState } from "react";
import TodoList from "./TodoList";
import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import ResizePanel from "react-resize-panel";

import "../../../../App.css";

const Todo = ({roomId}) => {
  const [todoToggle, setTodoToggle] = useState(true);
 
  const toggleHandler = () => {
    if (todoToggle) {
      setTodoToggle(false);
    } else {
      setTodoToggle(true);
    }
  };

  return (
    <TodoArea>
      <Title>
        <span>To-Do List</span>
        {todoToggle ? (
          <IoIosArrowUp
            onClick={toggleHandler}
            style={{ position: "absolute", right: "25", cursor: "pointer" }}
          />
        ) : (
          <IoIosArrowDown
            onClick={toggleHandler}
            style={{ position: "absolute", right: "25", cursor: "pointer" }}
          />
        )}
      </Title>

      <Wrapper>
        {todoToggle && (
          <ResizePanel direction="s">
            <TodoList roomId={roomId}/>
          </ResizePanel>
        )}
      </Wrapper>
    </TodoArea>
  );
};

const TodoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: inherit;
  background-color: #e9e9e9;
  padding: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  background-color: black;
  color: white;
`;

export default Todo;
