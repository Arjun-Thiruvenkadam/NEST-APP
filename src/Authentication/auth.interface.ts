export interface User {
  userName: string;
  mail: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthenticatedUser{
  token:string;
  name:string;
}
