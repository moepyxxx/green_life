import { useEffect, useLayoutEffect, useState } from "react";

const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const localJwt = localStorage.getItem("jwt");
    if (localJwt) {
      setIsLogin(true);
    }
  }, []);

  return [isLogin];
};
export default useIsLogin;
