import React from "react";
//react-redux
import { useSelector, useDispatch } from "react-redux";
//router
import { NavLink, Link } from "react-router-dom";
//action
import { logout } from "../../redux/actions/auth.action";
//style
import "./style.css";

function Header(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div style={{ display: "flex" }}>
        <div className="logo">💬Dasfalis</div>
        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>Sign up</NavLink>
            </li>
          </ul>
        ) : null}
      </div>

      {auth.authenticated ? (
        <ul className="menu">
          <li>
            <Link
              to={"#"}
              onClick={() => {
                dispatch(logout(auth.uid));
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
}

export default Header;
