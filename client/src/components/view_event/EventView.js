import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { marked } from "marked";
import { getEventDetails } from "../../utils/eventUtils";
import { useParams } from "react-router-dom";
import EventViewStyles from "./styles/EventView.module.css";
import StyleManager from "../../utils/css-utils";

const EventView = (props) => {
  const styles = new StyleManager(EventViewStyles);
  console.log(marked.parse("# hello world"));
  const { event_id } = useParams();
  const [eventDetails, setEventDetails] = useState({
    title: "",
    thumbnail_url: "",
    body_preview: "",
    body: "",
  });
  useEffect(() => {
    (async () => {
      const event = await getEventDetails(event_id, [
        "title",
        "thumbnail_url",
        "body_preview",
        "body",
      ]);
      setEventDetails(event);
      console.log(event);
    })();
  }, []);
  return (
    <main className={styles.classes(["container"])}>
      <header className={styles.classes(["header"], ["no-touch"])}>
        <img
          className={styles.classes(["thumbnail"])}
          src={eventDetails.thumbnail_url}
          alt=""
        />
        <div className={styles.classes(["gradient"])}>
          <h1 className={styles.classes(["title"])}>{eventDetails.title}</h1>
        </div>
      </header>
      <div
        className={styles.classes(["content"])}
        dangerouslySetInnerHTML={{ __html: marked.parse(eventDetails.body) }}
      />
    </main>
  );
};

EventView.propTypes = {};

export default EventView;
