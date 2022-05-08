import axios from "axios";
import fetchUser from "../fetchUser";
import useLogout from "./useLogout";

const usePost = () => {
  const logout = useLogout();

  return async <T, U>(
    apiPath: string,
    request: T,
    isRequiredAuthorization?: boolean
  ): Promise<U | false> => {
    try {
      if (isRequiredAuthorization) {
        return await axios.post(
          process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath,
          request,
          {
            headers: { Authorization: `Bearer ${fetchUser()}` },
          }
        );
      } else {
        return await axios.post(
          process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath,
          request
        );
      }
    } catch (_) {
      // logout();
    }
  };
};
export default usePost;
