import { IPagination } from "./index";
export interface IEvent {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  category: string;
  level: string;
  description: string;
  cover: string;
  registration_link: string;
  date: string;
  deadline: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface IForm {
  title: string;
  slug: string;
  category: string;
  level: string;
  description: string;
  covers: FileList;
  registration_link: string;
  date: string;
  deadline: string;
}

export interface GetAllDTO extends IPagination<IEvent[]> {}
export interface GetOneDTO extends IEvent {}
