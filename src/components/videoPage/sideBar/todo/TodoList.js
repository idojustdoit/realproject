import React, { useRef } from "react";
import styled from "styled-components";

const TodoList = () => {
  return (
    <>
      <DoList></DoList>
      <TodoForm>
        <div>
          <input type="text" placeholder="목표를 입력해 주세요." />
          <button>등록</button>
        </div>
      </TodoForm>
    </>
  );
};

const DoList = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: wheat;
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(192, 192, 192);
  background-color: #e7e7e7;
  overflow-y: scroll;
  box-sizing: border-box;
`;

const TodoForm = styled.form`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  div {
    display: flex;
    width: inherit;
    height: 30px;
    margin: 10px;
    gap: 10px;
  }
  input {
    box-sizing: border-box;
    width: inherit;
    border-radius: 5px;
    border: none;
  }
  button {
    width: 70px;
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`;

export default TodoList;
