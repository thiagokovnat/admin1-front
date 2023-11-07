export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  username: string;
}
