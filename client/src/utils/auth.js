import fetchUtil from "./fetch";

const authorize = async function () {
  try {
    return await fetchUtil.getRequest("/api/login");
  } catch (err) {
    console.log(err + "s");
  }
};

const authAndSuccessRedirect = function (navigate, toSuccess) {
  authorize().then((res) => {
    if (res.status === 200) navigate(toSuccess);
  });
};
const authAndRedirect = async function (
  navigate,
  navigatePathList,
  fallbackPath
) {
  const res = await authorize();
  for (const navigatePathObj of navigatePathList) {
    if (navigatePathObj.statusCode === res.status) {
      if (navigatePathObj.to === "") return false;
      else return navigate(navigatePathObj.to);
    }
  }
  return navigate(fallbackPath);
};

const authCheck = async function ({
  setLoading,
  setAuth,
  navigate,
  navigateTo,
}) {
  const data = await isAuthorized();
  if (data) {
    setLoading(false);
    setAuth(data);
  } else {
    setAuth(Object());
    navigate(navigateTo);
  }
};

const isAuthorized = async function () {
  const res = await fetchUtil.getRequest("/api/login");
  if (res.status === 200) return res.data;
  return false;
};

export {
  authorize,
  isAuthorized,
  authAndSuccessRedirect,
  authCheck,
  authAndRedirect,
};
