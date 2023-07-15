import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import editEventsStyles from "../EditEvents/EditEvents.module.css";
import NavbarWrapper from "../../common_components/navbar/NavbarWrapper";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useAuth } from "../../hooks/AuthProvider";
import { EventDetailsProvider } from "../../hooks/EventDetailsProvider";
import CreateEventComponent from "../../components/create_event/CreateEventComponent";

const CreateEvent = (props) => {
  const styles = new StyleManager(editEventsStyles);
  // const auth = useAuth();
  // const [eventsBaseList, setEventsBaseList] = useFetchPosts(auth.username);
  // const [refresh, setRefresh] = useState(false);
  return (
    <>
      <NavbarWrapper />
      <main className={styles.classes(["container"])}>
        <CreateEventComponent />
      </main>
    </>
  );
};

CreateEvent.propTypes = {};

export default CreateEvent;
