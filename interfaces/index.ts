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
