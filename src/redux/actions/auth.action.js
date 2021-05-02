import firebase from "firebase";
import { authConstanst } from "../constants";

export const SignUP = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    dispatch({
      type: `${authConstanst.USER_LOGIN}_REQUEST`,
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        const currentUser = firebase.auth().currentUser;
        const name = `${user.firstName} ${user.lastName}`;

        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log(data);
            console.log(data.user.uid);
            const userdata = {
              firstName: user.firstName,
              lastName: user.lastName,
              uid: data.user.uid,
              createdAt: new Date(),
              isOnline: true,
            };
            db.collection("users")
              .doc(data.user.uid)
              .set(userdata)
              .then(() => {
                const loggedInUser = {
                  fertsName: user.ferestName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                };

                localStorage.setItem("user", JSON.stringify(loggedInUser));
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
                console.log("singend up succesefully");
              })
              .catch((e) => {
                console.log(e);
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_FAILURE`,
                  payload: { e },
                });
              });
          });
      })
      .catch((e) => {
        const errorcode = e.code;
        const errorMessage = e.message;
        if (errorcode === "auth/weak-password") {
          alert("The password is too weak...");
        } else {
          alert(errorMessage);
        }
        console.log(e);
      });
  };
};

export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
    const db = firebase.firestore();

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);
        const name = data.user.displayName.split(" ");
        const firstName = name[0];
        const lastName = name[1];

        const loggedInUser = {
          firstName,
          lastName,
          uid: data.user.uid,
          email: data.user.email,
        };
        console.log(data.user.uid);

        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            console.log("Successfully logged In...!");
          })
          .catch((e) => {
            console.log(e);
          })
          .then(() => {
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            dispatch({
              type: `${authConstanst.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
            console.log("added to local storage and redux");
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstanst.USER_LOGIN}_FAILURE`,
              payload: { error },
            });
          });
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (user) {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    } else {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: { error: "Login again please" },
      });
    }
  };
};

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
    //Now lets logout user
    const db = firebase.firestore();
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            //successfully
            localStorage.clear();
            dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` });
            console.log("logout success");
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: `${authConstanst.USER_LOGOUT}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
