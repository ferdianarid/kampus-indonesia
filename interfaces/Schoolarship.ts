import { IPagination } from "./index";
export interface ISchoolarship {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  category: string;
  cover: string;
  accreditation: string;
  type: string;
  deadline: string;
  registration_link: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface IForm {
  title: string;
  description: string;
  level: string;
  category: string;
  covers: FileList;
  accreditation: string;
  type: string;
  deadline: string;
  registration_link: string;
}

export interface GetAllDTO extends IPagination<ISchoolarship[]> {}
export interface GetOneDTO extends ISchoolarship {}
