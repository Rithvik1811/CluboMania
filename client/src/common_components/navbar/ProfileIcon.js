import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import navbar_styles from "./styles/navbar.module.css";
import DropdownAction from "./DropdownAction";
import { useNavigate } from "react-router-dom";
import fetchUtil from "../../utils/fetch";
import { useAuth } from "../../hooks/AuthProvider";

const ProfileIcon = (props) => {
  const styles = new StyleManager(navbar_styles);
  const profileWrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [dropdownVisibility, setdropdownVisibility] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  function toggleDropdown() {
    setdropdownVisibility((dropdownVisibility) => {
      return !dropdownVisibility;
    });
  }

  useEffect(() => {
    // profileWrapperRef.current.addEventListener("click", (e) => {
    //   console.log(dropdownVisibility);
    //   console.log(e.target);
    // });
  }, []);
  useEffect(() => {
    if (dropdownVisibility === true) {
      dropDownRef.current.classList.remove(styles.classes(["hidden"]).trim());
    } else {
      dropDownRef.current.classList.add(styles.classes(["hidden"]).trim());
    }
  }, [dropdownVisibility]);

  return (
    <>
      <li
        ref={profileWrapperRef}
        onClick={toggleDropdown}
        className={styles.classes(["nav-item", "profile-wrapper"])}
      >
        <img
          className={styles.classes(["round"])}
          src={auth.profile_photo_url}
          alt=""
        />
        <ul
          ref={dropDownRef}
          className={styles.classes(["dropdown", "hidden"])}
        >
          <DropdownAction
            actionName={"Dashboard"}
            action={(e) => {
              navigate("/dashboard");
            }}
          />
          <DropdownAction
            toggleDropdown={toggleDropdown}
            actionName={"Sign Out"}
            action={(e) => {
              fetchUtil.postRequest("/api/logout").then((responseMsg) => {
                navigate("/protected");
              });
            }}
          />
        </ul>
      </li>
    </>
  );
};

ProfileIcon.propTypes = {};

export default ProfileIcon;
