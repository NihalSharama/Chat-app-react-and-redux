import React, { useEffect, useState } from "react";
// style
import "./style.css";
// components
import Layout from "../../components/Layout";
//icons
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { getRealtimeUsers } from "../../redux/actions";
import { getRealtimeConversations } from "../../redux/actions";
import { updateMessage } from "../../redux/actions";

const User = ({ user, onClick }) => {
  return (
    <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
        <img
          src="https://st1.bollywoodlife.com/wp-content/uploads/2020/09/FotoJet382.jpg"
          alt="profile"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          margin: "0 10px",
        }}
      >
        <span style={{ flex: 1, fontWeight: 500 }}>
          {user.firstName} {user.lastName}
        </span>
        <span style={{ fontWeight: 100 }}>
          {user.isOnline ? "Online" : "Ofline"}
        </span>
      </div>
    </div>
  );
};
const HomePage = (props) => {
  //data from redux
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  //states
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setmessage] = useState("");
  const [userUid, setUserUid] = useState(null);

  const dispath = useDispatch();

  useEffect(() => {
    dispath(getRealtimeUsers(auth.uid));
  }, [auth.uid, dispath]);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);

    console.log(user);
    const unsubscribe = dispath(
      getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid })
    )
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log(unsubscribe);
  };
  // submit msg handler
  const submitmsg = () => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };
    dispath(updateMessage(msgObj));
    setmessage("");
  };
  return (
    <Layout>
      <div className="main"></div>
      <section className="container">
        <div className="listOfUsers">
          <input
            type="text"
            className="find"
            placeholder="Search for friend..."
          />
          {user.users.length > 0 ? (
            user.users.map((user) => {
              return <User key={user.uid} onClick={initChat} user={user} />;
            })
          ) : (
            <div
              className="emptyfrnd"
              style={{
                marginLeft: "0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>-_-</h1>
              <br />
              <h4>you dont't have any friend try to make some...</h4>
            </div>
          )}
        </div>
        <div className="chatArea">
          <div className="head">
            <div>
              {chatStarted ? (
                <div className="chatHeader">
                  <img
                    src="https://st1.bollywoodlife.com/wp-content/uploads/2020/09/FotoJet382.jpg"
                    alt="profile"
                  />
                  {chatUser}
                </div>
              ) : null}
            </div>
          </div>
          <div className="messageSections">
            {chatStarted ? (
              user.conversations.map((con) => (
                <div
                  style={{
                    textAlign: con.user_uid_1 === auth.uid ? "right" : "left",
                    margin:
                      con.user_uid_1 === auth.uid
                        ? "0rem 1rem 1.5rem 0rem"
                        : "1rem 0rem 0rem 1.5rem",
                  }}
                >
                  <p className="messageStyle">{con.message}</p>
                </div>
              ))
            ) : (
              <h1 style={{ flex: 1, margin: "10rem", marginLeft: "15rem" }}>
                Hey What's app {auth.firstName} {auth.lastName}...
              </h1>
            )}
          </div>
          {chatStarted ? (
            <div className="chatControls">
              <input
                value={message}
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
                type="text"
                placeholder="Type Something..."
              />
              <IconButton onClick={submitmsg}>
                <SendIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
