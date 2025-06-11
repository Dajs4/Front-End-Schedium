// Tipos generales de API
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    timestamp: string;
    version: string;
    request_id: string;
  };
  errors?: ApiError | null;
}

export interface ApiError {
  code: string;
  details?: Array<{
    field: string;
    message: string;
    type: string;
  }>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface SearchParams extends PaginationParams {
  search?: string;
  active?: boolean;
  created_at_from?: string;
  created_at_to?: string;
}

// Tipos de errores HTTP
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}