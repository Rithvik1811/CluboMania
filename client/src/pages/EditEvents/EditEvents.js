import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import editEventsStyles from "./EditEvents.module.css";
import EventList from "../../components/event_list/EventList";
import EditEvent from "../../components/edit_event/EditEvent";
import NavbarWrapper from "../../common_components/navbar/NavbarWrapper";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useAuth } from "../../hooks/AuthProvider";
import { EventDetailsProvider } from "../../hooks/EventDetailsProvider";

const EditEvents = (props) => {
  const styles = new StyleManager(editEventsStyles);
  const auth = useAuth();
  return (
    <>
      <NavbarWrapper />
      <main className={styles.classes(["container"])}>
        <EventDetailsProvider club_username={auth.username}>
          <EventList />
          <EditEvent />
        </EventDetailsProvider>
      </main>
    </>
  );
};

EditEvents.propTypes = {};

export default EditEvents;
