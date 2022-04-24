const fetchUser = (): {
  token: string;
} => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    throw new Error("ログインできていません！itTokenがないよ");
  }
  return {
    token: jwt,
  };
};
export default fetchUser;
