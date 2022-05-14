import React from "react";
import styled from "styled-components";

import SignupContent from "../component/modules/auth/SignupContent";
import ReadTitle from "../component/modules/common/ReadTitle";
import DefaultTemplate from "../component/templates/Default";

import { Spacing } from "../styles/components/Spacing";

export default function SignUp() {
  return (
    <DefaultTemplate>
      <>
        <Spacing pt={6} pb={6}>
          <ReadTitle
            main="green Lifeへようこそ"
            sub={`グリーンがちょっと気になる人同士集まって\n何気ない毎日をちょっと明るくしましょう`}
          />
        </Spacing>

        <SignupContent />
      </>
    </DefaultTemplate>
  );
}

const ItemLogo = styled.div`
  margin: 100px auto 60px;
  width: 200px;
`;
