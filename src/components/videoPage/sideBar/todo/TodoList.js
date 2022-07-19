import React, { useState, useRef } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addTodoList,
  deleteTodoList,
  updateTodoChecked,
} from "../../../../redux/modules/todoListSlice";

//react icons
import { ImCross } from "react-icons/im";
import { RiPencilFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";

const TodoList = () => {
  const dispatch = useDispatch();

  const check_ref = useRef(null);

  const todoListItem = useSelector((state) => state.todoList);

  const [updateTodo, setUpdateTodo] = useState(false);
  const [inputShow, setInputShow] = useState(false);
  const [emptyListInputShow, setEmptyListInputShow] = useState(false);
  const [todo, setTodo] = useState([]);
  const [boxCheck, setBoxCheck] = useState(false);

  const id = Math.random();

  const updateTodoList = () => {
    if (!updateTodo) {
      setUpdateTodo(true);
    } else {
      setUpdateTodo(false);
    }
  };

  const todoInputHandler = () => {
    if (!emptyListInputShow) {
      setEmptyListInputShow(true);
    } else {
      setEmptyListInputShow(false);
    }
  };

  const todoHandler = (e) => {
    setTodo(e.target.value);
  };

  const addList = (e) => {
    e.preventDefault();
    dispatch(addTodoList({ id: id, list: todo, checked: boxCheck }));
    setTodo("");
    setUpdateTodo(false);
  };

  return (
    <>
      <DoList empty={todoListItem.length === 0 && !emptyListInputShow}>
        <ul
          style={{
            width: "inherit",
            margin: "0 auto",
            padding: "0",
          }}
        >
          {todoListItem.length === 0 && !emptyListInputShow ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                placeItems: "center",
              }}
            >
              <div style={{ color: "#808080" }}>
                아직 입력된 TO-DO-List가 없습니다.
              </div>
              <div
                onClick={todoInputHandler}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                To-Do-List 입력하기
              </div>
            </div>
          ) : null}

          {todoListItem.map((i, index) => {
            return (
              <div key={i.id}>
                <ChatItem>
                  <CheckLabel boxCheck={i.checked}>
                    <input
                      className="check"
                      ref={check_ref}
                      onClick={(e) => {
                        setBoxCheck(e.currentTarget.checked);
                        console.log(e.currentTarget.checked);
                        dispatch(
                          updateTodoChecked({ id: i.id, checked: i.checked })
                        );
                      }}
                      type="checkbox"
                      //re-rander시 체크박스 유지
                      defaultChecked={i.checked && "defaultChecked"}
                    />

                    <input
                      className="input_result"
                      type="text"
                      defaultValue={i.list}
                      disabled={!updateTodo &&  "disabled"}
                    />
                  </CheckLabel>
                  <div
                    className="list_icons"
                    style={{
                      color: "#808080",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <GoPlus
                      onClick={() => {
                        setEmptyListInputShow(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <RiPencilFill
                      onClick={updateTodoList}
                      style={{
                        fontSize: "0.9rem",
                        cursor: "pointer",
                      }}
                    />
                    <ImCross
                      style={{
                        fontSize: "0.7rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(deleteTodoList({ id: i.id }));
                      }}
                    />
                  </div>
                </ChatItem>
                {/* {inputShow && (
                  <TodoForm onSubmit={addList}>
                    <input type="checkbox" disabled />
                    <input
                      onChange={todoHandler}
                      value={todo}
                      type="text"
                      placeholder="TO-DO List를 입력해 주세요"
                    />
                  </TodoForm>
                )} */}
              </div>
            );
          })}
        </ul>
        {emptyListInputShow  && (
          <TodoForm onSubmit={addList}>
            <input type="checkbox" disabled />
            <input
              onChange={todoHandler}
              value={todo}
              type="text"
              placeholder="TO-DO List를 입력해 주세요"
            />
          </TodoForm>
        )}
      </DoList>
    </>
  );
};

const DoList = styled.div`
  width: 100%;
  height: 100%;
  min-height: 17vh;
  max-height: 70vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.empty ? "center" : "flex-start")};
  background-color: white;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .list_icons {
    display: none;
  }
  &:hover .list_icons {
    display: flex;
  }
  &:hover .input_result {
    text-overflow: unset;
  }
`;
const CheckLabel = styled.label`
  display: flex;
  width: 100%;
  .input_result {
    width: inherit;
    text-decoration: ${(props) => (props.boxCheck ? "line-through" : "none")};
    background-color: transparent;
    text-overflow: ellipsis;

    font-size: 1rem;
    border: none;
    outline: none;
  }
`;

const TodoForm = styled.form`
  display: flex;
  width: 100%;

  input:last-child {
    width: inherit;
    background-color: transparent;
    font-size: 1rem;
    border: none;
    outline: none;
  }
`;

export default TodoList;
