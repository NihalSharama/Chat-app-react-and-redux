import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
//action
import { SignUP } from "../../redux/actions";
import { Redirect } from "react-router";

function RegisterPage() {
  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //state from redux
  const auth = useSelector((state) => state.auth);
  //dispatch
  const dispatch = useDispatch();

  //event handler to register new user
  const RegisterHandler = (e) => {
    e.preventDefault();

    const user = { firstName, lastName, email, password };

    if (firstName === "") {
      alert("firstname is required...");
      return;
    } else if (lastName === "") {
      alert("lastname is required...");
      return;
    } else if (email === "") {
      alert("email is required...");
      return;
    } else if (password === "") {
      alert("password is required...");
      return;
    }
    dispatch(SignUP(user));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <div className="registerContainer">
        <Card>
          <h2>Register!</h2>
          <form onSubmit={RegisterHandler}>
            <div className="inputs">
              <input
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />

              <input
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />

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
            </div>

            <div>
              <button id="button">Sign up</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
export default RegisterPage;
