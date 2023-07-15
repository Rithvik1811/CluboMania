import { createContext, useContext, useState } from "react";

const EventsProvider = createContext();

function useCurrentEvent() {
  return useContext(EventsProvider);
}
function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
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
  }, []);
  return (
    <EventsProvider.Provider value={[currentEvent, setCurrentEvent]}>
      {children}
    </EventsProvider.Provider>
  );
}
export { useCurrentEvent, EventsProvider };
