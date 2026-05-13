export interface User {
  _id?: string; 
  name: string;
  role: string;
  email: string;
  bio: string;
  image?: string;
  skills: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}
