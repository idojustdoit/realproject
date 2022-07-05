import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addTodoList,
  deleteTodoList,
  updateTodoChecked,
} from "../../../../redux";

const TodoList = () => {
  const dispatch = useDispatch();

  const todoListItem = useSelector((state) => state);

  const [todo, setTodo] = useState([]);
  const [boxCheck, setBoxCheck] = useState(false);

  const id = Math.random();

  const todoHandler = (e) => {
    setTodo(e.target.value);
  };

  const addList = (e) => {
    e.preventDefault();
    dispatch(addTodoList({ id: id, list: todo, checked: boxCheck }));
    setTodo("");
  };

  const ChangeBox = (e) => {
    setBoxCheck(e.currentTarget.checked);
  };

  return (
    <>
      <DoList>
        {todoListItem.map((i) => {
          return (
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              key={i.id}
            >
              <CheckLabel boxCheck={i.checked}>
                <input
                  onChange={(e) => {
                    setBoxCheck(e.currentTarget.checked);
                    console.log(e.currentTarget.checked);
                    dispatch(
                      updateTodoChecked({ id: i.id, checked: i.checked })
                    );
                  }}
                  type="checkbox"
                />
                {i.list}
              </CheckLabel>
              <button
                onClick={() => {
                  dispatch(deleteTodoList({ id: i.id }));
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </DoList>

      <TodoForm onSubmit={addList}>
        <div>
          <input
            onChange={todoHandler}
            value={todo}
            type="text"
            placeholder="목표를 입력해 주세요."
          />
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
const CheckLabel = styled.label`
  text-decoration: ${(props) => (props.boxCheck ? "line-through" : "none")};
`;

export default TodoList;
