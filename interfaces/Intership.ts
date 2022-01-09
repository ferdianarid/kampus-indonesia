export interface IIntership {
  id: number;
  user_id: number;
  field: string;
  title: string;
  slug: string;
  description: string;
  logo: string;
  company_name: string;
  location: string;
  period: string;
  deadline: string;
  registration_link: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface IForm {
  field: string;
  title: string;
  description: string;
  company: string;
  location: string;
  period: string;
  deadline: string;
  registration_link: string;
  publish: string;
  logos: FileList;
}

export interface GetAllDTO {
  current_page: number;
  data: IIntership[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}

export interface GetOneDTO extends IIntership {}
