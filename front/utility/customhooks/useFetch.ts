import axios from "axios";
import fetchUser from "../fetchUser";
import useLogout from "./useLogout";

const useFetch = () => {

  const logout = useLogout();

  return async <T>(apiPath: string, isRequiredAuthorization?: boolean): Promise<T> => {
    try {
      if (isRequiredAuthorization) {
        return await (await axios.get(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath, {
          headers: { Authorization: `Bearer ${fetchUser().token}`}
        })).data;
    
      } else {
        return await (await axios.get(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath)).data;
      }
      
    } catch(_) {
      logout();
    }
  }

}
export default useFetch;