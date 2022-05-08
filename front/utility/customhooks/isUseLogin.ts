const isUseLogin = () => {
  return () => {
    return !!localStorage.getItem("jwt");
  };
};
export default isUseLogin;
