import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import ClubPage from "../components/club_page/ClubPage";
import EventView from "../components/view_event/EventView";

const ClubRoutes = (props) => {
  return (
    <Routes>
      <Route path=":club_username">
        <Route index element={<ClubPage />} />
        <Route path="event/:event_id" element={<EventView />} />
      </Route>
    </Routes>
  );
};

ClubRoutes.propTypes = {};

export default ClubRoutes;
