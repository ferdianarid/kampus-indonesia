export interface IPagination {
  postPerPage: number;
  currentPage: number;
  totalPost: number;
  lastPage: number;
}

export interface IApiError {
  success: boolean;
  message: string;
  errors: { [key: string]: string[] };
}
