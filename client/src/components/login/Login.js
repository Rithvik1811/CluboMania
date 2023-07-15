// import React from "react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import StyleManager from "../../utils/css-utils";
import loginStyles from "./styles/login.module.css";
import fetchUtil from "../../utils/fetch";
import { authAndRedirect } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import NavbarWrapper from "../../common_components/navbar/NavbarWrapper";

const Login = ({ setAuth }) => {
  const styles = new StyleManager(loginStyles);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const invalidCredsContainerRef = useRef();

  const navigate = useNavigate();

  const toggle = (element, className, initialToggleState, seconds) => {
    const style = styles.classes([className]).trim();
    if (initialToggleState) element.classList.add(style);
    else element.classList.remove(style);
    setTimeout(() => {
      if (initialToggleState) element.classList.remove(style);
      else element.classList.add(style);
    }, seconds);
  };

  const sendDetails = (e) => {
    e.preventDefault();

    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const data = { username, password };

    console.log(data);

    fetchUtil.postRequest("/api/login", data).then((club_data) => {
      console.log(club_data.status);
      if (club_data.status === 200) {
        // setAuth(club_data.data);
        navigate("/dashboard");
      } else {
        // setAuth({});
        toggle(invalidCredsContainerRef.current, "invisible", false, 3000);
      }
    });
  };

  useEffect(() => {
    const navigatePathList = [
      {
        statusCode: 200,
        to: "/dashboard",
      },
      {
        statusCode: 401,
        to: "",
      },
    ];
    authAndRedirect(navigate, navigatePathList, "/").then((isRedirected) => {
      // It redirected
      if (isRedirected !== false) return;
      // It didn't redirect
      // console.log("not logged in");
    });
  }, []);

  return (
    <>
      <NavbarWrapper />
      <main className={styles.classes(["main-content"])}>
        <div
          className={styles.classes(["sign-in-title-container"], ["no-touch"])}
        >
          <h1 className={styles.classes(["sign-in-title"])}>Sign In</h1>
        </div>
        <form
          onSubmit={sendDetails}
          className={styles.classes(["login-container"])}
        >
          <div className={styles.classes(["form-group"])}>
            <label
              className={styles.classes(["login-label"], ["no-touch"])}
              htmlFor="username"
            >
              USERNAME
            </label>
            <input
              ref={usernameInputRef}
              className={styles.classes(["credentials-input"])}
              placeholder="username"
              type="text"
              name="club_username"
              id="username"
            />
          </div>
          <div className={styles.classes(["form-group"])}>
            <label
              className={styles.classes(["login-label"], ["no-touch"])}
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              ref={passwordInputRef}
              className={styles.classes(["credentials-input"])}
              placeholder="password"
              type="password"
              name="club_password"
              id="password"
            />
          </div>
          <div className={styles.classes(["form-group", "submit-btn-wrapper"])}>
            <input
              className={styles.classes(["submit-btn"])}
              type="submit"
              value="LOGIN"
            />
          </div>
          <div
            ref={invalidCredsContainerRef}
            className={styles.classes(["invalid-creds-container", "invisible"])}
          >
            <h3>Invalid Credentials. Please Try Again!</h3>
          </div>
        </form>
        <div className={styles.classes(["gradient"])}></div>
        <picture className={styles.classes(["login-pic-cover"])}>
          <source
            media="(min-width: 1200px)"
            srcSet="
            https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
          "
          />
          <img
            className={styles.classes(["pic-cover"])}
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </picture>
      </main>
    </>
  );
};

Login.propTypes = {};

export default Login;
