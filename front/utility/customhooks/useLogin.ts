
const useLogin = (idToken: string) : void => {
  if (!idToken) {
    throw new Error('ログインできていません！itTokenがないよ')
  }
  localStorage.setItem('jwt', idToken);
}
export default useLogin;