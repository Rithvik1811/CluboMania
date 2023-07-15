import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import navbar_styles from "./styles/navbar.module.css";
import StyleManager from "../../utils/css-utils";

const DropdownAction = ({ toggleDropdown, actionName, action }) => {
  const styles = new StyleManager(navbar_styles);
  const actionRef = useRef(null);
  useEffect(() => {
    actionRef.current.addEventListener("click", (e) => {
      action(e, actionRef);
    });
  }, []);
  return (
    <li ref={actionRef} className={styles.classes(["action-item"])}>
      {actionName}
    </li>
  );
};

DropdownAction.propTypes = {};

export default DropdownAction;
