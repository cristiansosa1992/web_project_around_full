import type { AuthUser } from '../types/types';

const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

type AuthResponse = {
  token: string;
};

type AuthUserResponse = {
  data: AuthUser;
};

async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}

export async function signup(email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const response = await checkResponse<AuthUserResponse>(res);

  return response.data;
}

export async function signin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return checkResponse<AuthResponse>(res);
}

export async function checkToken(token: string): Promise<AuthUser> {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await checkResponse<AuthUserResponse>(res);

  return response.data;
}
