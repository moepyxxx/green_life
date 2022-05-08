import { useEffect, useState } from "react";

const useIsLogin = () => {
  const [jwt, setJwt] = useState<string>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localJwt = localStorage.getItem("jwt");
      setJwt(localJwt);
    }
  }, []);

  return !!jwt;
};
export default useIsLogin;
