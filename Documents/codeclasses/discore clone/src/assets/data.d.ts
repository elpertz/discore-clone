export interface Message {
  id: number;
  user: string;
  avatarUrl: string;
  date: string;
  text: string;
}

export interface Channel {
  id: number;
  label: string;
  icon?: string;
  unread?: boolean;
  description?: string;
  messages: Message[];
}

export interface Category {
  id: number;
  label: string;
  channels: Channel[];
}

export interface ServerData {
  label: string;
  categories: Category[];
}

export interface DataStructure {
  [key: string]: ServerData;
}
