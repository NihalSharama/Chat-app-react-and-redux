import React, { useEffect } from "react";
import "./App.css";
// Private rout for logged in user
import PrivateRoute from "./components/privateRoute";
// react-redux imports
import { useDispatch, useSelector } from "react-redux";
//action
import { isLoggedInUser } from "./redux/actions/auth.action";
//router
import { BrowserRouter as Router, Route } from "react-router-dom";
//pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, [auth.authenticated, dispatch]);
  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
      </Router>
    </div>
  );
}

export default App;
