import type { UserData } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type AuthResponse = {
  token: string;
  user: UserData;
};

async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

export async function signup(email: string, password: string): Promise<UserData> {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return checkResponse<UserData>(res);
}

export async function signin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return checkResponse<AuthResponse>(res);
}

export async function checkToken(token: string): Promise<UserData> {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse<UserData>(res);
}


