export interface ApiError {
  name?: string;
  reason: string;
}

export interface Goal {
  id: number;
  user_id: number;
  description: string;
  accomplished: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}
