const isLogin = (): boolean => {
  const jwt: string = localStorage.getItem("jwt");
  return jwt ? true : false;
};
export default isLogin;
