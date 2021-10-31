import React, { ReactChild } from 'react'
import Footer from './Footer';
import Header from './Header'

type Props = {
  children: ReactChild
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
export default Default