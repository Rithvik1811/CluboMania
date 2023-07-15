import React from "react";
import PropTypes from "prop-types";
import HomepageStyles from "./styles/Homepage.module.css";
import StyleManager from "../../utils/css-utils";
import Card from "../../components/card/Card";
import layersSVG from "./assets/layers.svg";
import linkedInIcon from "./assets/linkedin.png";
import twitterIcon from "./assets/twitter.png";
import instagramIcon from "./assets/instagram.png";
import kushal from "./assets/kushal.jpg";
import mayush from "./assets/mayush.jpg";
import rithvik from "./assets/card-image.jpeg";

const Homepage = (props) => {
  const styles = new StyleManager(HomepageStyles);
  function c(classArray, globalsArray = []) {
    return styles.classes(classArray, globalsArray);
  }
  const clubProperties = [
    {
      username: "cosc",
      acronym: "COSC",
      tagline: "Learn. Code. Share.",
      cover_photo_url:
        "https://raw.githubusercontent.com/cbitosc/cbitosc.github.io/8d93e63f1a7f7875dd03011ff5e9a1d2fdccb69c/_site/img/banner.svg",
      profile_photo_url:
        "https://hacktoberfest.cbit.org.in/assets/img/logo_cosc.png",
    },
    {
      username: "gdsc",
      acronym: "GDSC",
      tagline: "Google Developer Student Clubs",
      cover_photo_url:
        "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_650,q_auto:good,w_2560/v1/gcs/platform-data-dsc/contentbuilder/dsc-bevy-chapterevents-03%20%281%29.png",
      profile_photo_url:
        "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-dsc/contentbuilder/GDG-Bevy-ChapterThumbnail.png",
    },
  ];
  return (
    <main className={c(["main_content"])}>
      <section className={c(["jumbotron"])}>
        <section className={c(["main-heading"])}>
          <h1 className={c(["main-text"])}>Welcome to Clubomania</h1>
          <p className={c(["tagline"])}>
            Clubomania is a place for you to explore clubs so you can connect
            with like-minded people and expand your network. Student Clubs are
            formed around academic and national themes to add to the rich
            mosaics of student life.
          </p>
        </section>
      </section>
      <section className={c(["popular-clubs"], ["no-touch"])}>
        <h3>Popular Clubs</h3>
        <div className={styles.classes(["cardSection"])}>
          {clubProperties.map((clubProperty) => {
            return (
              <Card key={clubProperty.username} clubProperties={clubProperty} />
            );
          })}
        </div>
      </section>
      <section className={c(["layered-stacks"])}>
        <img className={c([], ["no-drag"])} src={layersSVG} alt="" srcset="" />
      </section>
      <section className={c(["content-section"])}>
        <h1 className={c(["team-heading"])}>Meet Our Team</h1>
        <section className={c(["team-card-sec"])}>
          <div className={c(["card"])}>
            <section className={c(["card-bg"])}>
              <img
                className={c(["card-image"])}
                src={rithvik}
                width="100px"
                height="100px"
              />
              <h2>RITHVIK RAMDAS</h2>
            </section>
            <section className={c(["card-content"])}>
              <p className={c(["card-desc"])}>
                I am an enthusiastic, self-motivated, reliable, responsible and
                hard working person. I am a mature team worker and adaptable to
                all challenging situations. I am able to work well both in a
                team environment as well as using own initiative
              </p>
              <h2>Follow Me</h2>
              <div className={c(["social-media"])}>
                <a className={c(["icon"])} href="#">
                  <img src={linkedInIcon} height="23px" />
                </a>
                <a className={c(["icon"])} href="#">
                  <img src={instagramIcon} height="23px" />
                </a>
                <a className={c(["icon"])} href="#">
                  <img src={twitterIcon} height="23px" />
                </a>
              </div>
            </section>
          </div>
          <div className={c(["card"])}>
            <section className={c(["card-bg"])}>
              <img
                className={c(["card-image"])}
                src={mayush}
                width="100px"
                height="100px"
              />
              <h2>MAYUSH T</h2>
            </section>
            <section className={c(["card-content"])}>
              <p className={c(["card-desc"])}>
                I am a hardworking student who is passionate about everything
                related to web development. I follow-up on the most recent
                changes in web. I look forward to learn and grow as a software
                developer.
              </p>
              <h2>Follow Me</h2>
              <div className={c(["social-media"])}>
                <a className={c(["icon"])} href="#">
                  <img src={linkedInIcon} height="23px" />
                </a>
                <a className={c(["icon"])} href="#">
                  <img src={instagramIcon} height="23px" />
                </a>
                <a className={c(["icon"])} href="#">
                  <img src={twitterIcon} height="23px" />
                </a>
              </div>
            </section>
          </div>
          <div className={c(["card"])}>
            <section className={c(["card-bg"])}>
              <img
                className={c(["card-image"])}
                src={kushal}
                width="100px"
                height="100px"
              />
              <h2>KUSHAL RATHI</h2>
            </section>
            <section className={c(["card-content"])}>
              <p className={c(["card-desc"])}>
                I am an enthusiastic, self-motivated, reliable, responsible and
                hard working person. I am a mature team worker and adaptable to
                all challenging situations. I am able to work well both in a
                team environment as well as using own initiative. Also i deal in
                stock trading and make investments
              </p>
              <h2>Follow Me</h2>
              <div className={c(["social-media"])}>
                <a className={c(["icon"])} href="#">
                  <img src={linkedInIcon} height="23px" />
                </a>
                <a className={c(["icon"])} href="#">
                  <img src={instagramIcon} height="23px" />
                </a>
                <a className={c(["icon"])} href="#">
                  <img src={twitterIcon} height="23px" />
                </a>
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
};

Homepage.propTypes = {};

export default Homepage;
