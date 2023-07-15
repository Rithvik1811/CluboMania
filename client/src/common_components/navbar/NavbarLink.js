import React from "react";
import PropTypes from "prop-types";
import navbar_styles from "./styles/navbar.module.css";
import StyleManager from "../../utils/css-utils";
import { Link } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";

const NavbarLink = ({ link_title, link_href }) => {
  const styles = new StyleManager(navbar_styles);
  const resolvedPath = useResolvedPath(link_href);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const nav_item_classes = isActive ? ["nav-item", "active"] : ["nav-item"];
  return (
    <li className={styles.classes(nav_item_classes)}>
      <Link
        to={link_href}
        className={styles.classes(["nav-link"], ["anchor", "centerElement"])}
      >
        {link_title}
      </Link>
    </li>
  );
};

NavbarLink.propTypes = {};

export default NavbarLink;
