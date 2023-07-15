import fetchUtil from "./fetch";

async function getEventDetails(eventId, fields) {
  const eventURL = new URL(`/api/event/${eventId}`, window.location.origin);
  eventURL.search = fields
    .map(function (el, idx) {
      return "fields[]=" + el;
    })
    .join("&");
  const val = await fetchUtil.getRequest(eventURL);
  return val.data;
}

async function deleteEvent(eventId) {
  const createEventURL = new URL(`/api/delete_event`, window.location.origin);
  const res = await fetchUtil.deleteRequest(createEventURL, { id: eventId });
  console.log(res);
  return res.status;
}

async function updateEvent(eventDetails) {
  const createEventURL = new URL(`/api/edit_event`, window.location.origin);
  const res = await fetchUtil.putRequest(createEventURL, eventDetails);
  console.log(res);
  return res.status;
}

async function createEvent(eventDetails) {
  const createEventURL = new URL(`/api/create_event`, window.location.origin);
  const res = await fetchUtil.postRequest(createEventURL, eventDetails);
  return res.status;
}

export { getEventDetails, updateEvent, deleteEvent, createEvent };
