import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InputText from "../../parts/form/Text";
import Label from "../../parts/form/Label";
import Typography from "../../parts/Typography";
import UnderLineTextLink from "../../parts/UnderLineTextLink";
import Button from "../../parts/Button";

import { Spacing } from "../../../styles/components/Spacing";

import useLogin from "../../../utility/customhooks/useLogin";
import usePost from "../../../utility/customhooks/usePost";
import useIsLogin from "../../../utility/customhooks/useIsLogin";

import { ISignin } from "../../../pages/interface/signin";

const SigninContent: React.FC = () => {
  const router = useRouter();

  const apiPost = usePost();
  const login = useLogin();
  const [isLogin] = useIsLogin();

  const [signinUser, setSigninUser] = useState<ISignin>({
    email: "",
    password: "",
  });
  const [isFailure, setIsFailure] = useState<boolean>(false);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setSigninUser({
      ...signinUser,
      email,
    });
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setSigninUser({
      ...signinUser,
      password,
    });
  };

  const authenticate = async () => {
    const result: AxiosResponse | boolean = await apiPost<
      ISignin,
      AxiosResponse
    >("users/signin", signinUser);

    if (!result) {
      setIsFailure(true);
      setSigninUser({
        email: "",
        password: "",
      });
      return;
    }

    login(result.data.idToken);
    if (isLogin) {
      router.push(`/?type=signin`);
    }
  };

  return (
    <>
      <Spacing mt={8} mb={12}>
        <Spacing mb={6}>
          <Label>ログインID（メールアドレス）</Label>
          <InputText
            value={signinUser.email}
            placeholder="greenlife@example.com"
            change={changeEmail}
          />
        </Spacing>
        <Spacing mb={6}>
          <Label>パスワード</Label>
          <InputText
            type="password"
            placeholder="xxxxxxxxxxxx"
            value={signinUser.password}
            change={changePassword}
          />
        </Spacing>
      </Spacing>

      <FormSubmit>
        <AuthFailed display={isFailure ? "block" : "none"}>
          <Typography color="accent" size="regular">
            ログインIDまたはパスワードが無効です
          </Typography>
        </AuthFailed>

        <Button margin="0 0 8px" click={authenticate}>
          サインイン
        </Button>

        <Typography size="regular">
          はじめての方は
          <UnderLineTextLink size="regular" linkPath="/signup">
            サインアップ
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
`;

const AuthFailed = styled.div`
  display: ${(props) => props.display};
  margin-bottom: 8px;
`;

export default SigninContent;
