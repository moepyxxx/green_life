import React from "react";
import styled from "styled-components";
import Logo from "../component/atoms/Logo";
import GreenLifeDescription from "../component/features/auth/GreenLifeDescription";
import SignupPanel from "../component/features/auth/SignupPanel";

import DefaultTemplate from "../component/templates/Default";

export default function SignUp() {
  return (
    <DefaultTemplate>
      <>
        <ItemLogo>
          <Logo />
        </ItemLogo>

        <SignupPanel />
        <GreenLifeDescription />
      </>
    </DefaultTemplate>
  );
}

const ItemLogo = styled.div`
  margin: 100px auto 60px;
  width: 200px;
`;
