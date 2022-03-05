import axios from "axios";

const useFetch = async <T>(apiPath: string): Promise<T> => {
  return await (await axios.get(process.env.NEXT_PUBLIC_API_LOCAL_URL + apiPath)).data;
}
export default useFetch;