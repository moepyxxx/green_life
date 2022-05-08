import React from "react";
import styled from "styled-components";
import Logo from "../atoms/Logo";

const Header = () => {
  return (
    <HeaderWrap>
      <LogoSpace>
        <Logo />
      </LogoSpace>
    </HeaderWrap>
  );
};
export default Header;

const HeaderWrap = styled.header`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const LogoSpace = styled.div`
  padding: 16px 16px 12px 16px;
  width: 160px;
`;
