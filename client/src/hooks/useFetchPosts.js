import { useEffect, useState } from "react";
import { getEventDetails } from "../utils/eventUtils";
import fetchUtil from "../utils/fetch";

const useFetchPosts = (club_username) => {
  const [events, setEvents] = useState([]);
  const [refreshEvents, setRefreshEvents] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const fetchedEvents = [];
      const clubEventsURL = new URL(
        `/api/events/${club_username}`,
        window.location.origin
      );
      const eventList = (await fetchUtil.getRequest(clubEventsURL)).data;
      for (const eventId of eventList) {
        const eventDetails = await getEventDetails(eventId, [
          "title",
          "body_preview",
        ]);
        fetchedEvents.push({ ...eventDetails, id: eventId });
      }
      setEvents(fetchedEvents);
    }
    fetchData();
  }, [refreshEvents]);
  return [events, setRefreshEvents];
};

export default useFetchPosts;
