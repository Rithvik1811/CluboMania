import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import cardStyles from "./styles/card.module.css";
import { Navigate, useNavigate } from "react-router-dom";

const Card = ({ clubProperties }) => {
  const { username, acronym, tagline, cover_photo_url, profile_photo_url } =
    clubProperties;
  const styles = new StyleManager(cardStyles);
  const navigate = useNavigate();

  return (
    <div
      className={styles.classes(["cardContainer"])}
      onClick={() => navigate(`/club/${username}`)}
    >
      <div className={styles.classes(["images"])}>
        <img
          className={styles.classes(["coverImage"])}
          src={cover_photo_url}
          alt=""
        />
        <div className={styles.classes(["semiCircle"])}>
          <img
            className={styles.classes(["profile"])}
            src={profile_photo_url}
          />
        </div>
      </div>
      <div className={styles.classes(["details"])}>
        {/* Max Length - 15 */}
        <h3 className="clubName">{acronym}</h3>
        {/* Max Length - 150 */}
        <p className="clubDesc">{tagline}</p>
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
