import axios from "axios";

const usePost = async <T, U>(apiPath: string, request: T): Promise<U> => {
  const result: U = await axios.post(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath, request);
  return result;
}
export default usePost;