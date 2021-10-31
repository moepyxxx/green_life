import React, { ReactChild } from 'react'

import Footer from './Footer';
import Header from './Header'
import Menu from './Menu';

type Props = {
  children: ReactChild
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Menu />
      <Footer />
    </>
  );
}
export default Default