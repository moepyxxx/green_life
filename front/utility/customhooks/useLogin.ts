
const useLogin = () => {
  return (idToken: string) => {
    if (!idToken) {
      throw new Error('ログインできていません！itTokenがないよ')
    }
    localStorage.setItem('jwt', idToken);
  }
}
export default useLogin;