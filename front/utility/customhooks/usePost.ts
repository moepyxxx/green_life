import axios from "axios";
import useFetchUser from "./usefetchUser";

const usePost = async <T, U>(apiPath: string, request: T, isRequiredAuthorization?: boolean): Promise<U | false> => {

  try {
    if (isRequiredAuthorization) {
      return await axios.post(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath, request, {
        headers: { Authorization: `Bearer ${useFetchUser().token}`}
      });

    } else {
      return await axios.post(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath, request);

    }

  } catch(e) {
    // 帰ってきたステータスコードの処理
    return false;
    
  }
}
export default usePost;