import React, { useEffect } from "react";
import { useRouter } from "next/router";

import DefaultTemplate from "../component/templates/Default";
import SigninContent from "../component/modules/auth/SigninContent";
import ReadTitle from "../component/modules/common/ReadTitle";

import { Spacing } from "../styles/components/Spacing";
import useToast from "../utility/customhooks/useToast";

export default function Signin() {
  const router = useRouter();
  const query = router.query;
  const toast = useToast();

  useEffect(() => {
    if (!query.type) return;

    if (query.type === "register") {
      toast({
        text: "greenLifeへようこそ！サインインして早速利用してみましょう！",
      });
    }
    if (query.type === "timeout") {
      toast({ text: "タイムアウトしました、再度ログインをし直してください。" });
    }
  }, [query]);
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
