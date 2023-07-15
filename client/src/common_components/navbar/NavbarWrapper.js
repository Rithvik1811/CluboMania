import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "../../hooks/AuthProvider";
import AppNavbar from "./AppNavbar";
import NavbarLink from "./NavbarLink";
import ProfileIcon from "./ProfileIcon";
import useNavLinks from "../../hooks/useNavLinks";
import { Outlet } from "react-router-dom";

const NavbarWrapper = (props) => {
  const navLinksMap = new Map();
  navLinksMap.set("Clubs", "/clubs");
  // navLinksMap.set("Login", "/login");
  const navLinks = {
    static: [],
    login: {
      unauthorized: (
        <NavbarLink key={"/login"} link_title={"Login"} link_href={"/login"} />
      ),
      authorized: <ProfileIcon key={"/login"} />,
    },
  };
  for (const [page_name, path] of navLinksMap) {
    navLinks.static.push(
      <NavbarLink key={path} link_title={page_name} link_href={path} />
    );
  }
  return (
    <>
      <AuthProvider>
        <AppNavbar navLinks={navLinks} />
      </AuthProvider>
      <Outlet />
    </>
  );
};

NavbarWrapper.propTypes = {};

export default NavbarWrapper;
