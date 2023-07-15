import { useEffect, useState } from "react";
import { useAuthHelper } from "./AuthProvider";

const useNavLinks = (navLinks) => {
  // const [navLinks, setNavLinks] = useState(navlinks);
  const [navLinksComponents, setNavLinksComponents] = useState([]);
  const authHelper = useAuthHelper();
  useEffect(() => {
    const newNavLinks = [];
    navLinks.static.forEach((component) => {
      newNavLinks.push(component);
    });
    authHelper.isAuthenticated().then((isAuthorized) => {
      if (isAuthorized) {
        newNavLinks.push(navLinks.login.authorized);
      } else {
        newNavLinks.push(navLinks.login.unauthorized);
      }
      setNavLinksComponents(newNavLinks);
    });
  }, [navLinks]);

  return navLinksComponents;
};

export default useNavLinks;
