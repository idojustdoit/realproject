import React from "react";
import styled from "styled-components";
import axios from "axios";

const Invite = ({ onClose }) => {
  const outZone_ref = React.useRef();

  const [value, setValue] = React.useState("");
  const [searchUser, setSearchUser] = React.useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  // 추가할 닉네임 검색
  const onSearch = () => {
    axios.defaults.withCredentials = true;
    axios({
      method: "GET",
      //   url: `/api/userSearch?nickname=${value}&channelId=${channelId}`,
      baseURL: "url",
      headers: {
        authorization: localStorage.getItem("access_token"),
      },
    })
      .then(function (response) {
        console.log(response);
        setSearchUser(response.data.list);
      })
      .catch(function (error) {
        alert("조회를 하지 못하였습니다.");
        console.log(error);
      });

    setValue("");
  };

  return (
    <Container>
      <Background
        ref={outZone_ref}
        onClick={(e) => {
          if (outZone_ref.current === e.target) {
            onClose();
          }
        }}
      >
        <ModalBlock>
          <div>
            <Input2
              type="text"
              value={value}
              onChange={onChange}
              placeholder="유저의 닉네임을 작성해주세요."
            />
            <Button onClick={onSearch}>search</Button>
          </div>
        </ModalBlock>
      </Background>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  position: absolute;
  top: 6.5rem;
  width: 458px;
  height: 480px;
  padding: 1.5rem;
  background-color: white;
  color: black;
  box-shadow: 1px 1px 1px 1px gray;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: modal-show 0.5s;
`;

const Input2 = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 60%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

const Button = styled.button`
  margin-bottom: 12px;
  width: 150px;
  max-width: 75px;
  color: #fff;
  background-color: black;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }
`;

export default Invite;
