import React from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import clubPageStyles from "./styles/clubPage.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClubHeader from "../../common_components/club_header/ClubHeader";
import fetchUtil from "../../utils/fetch";
import EventsContainer from "../events/EventsContainer";

async function getEventDetails(eventId) {
  const eventURL = new URL(`/api/event/${eventId}`, window.location.origin);
  eventURL.search = ["title", "body_preview", "thumbnail_url"]
    .map(function (el, idx) {
      return "fields[]=" + el;
    })
    .join("&");
  const val = await fetchUtil.getRequest(eventURL);
  return val.data;
}

async function pushEvents(eventIds) {
  const events = [];
  for (const eventId of eventIds) {
    const event = await getEventDetails(eventId);
    event.id = eventId;
    events.push(event);
  }
  return events;
}

const renderMainContent = function (styles, clubDetails, events) {
  return (
    <>
      {clubDetails && (
        <ClubHeader
          clubName={clubDetails.name}
          coverImg={clubDetails.cover_photo_url}
          profileImg={clubDetails.profile_photo_url}
        />
      )}
      <section className={styles.classes(["club-info"])}>
        <div className={styles.classes(["about-club"])}>
          <h3>About</h3>
          <p>{clubDetails.description}</p>
        </div>
        <EventsContainer events={events} />
      </section>
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

const ClubPage = (props) => {
  const styles = new StyleManager(clubPageStyles);
  const { club_username } = useParams();
  const [clubDetails, setClubDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState(null);

  let eventIds = [];

  useEffect(() => {
    const clubDetailsURL = new URL(
      `/api/club/${club_username}`,
      window.location.origin
    );
    // Set search params
    clubDetailsURL.search = new URLSearchParams({ full_details: true });
    // GET Details
    fetchUtil.getRequest(clubDetailsURL).then((val) => {
      setClubDetails(val.data);
    });

    const clubEventsURL = new URL(
      `/api/events/${club_username}`,
      window.location.origin
    );
    fetchUtil.getRequest(clubEventsURL).then((val) => {
      eventIds = val.data;
      // console.log(eventIds);
      pushEvents(eventIds).then((eventsNew) => {
        setEvents(eventsNew);
        setIsLoading(false);
      });
    });
  }, []);

  return isLoading
    ? renderLoading(styles)
    : renderMainContent(styles, clubDetails, events);
};

ClubPage.propTypes = {};

export default ClubPage;
