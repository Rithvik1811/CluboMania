import React from "react";
import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import clubConsoleStyles from "./styles/clubConsole.module.css";
import ClubHeader from "../../common_components/club_header/ClubHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import NavbarWrapper from "../../common_components/navbar/NavbarWrapper";

const renderMainContent = function (
  styles,
  { clubName, coverImg, profileImg },
  dashboardActions
) {
  return (
    <>
      <NavbarWrapper />
      <ClubHeader
        clubName={clubName}
        coverImg={coverImg}
        profileImg={profileImg}
      />
      <main className={styles.classes(["console-container"])}>
        {dashboardActions.map((valueArr) => {
          return (
            <div
              key={valueArr.name}
              onClick={valueArr.action}
              className={styles.classes(["item-outer"], ["no-touch"])}
            >
              <div className={styles.classes(["item-inner"])}>
                <h1 className={styles.classes(["box-heading"])}>
                  {valueArr.name}
                </h1>
                <p className={styles.classes(["box-para"])}>
                  {valueArr.description}
                </p>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

const ClubConsole = (props) => {
  const styles = new StyleManager(clubConsoleStyles);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  // console.log(auth);
  const navigate = useNavigate();
  const dashboardActions = [
    {
      name: "create event",
      description: "Create a new event to spread a word about it",
      action: () => {
        navigate("/dashboard/create_event");
      },
    },
    {
      name: "edit events",
      description: "Edit existng events to update information",
      action: () => {
        navigate("/dashboard/edit_events");
      },
    },
    {
      name: "preview events",
      description: "Preview your published events",
      action: () => {
        navigate(`/club/${auth.username}`);
      },
    },
    {
      name: "edit club info",
      description: "Edit your club info, like: cover photo, description, etc.",
      action: () => {
        navigate("/dashboard/edit_info");
      },
    },
  ];

  const clubDetails = {
    clubName: auth.name,
    coverImg: auth.cover_photo_url,
    profileImg: auth.profile_photo_url,
  };
  return renderMainContent(styles, clubDetails, dashboardActions);
};

ClubConsole.propTypes = {};

export default ClubConsole;
