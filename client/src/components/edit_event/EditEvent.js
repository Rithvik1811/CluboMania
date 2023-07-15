import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import editEventStyles from "./EditEvent.module.css";
import { deleteEvent, updateEvent } from "../../utils/eventUtils";
import {
  useCurrentEvent,
  useGetEventsList,
} from "../../hooks/EventDetailsProvider";

const EditEvent = () => {
  const styles = new StyleManager(editEventStyles);
  // TODO: apply styles.classes to HtmlFor and ids
  const defaultEventFormValues = {
    id: "",
    title: "",
    thumbnail_url: "",
    body_preview: "",
    body: "",
  };
  const getEventList = useGetEventsList();
  const [currentEvent, setCurrentEvent] = useCurrentEvent();
  const [tempEventBuffer, setTempEventBuffer] = useState({
    ...defaultEventFormValues,
  });
  const formRef = useRef();

  useEffect(() => {
    getEventList.fetchAndSetEvents();
  }, [currentEvent.id]);

  useEffect(() => {
    setTempEventBuffer({ ...currentEvent });
  }, [currentEvent]);

  const afterChange = (e) => {
    const field = e.target.name;
    setTempEventBuffer((previousState) => {
      return { ...previousState, [field]: e.target.value };
    });
  };

  const clickAction = async (e) => {
    e.target.blur();
    if (!formRef.current.checkValidity())
      return formRef.current.reportValidity();
    let status;
    switch (e.target.name) {
      case "discard":
        setTempEventBuffer({ ...currentEvent });
        break;
      case "delete":
        status = await deleteEvent(currentEvent.id);
        if (status === 200) {
          alert("Event Deleted Successfully");
          getEventList.updateEventList();
          setTempEventBuffer({ ...defaultEventFormValues });
        } else {
          alert("Something went wrong :( Event Not Deleted");
        }
        break;
      case "save":
        status = await updateEvent(tempEventBuffer);
        if (status === 200) {
          setCurrentEvent({ ...tempEventBuffer });
          getEventList.updateEventList();
          alert("Event Saved Successfully");
        } else {
          alert("Something went wrong :( Event Not Saved");
        }
        break;
      default:
        break;
    }
    e.preventDefault();
  };

  return (
    <section className={styles.classes(["edit-event-section"])}>
      <h1 className={styles.classes(["edit-event-heading"], ["no-touch"])}>
        EDIT EVENT
      </h1>
      <form
        className={styles.classes(["edit-event-form-container"])}
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.classes(["form-group"])}>
          <label
            className={styles.classes(["form-label", "no-touch"])}
            htmlFor="title"
          >
            event name
          </label>
          <input
            className={styles.classes(["form-input"])}
            placeholder="Event Name"
            type="text"
            name="title"
            minLength={1}
            maxLength={30}
            id="title"
            onChange={afterChange}
            value={tempEventBuffer.title}
          />
        </div>
        <div className={styles.classes(["form-group"])}>
          <label
            className={styles.classes(["form-label", "no-touch"])}
            htmlFor="thumbnail_url"
          >
            thumbnail URL
          </label>
          <input
            className={styles.classes(["form-input"])}
            placeholder="Thumbnail URL"
            type="url"
            name="thumbnail_url"
            id="thumbnail_url"
            onChange={afterChange}
            value={tempEventBuffer.thumbnail_url}
          />
        </div>
        <div
          id={styles.classes(["event_body_preview_group"])}
          className={styles.classes(["form-group", "stretch"])}
        >
          <label
            className={styles.classes(["form-label", "no-touch"])}
            htmlFor="preview"
          >
            preview
          </label>
          <textarea
            className={styles.classes(["form-input"])}
            placeholder="Body Preview"
            name="body_preview"
            minLength={10}
            maxLength={150}
            id="body_preview"
            onChange={afterChange}
            value={tempEventBuffer.body_preview}
          ></textarea>
        </div>
        <div
          id={styles.classes(["event_body_group"])}
          className={styles.classes(["form-group", "stretch"])}
        >
          <label
            className={styles.classes(["form-label", "no-touch"])}
            htmlFor="event_body"
          >
            body
          </label>
          <textarea
            className={styles.classes(["form-input"])}
            placeholder="Event Body"
            name="body"
            id={styles.classes(["event_body"])}
            onChange={afterChange}
            value={tempEventBuffer.body}
          ></textarea>
        </div>
        <div className={styles.classes(["form-group", "actions__form-group"])}>
          <input
            className={styles.classes(["submit-btn", "discard-btn"])}
            type="submit"
            name="discard"
            value="Discard"
            onClick={clickAction}
          />
          <input
            className={styles.classes(["submit-btn", "delete-btn"])}
            type="submit"
            name="delete"
            value="Delete"
            onClick={clickAction}
          />
          <input
            className={styles.classes(["submit-btn", "save-btn"])}
            type="submit"
            name="save"
            value="Save"
            onClick={clickAction}
          />
        </div>
      </form>
    </section>
  );
};

EditEvent.propTypes = {};

export default EditEvent;
