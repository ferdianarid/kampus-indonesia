export interface Pagination {
  postPerPage: number;
  currentPage: number;
  totalPost: number;
  lastPage: number;
}

export interface ErrApi {
  success: boolean;
  message: string;
  errors: { [key: string]: string[] };
}

export interface ResApi<T> {
  success: boolean;
  data: T;
}

export interface IPagination<T> {
  current_page: number;
  data: T;
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
