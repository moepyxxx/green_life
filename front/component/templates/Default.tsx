import React, { ReactChild } from 'react'
import styled from 'styled-components';

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