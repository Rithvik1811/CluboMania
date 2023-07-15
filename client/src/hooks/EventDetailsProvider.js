import { createContext, useContext, useState } from "react";
import { getEventDetails } from "../utils/eventUtils";
import fetchUtil from "../utils/fetch";

const EventDetails = createContext();
const EventsList = createContext();

function useCurrentEvent() {
  return useContext(EventDetails);
}
function useGetEventsList() {
  return useContext(EventsList);
}

function EventDetailsProvider({ club_username, children }) {
  const [eventsList, setEventsList] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: "",
    title: "",
    thumbnail_url: "",
    body_preview: "",
    body: "",
  });
  // Used in edit list section
  async function updateEventList() {
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
    setEventsList(fetchedEvents);
  }
  // Used in edit event section
  async function fetchAndSetEvents() {
    if (!currentEvent.id || currentEvent.id === "") return;
    const eventDetails = await getEventDetails(currentEvent.id, [
      "thumbnail_url",
      "body",
    ]);
    setCurrentEvent((currentEvent) => {
      return { ...currentEvent, ...eventDetails };
    });
  }

  const eventsListUtilities = {
    eventsList,
    updateEventList,
    fetchAndSetEvents,
  };

  return (
    <EventDetails.Provider value={[currentEvent, setCurrentEvent]}>
      <EventsList.Provider value={eventsListUtilities}>
        {children}
      </EventsList.Provider>
    </EventDetails.Provider>
  );
}

export { useCurrentEvent, useGetEventsList, EventDetailsProvider };
