import React, { useEffect } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import eventListStyles from "./EventList.module.css";
import {
  useCurrentEvent,
  useGetEventsList,
} from "../../hooks/EventDetailsProvider";

const EventList = (props) => {
  const styles = new StyleManager(eventListStyles);
  const eventsListUtilities = useGetEventsList();
  const [currentEvent, setCurrentEvent] = useCurrentEvent();

  useEffect(() => {
    eventsListUtilities.updateEventList();
  }, []);

  return (
    <section className={styles.classes(["event-list"])}>
      {eventsListUtilities.eventsList.map((event_details) => (
        <article
          key={event_details.id}
          className={styles.classes(["event-detail-container"], ["no-touch"])}
          onClick={() => {
            setCurrentEvent((previousState) => {
              return { ...previousState, ...event_details };
            });
          }}
        >
          <h3 className={styles.classes(["event-detail-title"])}>
            {event_details.title}
          </h3>
          <p className={styles.classes(["event-detail-body-preview"])}>
            {event_details.body_preview}
          </p>
        </article>
      ))}
    </section>
  );
};

EventList.propTypes = {};

export default EventList;
