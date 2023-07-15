import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { authCheck } from "../../utils/auth";
import StyleManager from "../../utils/css-utils";
import clubHeaderStyles from "./styles/club_header.module.css";

const renderMainContent = function (
  { clubName, coverImg, profileImg },
  styles
) {
  return (
    <>
      <header className={styles.classes(["cardContainer"])}>
        <div className={styles.classes(["images"])}>
          <img
            className={styles.classes(["coverImage"])}
            src={coverImg}
            alt=""
          />
          <div className={styles.classes(["semiCircle"])}>
            <img className={styles.classes(["profile"])} src={profileImg} />
          </div>
        </div>
        <h2 className={styles.classes(["club-heading-text"], ["no-touch"])}>
          {clubName}
        </h2>
      </header>
      <Outlet />
    </>
  );
};

const renderLoading = function (styles) {
  return (
    <div className={styles.classes(["loading-heading"], ["no-touch"])}>
      Still Loading...
    </div>
  );
};

const ClubHeader = ({ clubName, coverImg, profileImg }) => {
  const styles = new StyleManager(clubHeaderStyles);
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    // const authCheckParams = {
    //   setLoading,
    //   setAuth,
    //   navigate,
    //   navigateTo: "/login",
    // };
    // authCheck(authCheckParams).then(() => {
    //   console.log("Checked Status");
    // });
  }, []);

  return renderMainContent({ clubName, coverImg, profileImg }, styles);
};

ClubHeader.propTypes = {};

export default ClubHeader;
