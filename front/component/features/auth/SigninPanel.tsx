import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styled from 'styled-components';
import { ISignin } from '../../../pages/interface/signin';
import useIsLogin from '../../../utility/customhooks/useIsLogin';
import useLogin from '../../../utility/customhooks/useLogin';
import usePost from '../../../utility/customhooks/usePost';
import Input from '../../atoms/form/Input';
import Label from '../../atoms/form/Label';
import Typography from '../../atoms/Typography';
import SquareButton from '../../molecules/SquareButton';
import UnderLineTextLink from '../../molecules/UnderLineTextLink';

const SigninPanel: React.FC = () => {

  const router = useRouter()
  const [signinUser, setSigninUser] = useState<ISignin>({
    email: '',
    password: ''
  });
  const [isFailure, setIsFailure] = useState<boolean>(false)

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setSigninUser({
      ...signinUser,
      email
    })
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setSigninUser({
      ...signinUser,
      password
    })
  }

  const authenticate = async () => {

    const result: AxiosResponse | boolean = await usePost<ISignin, AxiosResponse>('users/signin', signinUser);

    if (!result) {
      setIsFailure(true);
      setSigninUser({
        email: '',
        password: ''
      })
      return;
    }

    useLogin(result.data.idToken);
    if (useIsLogin()) {
      router.push(`/?type=signin`);
    }
  }

  return (
    <>
      <FormControl>
        <Label>ログインID（メールアドレス）</Label>
        <Input value={signinUser.email} change={changeEmail} />
      </FormControl>
      <FormControl>
        <Label>パスワード</Label>
        <Input type="password" value={signinUser.password} change={changePassword} />
      </FormControl>

      <FormSubmit>

        <AuthFailed display={isFailure ? 'block' : 'none'}>
          <Typography color="danger" size="regular">ログインIDまたはパスワードが無効です</Typography>
        </AuthFailed>

        <SquareButton margin="0 0 8px" click={authenticate}>サインイン</SquareButton>
        <Typography size="regular">
          はじめての方は
          <UnderLineTextLink size="regular" linkPath="/signup">サインアップ</UnderLineTextLink>
          してください。
        </Typography>
      </FormSubmit>

    </>
  )
}

const FormControl = styled.div`
  margin-bottom: 24px;
`;

const FormSubmit = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 40px;
`;

const AuthFailed = styled.div`
  display: ${props => props.display};
  margin-bottom: 8px;
`;


export default SigninPanel

