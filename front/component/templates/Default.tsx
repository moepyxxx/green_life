import React, { ReactChild } from "react";
import styled from "styled-components";
import { Spacing } from "../../styles/components/Spacing";
import Toaster from "../features/Toaster";

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

type Props = {
  children: ReactChild;
};

const Default: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster />
      <Spacing mt={18} pl={4} pr={4}>
        {children}
      </Spacing>
      <Menu />
      <Footer />
    </>
  );
};
export default Default;
