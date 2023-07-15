import PropTypes from "prop-types";
import StyleManager from "../../utils/css-utils";
import editInfoStyles from "./styles/editInfo.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthHelper } from "../../hooks/AuthProvider";
import NavbarWrapper from "../../common_components/navbar/NavbarWrapper";
import fetchUtil from "../../utils/fetch";

const fillInitialData = (auth, setFields) => {
  setFields(auth);
};

const sendDetails = async (e, fields, helper) => {
  await fetchUtil.putRequest("/api/club_info", fields);
  await helper.isAuthenticated();
};

const EditInfo = ({}) => {
  const styles = new StyleManager(editInfoStyles);
  const auth = useAuth();
  const helper = useAuthHelper();
  const [fields, setFields] = useState(auth);
  const navigate = useNavigate();
  const updateField = (e) => {
    setFields((previousFields) => {
      const fieldId = e.target.id;
      return { ...previousFields, [fieldId]: e.target.value };
    });
    // console.log(fields[e.target.id]);
  };

  useEffect(() => {
    fillInitialData(auth, setFields);
  }, []);

  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);

  return (
    <>
      <NavbarWrapper />
      <main className={styles.classes(["main-content"])}>
        <div className={styles.classes(["title-wrapper"], ["no-touch"])}>
          <h3>EDIT INFORMATION</h3>
        </div>
        <form
          className={styles.classes(["edit-form-container"])}
          // action="/post"
          // method="post"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.classes(["form-group"])}>
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="username"
            >
              USERNAME
            </label>
            <input
              className={styles.classes(["form-input"])}
              placeholder="username"
              type="text"
              name="club_username"
              id="username"
              onChange={updateField}
              value={fields.username}
            />
          </div>
          <div className={styles.classes(["form-group"])}>
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="password"
            >
              PASSWORD
            </label>
            <input
              className={styles.classes(["form-input"])}
              placeholder="password"
              type="password"
              name="club_password"
              id="password"
              onChange={updateField}
              value={fields.password}
            />
          </div>
          <div
            className={styles.classes(["form-group", "club-name__form-group"])}
          >
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="name"
            >
              CLUB NAME
            </label>
            <input
              className={styles.classes(["form-input"])}
              placeholder="club name"
              type="text"
              name="name"
              id="name"
              onChange={updateField}
              value={fields.name}
            />
          </div>
          <div
            className={styles.classes(["form-group", "acronym__form-group"])}
          >
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="acronym"
            >
              ACRONYM
            </label>
            <input
              className={styles.classes(["form-input"])}
              placeholder="acronym"
              type="text"
              name="club_acronym"
              id="acronym"
              onChange={updateField}
              value={fields.acronym}
            />
          </div>
          <div
            className={styles.classes([
              "form-group",
              "cover-photo-url__form-group",
            ])}
          >
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="cover_photo_url"
            >
              COVER PHOTO URL
            </label>
            <input
              className={styles.classes(["form-input"])}
              placeholder="cover photo URL"
              type="url"
              name="cover_photo_url"
              id="cover_photo_url"
              onChange={updateField}
              value={fields.cover_photo_url}
            />
          </div>
          <div
            className={styles.classes([
              "form-group",
              "profile-photo-url__form-group",
            ])}
          >
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="profile_photo_url"
            >
              PROFILE PHOTO URL
            </label>
            <input
              className={styles.classes(["form-input"])}
              placeholder="profile photo URL"
              type="url"
              name="profile_photo_url"
              id="profile_photo_url"
              onChange={updateField}
              value={fields.profile_photo_url}
            />
          </div>
          <div
            className={styles.classes(["form-group", "tagline__form-group"])}
          >
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="tagline"
            >
              TAGLINE
            </label>
            <textarea
              className={styles.classes(["form-input"])}
              placeholder="tagline"
              name="tagline"
              id="tagline"
              onChange={updateField}
              value={fields.tagline}
            ></textarea>
          </div>
          <div
            className={styles.classes([
              "form-group",
              "description__form-group",
            ])}
          >
            <label
              className={styles.classes(["form-label"], ["no-touch"])}
              htmlFor="description"
            >
              DESCRIPTION
            </label>
            <textarea
              className={styles.classes(["form-input"])}
              placeholder="description"
              name="description"
              id="description"
              onChange={updateField}
              value={fields.description}
            ></textarea>
          </div>
          <div
            className={styles.classes(["form-group", "actions__form-group"])}
          >
            <input
              className={styles.classes(["submit-btn", "cancel-btn"])}
              type="submit"
              value="Cancel"
              onClick={(e) => {
                fillInitialData(auth, setFields);
                e.target.blur();
              }}
            />
            <input
              className={styles.classes(["submit-btn", "save-btn"])}
              type="submit"
              value="Save"
              onClick={(e) => {
                sendDetails(e, fields, helper);
                e.target.blur();
              }}
            />
          </div>
        </form>
      </main>
    </>
  );
};

EditInfo.propTypes = {};

export default EditInfo;
