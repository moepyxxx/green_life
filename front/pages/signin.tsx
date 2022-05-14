import React from "react";

import DefaultTemplate from "../component/templates/Default";
import SigninContent from "../component/modules/auth/SigninContent";
import ReadTitle from "../component/modules/common/ReadTitle";

import { Spacing } from "../styles/components/Spacing";

export default function Signin() {
  return (
    <DefaultTemplate>
      <>
        <Spacing pt={6} pb={6}>
          <ReadTitle
            main="green Lifeへようこそ"
            sub={`グリーンがちょっと気になる人同士集まって\n何気ない毎日をちょっと明るくしましょう`}
          />
        </Spacing>

        <SigninContent />
      </>
    </DefaultTemplate>
  );
}
