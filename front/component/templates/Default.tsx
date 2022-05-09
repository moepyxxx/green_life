import React, { ReactChild } from "react";
import { Spacing } from "../../styles/components/Spacing";
import useIsLogin from "../../utility/customhooks/useIsLogin";
import Toaster from "../features/Toaster";

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

type Props = {
  children: ReactChild;
};

const Default: React.FC<Props> = ({ children }) => {
  const [isLogin] = useIsLogin();
  return (
    <>
      <Header />
      <Toaster />
      <Spacing mt={18} pl={4} pr={4}>
        {children}
      </Spacing>
      {isLogin ? <Menu /> : <Footer />}
    </>
  );
};
export default Default;
