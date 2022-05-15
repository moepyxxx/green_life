import React, { ReactChild } from "react";
import { Spacing } from "../../styles/components/Spacing";
import useIsLogin from "../../utility/customhooks/useIsLogin";

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import ToastProvider from "./ToastProvider";

type Props = {
  children: ReactChild;
};

const Default: React.FC<Props> = ({ children }) => {
  const [isLogin] = useIsLogin();
  return (
    <ToastProvider>
      <Header />
      <Spacing mt={18} pl={4} pr={4} mb={isLogin ? 27 : 0}>
        {children}
      </Spacing>
      {isLogin ? <Menu /> : <Footer />}
    </ToastProvider>
  );
};
export default Default;
