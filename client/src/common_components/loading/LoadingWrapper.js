import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "../../hooks/AuthProvider";
import Loading from "./Loading";

const LoadingWrapper = (props) => {
  return (
    <AuthProvider>
      <Loading />
    </AuthProvider>
  );
};

LoadingWrapper.propTypes = {};

export default LoadingWrapper;
