export type Platform = 'facebook' | 'twitter' | 'linkedin' | 'instagram';

export interface Credential {
  id: string;
  username: string;
  password?: string;
  createdAt: string;
}

export interface Clone {
  id: string;
  platform: Platform;
  url: string;
  createdAt: string;
  credentials: Credential[];
}
