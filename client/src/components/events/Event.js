import React from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import eventStyles from "./styles/event.module.css";
import { useNavigate } from "react-router-dom";

const Event = ({ id, eventTitle, eventShortDesc, eventThumbnailURL }) => {
  const styles = new StyleManager(eventStyles);
  const navigate = useNavigate();
  return (
    <div
      className={styles.classes(["event-bar"])}
      onClick={() => navigate(`event/${id}`)}
    >
      <section className={styles.classes(["event-details"])}>
        <h1 className={styles.classes(["event-title"])}>{eventTitle}</h1>
        <p className={styles.classes(["event-desc"])}>{eventShortDesc}</p>
      </section>
      <img
        className={styles.classes(["event-image"])}
        src={eventThumbnailURL}
        alt="event-image"
      />
    </div>
  );
};

Event.propTypes = {};

export default Event;
