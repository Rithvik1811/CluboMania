import React from "react";
import PropTypes from "prop-types";
import navbar_styles from "./styles/navbar.module.css";
import StyleManager from "../../utils/css-utils";
import NavbarLink from "./NavbarLink";

const Navbar = ({ navLinks }) => {
  const styles = new StyleManager(navbar_styles);
  const navLinksComponents = [];
  for (const [page_name, path] of navLinks)
    navLinksComponents.push(
      <NavbarLink key={path} link_title={page_name} link_href={path} />
    );
  return (
    <nav className={styles.classes(["navbar"])}>
      <div className={styles.classes(["nav-component", "brand-nav-container"])}>
        <div className={styles.classes(["brand-logo-container"])}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg"
            alt=""
            className={styles.classes(["brand-logo"])}
          />
        </div>
        <div className={styles.classes(["brand-text-container"])}>
          <h1 className={styles.classes(["brand-text"])}>My Brand</h1>
        </div>
      </div>
      <div className={styles.classes(["nav-component"])}>
        <ul className={styles.classes(["nav-list"])}>{navLinksComponents}</ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  navLinks: PropTypes.object,
  activeUrl: PropTypes.string,
};

export default Navbar;
