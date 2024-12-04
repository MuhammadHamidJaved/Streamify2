import exp from "constants";

export interface TokenResponse {
    access: string;
    refresh: string;
    user: User;
  }

  export interface User {
    id: number;
    email: string;
    username: string;
  }
  
  export interface ApiResponse<T = any> {
    message: string;
    data?: T;
  }
  