import { createContext, useContext } from "react";

export const ToastContext = createContext(({}: { text: string }) => {});

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
