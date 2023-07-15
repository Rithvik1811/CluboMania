import React from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import eventStyles from "./styles/event.module.css";
import Event from "./Event";

const EventsContainer = ({ events }) => {
  const styles = new StyleManager(eventStyles);
  return (
    <div className={styles.classes(["event-section"])}>
      {events.map((event) => {
        return (
          <Event
            key={event.id}
            id={event.id}
            eventTitle={event.title}
            eventShortDesc={event.body_preview}
            eventThumbnailURL={event.thumbnail_url}
          />
        );
      })}
    </div>
  );
};

EventsContainer.propTypes = {
  events: PropTypes.array,
};

export default EventsContainer;
