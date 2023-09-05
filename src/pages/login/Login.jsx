import React, { useRef, useState } from "react";
import "./login.scss";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "../../context/loginContext/Context";
import LoadingSpinner from "../../component/spinner/LoadingSpinner";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isLoading } = useContext(LoginContext);
  const [isSpinner, setIsSpinner] = useState(isLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });

    setIsSpinner(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/login`,
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        }
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setIsSpinner(false);
      window.location.replace(process.env.REACT_APP_SITE_URL);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setIsSpinner(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrap">
        <h2 className="title">LOGIN</h2>
        <div className="loginForm">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label>Username</label>
            <input ref={userRef} type="text" placeholder="email@example.com" />

            <label>Password</label>
            <input ref={passwordRef} type="password" placeholder="" />
            <input
              disabled={isLoading}
              className="loginSubmit"
              type="submit"
              value="Log in"
            />
            {isSpinner ? <LoadingSpinner /> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
