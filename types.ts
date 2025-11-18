
export interface QuickLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Bookmark {
  id: string;
  name:string;
  url: string;
}

export type Theme = 'light' | 'dark' | 'system';
