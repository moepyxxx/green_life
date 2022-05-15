import { useRouter } from "next/router";
import useToast from "./useToast";

export const useLogout = (): (() => void) => {
  const router = useRouter();

  return () => {
    localStorage.removeItem("jwt");
    router.push("/signin?type=timeout");
  };
};
export default useLogout;
