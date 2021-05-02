import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//firebase
import firebase from "firebase";
//Provider and store
import { Provider } from "react-redux";
import store from "./redux/store";
//API KEY

const firebaseConfig = {
  apiKey: "AIzaSyBxgufJ2PofJgo1F6BPuoNgdzQPTxLalQw",
  authDomain: "web-messenger-eb0e5.firebaseapp.com",
  projectId: "web-messenger-eb0e5",
  storageBucket: "web-messenger-eb0e5.appspot.com",
  messagingSenderId: "172715642254",
  appId: "1:172715642254:web:eb22e44900d6a8c22ee8df",
  measurementId: "G-KVKXLXCFDC",
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
