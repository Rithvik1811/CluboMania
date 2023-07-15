// CSS Services
import StyleManager from "../../utils/css-utils";
import navbar_styles from "./styles/navbar.module.css";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import useNavLinks from "../../hooks/useNavLinks";

const AppNavbar = ({ navLinks }) => {
  const styles = new StyleManager(navbar_styles);
  const logoSectionRef = useRef();
  const navLinksComponents = useNavLinks(navLinks);
  const navigate = useNavigate();

  useEffect(() => {
    logoSectionRef.current.addEventListener("click", (e) => navigate("/"));
  }, []);
  return (
    <>
      <nav className={styles.classes(["navbar"])}>
        <div
          ref={logoSectionRef}
          className={styles.classes(
            ["nav-component", "brand-nav-container"],
            ["no-touch"]
          )}
        >
          {/* <div className={styles.classes(["brand-logo-container"])}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg"
              alt=""
              className={styles.classes(["brand-logo"])}
            />
          </div> */}
          <div className={styles.classes(["brand-text-container"])}>
            <h1 className={styles.classes(["brand-text"])}>CLUBOMANIA</h1>
          </div>
        </div>
        <div className={styles.classes(["nav-component"])}>
          <ul className={styles.classes(["nav-list"])}>{navLinksComponents}</ul>
        </div>
      </nav>
      <div className={styles.classes(["empty-space"])}></div>
    </>
  );
};

AppNavbar.propTypes = {
  navLinks: PropTypes.object,
};

export default AppNavbar;
