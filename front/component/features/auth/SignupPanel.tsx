import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { ISignup } from "../../../pages/interface/signup";
import Input from "../../atoms/form/Input";
import Label from "../../atoms/form/Label";
import Typography from "../../atoms/Typography";
import SquareButton from "../../molecules/SquareButton";
import UnderLineTextLink from "../../molecules/UnderLineTextLink";
import usePost from "../../../utility/customhooks/usePost";
import { Spacing } from "../../../styles/components/Spacing";

const SignupPanel: React.FC = () => {
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
      <Spacing mb={6}>
        <Label>お名前（ニックネームでもOK）</Label>
        <Input
          value={signupUser.displayName}
          change={changeDisplayName}
          placeholder="グリーンちゃん"
        />
      </Spacing>

      <Spacing mb={6}>
        <Label>ログインID（メールアドレス）</Label>
        <Input value={signupUser.email} change={changeEmail} />
      </Spacing>

      <Spacing mb={6}>
        <Label>パスワード</Label>
        <Input
          type="password"
          value={signupUser.password}
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
          サインアップ
        </SquareButton>
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

export default SignupPanel;
