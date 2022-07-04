import React from "react";
import TodoList from "./TodoList";
import styled from "styled-components";

const Todo = () => {
  return (
    <TodoArea>
      <Wrapper>
        <Title>To-Do-List</Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "thistle",
            width: "100%",
          }}
          className="todo-list"
        ></div>
        <TodoList />
      </Wrapper>
    </TodoArea>
  );
};

const TodoArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 40%;
  background-color: wheat;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  background-color: teal;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  background-color: black;
  color: white;
  padding: 10px 0;
`;

export default Todo;
