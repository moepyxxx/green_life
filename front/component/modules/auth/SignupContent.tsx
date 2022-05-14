import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

import InputText from "../../parts/form/Text";
import Label from "../../parts/form/Label";
import Typography from "../../parts/Typography";
import UnderLineTextLink from "../../parts/UnderLineTextLink";
import Button from "../../parts/Button";

import { Spacing } from "../../../styles/components/Spacing";
import usePost from "../../../utility/customhooks/usePost";
import { ISignup } from "../../../pages/interface/signup";

const SignupContent: React.FC = () => {
  const router = useRouter();
  const apiPost = usePost();

  const [signupUser, setSignupUser] = useState<ISignup>({
    email: "",
    password: "",
    displayName: "",
  });
  const [isFailure, setIsFailure] = useState<boolean>(false);

  const changeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayName: string = e.target.value;
    setSignupUser({
      ...signupUser,
      displayName,
    });
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setSignupUser({
      ...signupUser,
      email,
    });
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setSignupUser({
      ...signupUser,
      password,
    });
  };

  const authenticate = async () => {
    const result: AxiosResponse | boolean = await apiPost<
      ISignup,
      AxiosResponse
    >("users/signup", signupUser);

    if (!result) {
      setIsFailure(true);
      setSignupUser({
        email: "",
        password: "",
        displayName: "",
      });
      return;
    } else {
      router.push(`/signin/?type=signup`);
    }
  };

  return (
    <>
      <Spacing mt={8} mb={12}>
        <Spacing mb={6}>
          <Label>お名前（ニックネームでもOK）</Label>
          <InputText
            value={signupUser.displayName}
            change={changeDisplayName}
            placeholder="グリーンちゃん"
          />
        </Spacing>
        <Spacing mb={6}>
          <Label>ログインID（メールアドレス）</Label>
          <InputText
            value={signupUser.email}
            placeholder="greenlife@example.com"
            change={changeEmail}
          />
        </Spacing>
        <Spacing mb={6}>
          <Label>パスワード</Label>
          <InputText
            type="password"
            placeholder="xxxxxxxxxxxx"
            value={signupUser.password}
            change={changePassword}
          />
        </Spacing>
      </Spacing>

      <FormSubmit>
        <AuthFailed display={isFailure ? "block" : "none"}>
          <Typography color="danger" size="regular">
            ログインIDまたはパスワードが無効です
          </Typography>
        </AuthFailed>

        <Button margin="0 0 8px" click={authenticate}>
          サインアップ
        </Button>
        <Typography size="regular">
          すでにご利用中の方は
          <UnderLineTextLink size="regular" linkPath="/signin">
            サインイン
          </UnderLineTextLink>
          してください。
        </Typography>
      </FormSubmit>
    </>
  );
};

const FormSubmit = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 40px;
`;

const AuthFailed = styled.div`
  display: ${(props) => props.display};
  margin-bottom: 8px;
`;

export default SignupContent;
