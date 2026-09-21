import type { ReactNode } from 'react';

export type PopupConfig = {
  title?: string;
  children: ReactNode;
};

export interface UserData {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  email?: string;
}

export interface AuthUser {
  _id?: string;
  email: string;
}

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (data: EditProfileData) => Promise<void>;
  handleUpdateAvatar: (data: EditAvatarData) => Promise<void>;
  handleAddPlaceSubmit: (data: NewCardData) => Promise<void>;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export type EditProfileData = {
  name: string;
  about: string;
};

export type NewCardData = {
  name: string;
  link: string;
};

export type EditAvatarData = {
  avatar: string;
};
