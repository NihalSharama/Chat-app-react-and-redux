import React, { useState } from "react";
import "./style.css";
// actions
import { signin } from "../../redux/actions/auth.action";
//components
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//react-routers
import { Redirect } from "react-router";

function LoginPage() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //dispatch
  const dispatch = useDispatch();
  //state from redux
  const auth = useSelector((state) => state.auth);
  const uid = auth.uid;

  //event handler to login the user
  const signinHandler = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }

    dispatch(signin({ email, password, uid }));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <h2>Login!</h2>
          <form onSubmit={signinHandler}>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div>
              <button id="button">Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

export default LoginPage;
