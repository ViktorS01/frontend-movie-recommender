export interface AuthCredentialsRequest {
  username: string;
  password: string;
}

export interface AuthCredentialsResponse {
  access_token: string;
}
