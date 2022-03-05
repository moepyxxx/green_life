import axios from "axios";

const usePostImage = async (imageFile: File): Promise<string> => {
  const params = new FormData();
  params.append('file', imageFile);
  return await axios.post(process.env.NEXT_PUBLIC_API_LOCAL_URL + 'images', params, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }).then(res => {
    return res.data.imageUrl;
  });
}
export default usePostImage;