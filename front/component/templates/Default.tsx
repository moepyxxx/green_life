import React, { ReactChild } from 'react'
import styled from 'styled-components';
import Toaster from '../features/Toaster';

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
        <Toaster />
        <Layout>
          {children}
        </Layout>
      <Menu />
      <Footer />
    </>
  );
}
export default Default

const Layout = styled.section`
  margin-top: 72px;
  padding: 0 16px;
`;