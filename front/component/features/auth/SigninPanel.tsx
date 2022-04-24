import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { ISignin } from "../../../pages/interface/signin";
import isLogin from "../../../utility/isLogin";
import useLogin from "../../../utility/customhooks/useLogin";
import usePost from "../../../utility/customhooks/usePost";
import Input from "../../atoms/form/Input";
import Label from "../../atoms/form/Label";
import Typography from "../../atoms/Typography";
import SquareButton from "../../molecules/SquareButton";
import UnderLineTextLink from "../../molecules/UnderLineTextLink";
import { Spacing } from "../../../styles/components/Spacing";

const SigninPanel: React.FC = () => {
  const router = useRouter();
  const apiPost = usePost();
  const login = useLogin();
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
    if (isLogin()) {
      router.push(`/?type=signin`);
    }
  };

  return (
    <>
      <Spacing mb={6}>
        <Label>ログインID（メールアドレス）</Label>
        <Input value={signinUser.email} change={changeEmail} />
      </Spacing>
      <Spacing mb={6}>
        <Label>パスワード</Label>
        <Input
          type="password"
          value={signinUser.password}
          change={changePassword}
        />
      </Spacing>

      <FormSubmit>
        <AuthFailed display={isFailure ? "block" : "none"}>
          <Typography color="danger" size="regular">
            ログインIDまたはパスワードが無効です
          </Typography>
        </AuthFailed>

        <SquareButton margin="0 0 8px" click={authenticate}>
          サインイン
        </SquareButton>
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
  margin-top: 40px;
`;

const AuthFailed = styled.div`
  display: ${(props) => props.display};
  margin-bottom: 8px;
`;

export default SigninPanel;
