import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import createEventStyles from "./CreateEvent.module.css";
import { createEvent } from "../../utils/eventUtils";
import {
  useCurrentEvent,
  useGetEventsList,
} from "../../hooks/EventDetailsProvider";

const CreateEventComponent = () => {
  const styles = new StyleManager(createEventStyles);
  // TODO: apply styles.classes to HtmlFor and ids
  const defaultEventFormValues = {
    title: "",
    thumbnail_url: "",
    body_preview: "",
    body: "",
  };
  const [tempEventBuffer, setTempEventBuffer] = useState({
    ...defaultEventFormValues,
  });

  const formRef = useRef();

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
      case "create":
        status = await createEvent(tempEventBuffer);
        if (status === 200) alert("Event Created Successfully");
        else alert("Something went wrong :( Event Not Created");
        break;
      default:
        break;
    }
    e.preventDefault();
  };

  return (
    <section className={styles.classes(["edit-event-section"])}>
      <h1 className={styles.classes(["edit-event-heading"], ["no-touch"])}>
        CREATE EVENT
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
            required
            minLength={1}
            maxLength={30}
            type="text"
            name="title"
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
            required
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
            required
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
            required
            id={styles.classes(["event_body"])}
            onChange={afterChange}
            value={tempEventBuffer.body}
          ></textarea>
        </div>
        <div className={styles.classes(["form-group", "actions__form-group"])}>
          <input
            className={styles.classes(["submit-btn", "create-btn"])}
            type="submit"
            name="create"
            value="create"
            onClick={clickAction}
          />
        </div>
      </form>
    </section>
  );
};

CreateEventComponent.propTypes = {};

export default CreateEventComponent;
