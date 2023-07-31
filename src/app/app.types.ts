export interface ApiError {
  name?: string;
  reason: string;
}

export interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}
