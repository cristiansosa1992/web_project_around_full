import type {
  CardData,
  EditAvatarData,
  EditProfileData,
  NewCardData,
  UserData,
} from '../types/types';

interface ApiOptions {
  baseUrl: string;
  headers: HeadersInit;
}

export class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private async _checkResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : ({} as T);
  }

  async getUserInfo(): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });

    return this._checkResponse<UserData>(res);
  }

  async getInitialCards(): Promise<CardData[]> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });

    return this._checkResponse<CardData[]>(res);
  }

  async updateUserInfo(data: EditProfileData): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    return this._checkResponse<UserData>(res);
  }

  async addCard(data: NewCardData): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });

    return this._checkResponse<CardData>(res);
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });

    await this._checkResponse<void>(res);
  }

  async addLike(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });

    return this._checkResponse<CardData>(res);
  }

  async removeLike(cardId: string): Promise<CardData> {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });

    return this._checkResponse<CardData>(res);
  }

  async updateAvatar(data: EditAvatarData): Promise<UserData> {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    return this._checkResponse<UserData>(res);
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
