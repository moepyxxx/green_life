import axios from "axios";
import useFetchUser from "./usefetchUser";

const useFetch = async <T>(apiPath: string, isRequiredAuthorization?: boolean): Promise<T> => {

  if (isRequiredAuthorization) {
    return await (await axios.get(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath, {
      headers: { Authorization: `Bearer ${useFetchUser().token}`}
    })).data;

  } else {
    return await (await axios.get(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath)).data;

  }
}
export default useFetch;