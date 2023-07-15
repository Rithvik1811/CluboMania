import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth, useAuthHelper } from "../../hooks/AuthProvider";

const Loading = (props) => {
  const auth = useAuth();
  const authHelpers = useAuthHelper();
  const navigate = useNavigate();
  // console.log(auth);
  useEffect(() => {
    authHelpers.isAuthenticated().then((val) => {
      console.log(val + " got from json");
      if (val === false) {
        navigate("/");
        console.log("val is false");
      }
    });
  }, []);

  return auth ? <Outlet /> : <div>Loading</div>;
};

Loading.propTypes = {};

export default Loading;
