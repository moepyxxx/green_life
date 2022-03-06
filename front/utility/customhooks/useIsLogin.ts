
const useIsLogin = () : boolean => {
  const jwt: string = localStorage.getItem('jwt');
  console.log(jwt)
  return jwt ? true : false;
}
export default useIsLogin;