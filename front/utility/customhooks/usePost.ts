import axios from "axios";

const usePost = async <T, U>(apiPath: string, request: T): Promise<U | false> => {

  try {
    const result: U = await axios.post(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath, request);
    return result;
  } catch(e) {
    // 帰ってきたステータスコードの処理
    return false;
  }
}
export default usePost;