import React, { useState } from 'react'
import styled from 'styled-components';
import { IAuth } from '../../../pages/interface/auth';
import Input from '../../atoms/form/Input';
import Label from '../../atoms/form/Label';
import Typography from '../../atoms/Typography';
import SquareButton from '../../molecules/SquareButton';
import UnderLineTextLink from '../../molecules/UnderLineTextLink';
import Tree from '../../pattern/Tree';


type Props = {
  authType: 'signin' | 'signup',
}
const AuthPanel: React.FC<Props> = ({ authType }) => {

  const [auth, setAuth] = useState<IAuth>({
    email: '',
    password: ''
  });

  const authText = authType === 'signin' ? 'サインイン' : 'サインアップ';
  const changeLinkText = authType === 'signin' ? {
    label: 'サインアップ',
    link: '/signup',
    user: 'はじめての方'
  } : {
    label: 'サインイン',
    link: '/signin',
    user: 'すでにご利用中の方'
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email: string = e.target.value;
    setAuth({
      ...auth,
      email
    })
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password: string = e.target.value;
    setAuth({
      ...auth,
      password
    })
  }

  const authenticate = () => {
    // ここでログイン処理
    // const request: IAuth &{
    //   returnSecureToken : boolean
    // } = { ...auth, returnSecureToken: true };
    // const authApiPath = authType === 'signin' ? 'auth/signin' : 'auth/signup'
  }

  return (
    <>
      <FormControl>
        <Label>ログインID（メールアドレス）</Label>
        <Input value={auth.email} change={changeEmail} />
      </FormControl>
      <FormControl>
        <Label>パスワード</Label>
        <Input type="password" value={auth.password} change={changePassword} />
      </FormControl>

      <FormSubmit>
        <SquareButton margin="0 0 8px" click={authenticate}>{authText}</SquareButton>
        <Typography size="regular">
          {changeLinkText.user}は
          <UnderLineTextLink size="regular" linkPath={changeLinkText.link}>{changeLinkText.label}</UnderLineTextLink>
          してください。
        </Typography>
      </FormSubmit>

      <Descriptoin>
        <Tree color="secondary" />
        <Typography size="large" weight="bold" margin="0 0 16px">green Lifeへようこそ</Typography>
        <Typography size="regular">グリーンがちょっと気になる人同士集まって</Typography>
        <Typography size="regular">何気ない毎日をちょっと明るくしましょう</Typography>
      </Descriptoin>

    </>
  )
}

const FormControl = styled.div`
  margin-bottom: 24px;
`;

const FormSubmit = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 60px;
`;

const Descriptoin = styled.div`
  text-align: center;
  margin-top: 60px;
`;


export default AuthPanel

