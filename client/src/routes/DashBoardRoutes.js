import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import ClubConsole from "../components/club_console/ClubConsole";
import EditInfo from "../components/edit_info/EditInfo";
import LoadingWrapper from "../common_components/loading/LoadingWrapper";
import EditEvents from "../pages/EditEvents/EditEvents";
import CreateEvent from "../pages/CreateEvent/CreateEvent";

const DashBoardRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LoadingWrapper />}>
        <Route index element={<ClubConsole />} />
        <Route path="create_event" element={<CreateEvent />} />
        <Route path="edit_events" element={<EditEvents />} />
        <Route path="edit_info" element={<EditInfo />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
};

DashBoardRoutes.propTypes = {};

export default DashBoardRoutes;
