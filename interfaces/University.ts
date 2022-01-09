import { IPagination } from "./index";
export interface IUniversity {
  id: number;
  user_id: number;
  regency_code: string;
  name: string;
  description: string;
  logo: string;
  background: string;
  accreditation: string;
  status: string;
  national_rank: number;
  international_rank: number;
  vision: string;
  mission: string;
  type: string;
  address: string;
  web_url?: string;
  is_published: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface IForm {
  regency: string;
  name: string;
  description: string;
  logos: FileList;
  covers: FileList;
  accreditation: string;
  status: string;
  national_rank: number;
  international_rank: number;
  vision: string;
  mission: string;
  type: string;
  address: string;
  web_url?: string;
}

export interface GetAllDTO extends IPagination<IUniversity[]> {}
export interface GetOneDTO extends IUniversity {}
