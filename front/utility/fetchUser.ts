const fetchUserToken = (): string | null => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return null;
  }
  return jwt;
};
export default fetchUserToken;
