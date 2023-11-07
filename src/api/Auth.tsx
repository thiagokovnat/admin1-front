import {
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../models/AuthData";
import LearningApi from "./LearningApi";

export const signupService = async (body: RegisterRequest) => {
  try {
    return await LearningApi.post<CreateUserResponse>("/users", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginService = async (body: LoginRequest) => {
  try {
    return await LearningApi.post<LoginResponse>("/login", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
