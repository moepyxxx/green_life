import axios from "axios";
import useLogout from "./useLogout";

const usePostImage = () => {
  const logout = useLogout();

  return async (imageFile: File): Promise<string> => {
    try {
      const params = new FormData();
      params.append('file', imageFile);
  
      return await axios.post(process.env.NEXT_PUBLIC_API_LOCAL_URL + 'images', params, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }).then(res => {
        return res.data.imageUrl;
      });
    } catch(_) {
      logout()
    }
  }

}
export default usePostImage;