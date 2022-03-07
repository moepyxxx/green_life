export interface ISigninResult {
  idToken: string;
  email: string;
  displayName: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered: true;
}