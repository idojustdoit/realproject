// import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/modules/authSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <HeaderCont className="header">
      <h1>그냥 로고</h1>
      {isAuth && (
        <nav>
          <h1>그냥 로고</h1>
          <ul>
            <li>
              <Link to="/">My Products</Link>
            </li>
            <li>
              <Link to="/">My Sales</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </HeaderCont>
  );
};

const HeaderCont = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007980;
  color: white;
  padding: 0 10%;
`;

export default Header;
